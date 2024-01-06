import { CardCompositeKey } from "~/app/shared/interfaces/ICompositeKey.interface";
import { ApplyBuffCommand, BuffCommand } from "../../logic/commands/buff-command.model";
import { ApplyBuffsGamePhaseCommand, ApplyPipsGamePhaseCommand, EndGamePhaseCommand, GoToNextPhaseCommand, GameOverPhaseCommandData, MonsterActionsGamePhaseCommand, RevealGamePhaseCommand, SelectionGamePhaseCommand, StandardActionsGamePhaseCommand, StartGamePhaseCommand, SwitchActionsGamePhaseCommand, GamePhaseCommandType } from "../../logic/commands/game-phase-commands.model";
import { DrawCommand } from "../../logic/commands/hand-commands.model";
import { DealAttackDamageCommand, FasterCommand, MonsterActionCommand, SlowerCommand } from "../../logic/commands/monster-action-commands.model";
import { ApplyStatPipsCommand } from "../../logic/commands/stat-pip-commands.model";
import { SwitchInCommand, SwitchRoutineCommand } from "../../logic/commands/switch-commands.model";
import { PlayerType } from "../../logic/player-type.mode";
import { CardByKeyUtil } from "../../logic/util/card-by-key.util";
import { GameState } from "../game-state/game-state.service";
import { GameStateUtil } from "../game-state/game-state.util";
import { SelectedAction } from "../selected-action/selected-action.model";
import { UpdateGameStateService } from "./update-game-state.service";
import { StandardActionCommand } from "../../logic/commands/standard-action-command.model";

export const GamePhaseUtil = {
  enqueueRevealPhase,
  enqueueApplyPipsPhase,
  enqueueApplyBuffsPhase,
  enqueueSwitchActionsPhase,
  enqueueMonsterActionsPhase,
  enqueueStandardActionsPhase,
  enqueueEndPhase,
  enqueueSelectionPhase,
  enqueueStartGamePhase,

  executeStartGamePhase,
  executeRevealPhase,
  executeApplyPipsPhase,
  executeApplyBuffs,
  executeSwitchActionsPhase,
  executeMonsterActionsPhase,
  executeStandardActionsPhase,
  executeEndPhase,
  executeGameOver,

  isApplyPipsPhaseApplicable,
  isApplyBuffsPhaseApplicable,
  isSwitchActionPhaseApplicable,
  isMonsterActionPhaseApplicable,
  isStandardActionPhaseApplicable,
}

function enqueueNextPhase(rc: UpdateGameStateService, nextPhase: GamePhaseCommandType) {
  new GoToNextPhaseCommand(rc, { key: 'phase', player: 'P', nextPhase }).enqueue();
}

function enqueueRevealPhase(gs: GameState, rc: UpdateGameStateService, cpuAction?: SelectedAction | null) {
  gs.currentPhaseService.goToNextPhase();
  const { selectedAction } = GameStateUtil.getPlayerState(gs, gs.opponentPlayerType);
  new RevealGamePhaseCommand(rc, { opponentAction: cpuAction ?? selectedAction, key: 'phase', player: 'P', display: true }).enqueue();
}
function enqueueApplyPipsPhase(gs: GameState, rc: UpdateGameStateService) {
  new ApplyPipsGamePhaseCommand(rc, { key: 'phase', player: 'P', display: false }).enqueue();
}
function enqueueApplyBuffsPhase(gs: GameState, rc: UpdateGameStateService) {
  new ApplyBuffsGamePhaseCommand(rc, { key: 'phase', player: 'P', display: false }).enqueue();
}
function enqueueSwitchActionsPhase(gs: GameState, rc: UpdateGameStateService) {
  new SwitchActionsGamePhaseCommand(rc, { key: 'phase', player: 'P', display: false }).enqueue();
}
function enqueueMonsterActionsPhase(gs: GameState, rc: UpdateGameStateService) {
  new MonsterActionsGamePhaseCommand(rc, { key: 'phase', player: 'P', display: false }).enqueue();
}
function enqueueStandardActionsPhase(gs: GameState, rc: UpdateGameStateService) {
  new StandardActionsGamePhaseCommand(rc, { key: 'phase', player: 'P', display: false }).enqueue();
}
function enqueueEndPhase(gs: GameState, rc: UpdateGameStateService) {
  new EndGamePhaseCommand(rc, { key: 'phase', player: 'P', display: false }).enqueue();
}
function enqueueSelectionPhase(gs: GameState, rc: UpdateGameStateService) {
  new SelectionGamePhaseCommand(rc, { key: 'phase', player: 'P', display: false }).enqueue();
}
function enqueueStartGamePhase(gs: GameState, rc: UpdateGameStateService) {
  new StartGamePhaseCommand(rc, { key: 'phase', player: 'P', display: false }).enqueue();
}

function executeStartGamePhase(gs: GameState, rc: UpdateGameStateService) {
  const { playerWithInitiative, playerWithoutInitiative } = GameStateUtil.getInitiatives(gs);
  
  function startPhaseByPlayer(player: PlayerType) {
    const { activeMonster } = GameStateUtil.getPlayerState(gs, player);
    const key = activeMonster.key();
    new SwitchInCommand(rc, { player, key, activePlayerType: gs.activePlayerType, monsterName: activeMonster.name }).enqueue();
  }

  startPhaseByPlayer(playerWithInitiative);
  startPhaseByPlayer(playerWithoutInitiative);
  
}

function executeRevealPhase(gs: GameState, rc: UpdateGameStateService) {
  const { playerWithInitiative, playerWithoutInitiative } = GameStateUtil.getInitiatives(gs);
  
  function reveal(player: PlayerType) {
    const { selectedAction, playerCardManager, activeMonster } = GameStateUtil.getPlayerState(gs, player);
    const action = GameStateUtil.getMonsterActionByPlayer(gs, player);
    // move buffs and discards
    playerCardManager.cleanup(selectedAction.appliedBuffs);
    playerCardManager.cleanup(selectedAction.appliedDiscards);
    activeMonster.setDisabledActions(selectedAction.action.key());
  }
  
  reveal(playerWithInitiative);
  reveal(playerWithoutInitiative);
  
  enqueueNextPhase(rc, 'APPLY_PIPS_PHASE');
}

function executeApplyPipsPhase(gs: GameState, rc: UpdateGameStateService) {
  gs.currentPhaseService.goToNextPhase();
  const { playerWithInitiative, playerWithoutInitiative } = GameStateUtil.getInitiatives(gs);

  function applyStatPips(player: PlayerType) {
    const { selectedAction, activeMonster } = GameStateUtil.getPlayerState(gs, player);
    const section = selectedAction.statBoardSection;
    if (section) {
      rc.enqueue(
        new ApplyStatPipsCommand(rc, { 
          key: selectedAction.action.key(), 
          monsterName: activeMonster.name,
          amount: section.current, 
          player, 
          statType: section.type 
        })
      );
    }
  }

  applyStatPips(playerWithInitiative);
  applyStatPips(playerWithoutInitiative);

  enqueueNextPhase(rc, 'APPLY_BUFFS_PHASE');
}

function executeApplyBuffs(gs: GameState, rc: UpdateGameStateService) {
  gs.currentPhaseService.goToNextPhase();
  const { playerWithInitiative, playerWithoutInitiative } = GameStateUtil.getInitiatives(gs);
  
  function applyBuffs(gs: GameState, player: PlayerType) {
    const monsterNames = GameStateUtil.getMonsterNames(gs, player);
    const { selectedAction } = GameStateUtil.getPlayerState(gs, player);
    const { appliedBuffs } = selectedAction;
    const key = selectedAction.action.key();
    if (!appliedBuffs.length) return;

    appliedBuffs.forEach(buff => {
      // need to fire event per slot used, but only show the message for the first one
      for (let i = 0; i < buff.buffSlots; i++) {
        new ApplyBuffCommand(rc, { key, player, buffName: buff.name, monsterName: monsterNames.monsterName, display: i > 0 }).enqueue();
      }
      new BuffCommand(rc, { key, player, doBuff: () => { CardByKeyUtil.executeCardByKey(buff.key(), player, rc, gs) }}).enqueue()
    });
  }

  applyBuffs(gs, playerWithInitiative);
  applyBuffs(gs, playerWithoutInitiative);
  
  enqueueNextPhase(rc, 'SWITCH_ACTIONS_PHASE');
}

function executeSwitchActionsPhase(gs: GameState, rc: UpdateGameStateService) {
  gs.currentPhaseService.goToNextPhase();
  const { playerWithInitiative, playerWithoutInitiative } = GameStateUtil.getInitiatives(gs);
  
  function performSwitchAction(gs: GameState, player: PlayerType) {
    const monsterNames = GameStateUtil.getMonsterNames(gs, player);
    const { selectedAction } = GameStateUtil.getPlayerState(gs, player);
    if (selectedAction.action.getSelectableActionType() !== 'SWITCH') {
      return;
    }
    new SwitchRoutineCommand(rc, { key: selectedAction.action.key(), player, ...monsterNames }).enqueue();
  }
  
  performSwitchAction(gs, playerWithInitiative);
  performSwitchAction(gs, playerWithoutInitiative);
  
  enqueueNextPhase(rc, 'MONSTER_ACTIONS_PHASE');
}

function executeMonsterActionsPhase(gs: GameState, rc: UpdateGameStateService) {
  gs.currentPhaseService.goToNextPhase();
  const { fasterPlayer, slowerPlayer } = GameStateUtil.getSpeedPlayers(gs);
  
  function performMonsterAction(gs: GameState, player: PlayerType) {
    const { activeMonster, selectedAction } = GameStateUtil.getPlayerState(gs, player);
    const key = selectedAction.action.key();
    const monsterNames = GameStateUtil.getMonsterNames(gs, player);
    if (selectedAction.action.getSelectableActionType() !== 'MONSTER') return;
    
    const action = GameStateUtil.getMonsterActionByPlayer(gs, player);

    // draw cards check
    if (action.draw > 0) {
      new DrawCommand(rc, { key, player, amount: action.draw, origin: action.name, display: true, activePlayerType: gs.activePlayerType }).enqueue();
    }

    // add monster action effect(s) to queue
    new MonsterActionCommand(rc, { 
      key, 
      player, 
      ...monsterNames,
      selectedAction: selectedAction,
      doMonsterAction: () =>  { CardByKeyUtil.executeCardByKey(selectedAction.action.key() as string, player, rc, gs) },
    }).enqueue();

    if (action.attack) {
      new DealAttackDamageCommand(rc, { key, player: player, ...monsterNames, damageToDeal: 999 }).enqueue();
    }
  }
  
  const fasterAction = GameStateUtil.getPlayerState(gs, fasterPlayer).selectedAction.action;
  const slowerAction = GameStateUtil.getPlayerState(gs, slowerPlayer).selectedAction.action;
  // add faster event to queue
  const fasterMonsterNames = GameStateUtil.getMonsterNames(gs, fasterPlayer);
  const slowerMonsterNames = GameStateUtil.getMonsterNames(gs, slowerPlayer);
  if (gs.o.selectedAction.action.getSelectableActionType() !== 'SWITCH' && gs.p.selectedAction.action.getSelectableActionType() !== "SWITCH") {
    new FasterCommand(rc, { key: fasterAction.key(), player: fasterPlayer, ...fasterMonsterNames, display: true }).enqueue();
    new SlowerCommand(rc, { key: slowerAction.key(), player: slowerPlayer, ...slowerMonsterNames }).enqueue();
  }

  performMonsterAction(gs, fasterPlayer);
  performMonsterAction(gs, slowerPlayer);

  enqueueNextPhase(rc, 'STANDARD_ACTIONS_PHASE');
}

function executeStandardActionsPhase(gs: GameState, rc: UpdateGameStateService) {
  gs.currentPhaseService.goToNextPhase();
  const { playerWithInitiative, playerWithoutInitiative } = GameStateUtil.getInitiatives(gs);
  
  function performStandardAction(gs: GameState, player: PlayerType) {
    const playerState = GameStateUtil.getPlayerState(gs, player);
    if (playerState.selectedAction.action.getSelectableActionType() !== 'STANDARD') return;
    // TODO: convert to event
    new StandardActionCommand(rc, {
      key: 'SA',
      player,
      doStandardAction: () => CardByKeyUtil.executeStandardAction(playerState.selectedAction.action.key(), player, rc, gs),
    }).enqueue();
  }
  
  performStandardAction(gs, playerWithInitiative);
  performStandardAction(gs, playerWithoutInitiative);

  enqueueNextPhase(rc, 'END_PHASE');
}

function executeEndPhase(gs: GameState, rc: UpdateGameStateService) {
  gs.currentPhaseService.goToNextPhase();
  const { playerWithInitiative, playerWithoutInitiative } = GameStateUtil.getInitiatives(gs);
  
  function playerCleanup(gs: GameState, player: PlayerType) {
    // move buffs and discards
    const { selectedAction, playerCardManager, activeMonster, player: p } = GameStateUtil.getPlayerState(gs, player);
    // handle team auras
    
    activeMonster.eotCleanup(selectedAction.action.key() as CardCompositeKey);
    activeMonster.actions.forEach(action => {
      action.modifiers.eotClear();
    });
    gs.selectedActionService.selectedAction$.next(new SelectedAction());
    selectedAction.clear();
    // draw card
    new DrawCommand(rc, { key: selectedAction.action.key(), player, amount: 1 }).enqueue();
  }
  
  playerCleanup(gs, playerWithInitiative);
  playerCleanup(gs, playerWithoutInitiative);

  enqueueNextPhase(rc, 'SELECTION_PHASE');
}

function executeGameOver(gs: GameState, data: GameOverPhaseCommandData) {
  gs.gameOverService.winner$.next(data.winner);
}

function isApplyPipsPhaseApplicable(gs: GameState) {
  const { p, o } = GameStateUtil.getPlayerStates(gs);
  return p.selectedAction.statBoardSection || o.selectedAction.statBoardSection;
}
function isApplyBuffsPhaseApplicable(gs: GameState) {
  const { p, o } = GameStateUtil.getPlayerStates(gs);
  return p.selectedAction.appliedBuffs.length || o.selectedAction.appliedBuffs.length;
}
function isSwitchActionPhaseApplicable(gs: GameState) {
  const { p, o } = GameStateUtil.getPlayerStates(gs);
  return [p.selectedAction.action.getSelectableActionType(), o.selectedAction.action.getSelectableActionType()].includes('SWITCH');
}
function isMonsterActionPhaseApplicable(gs: GameState) {
  const { p, o } = GameStateUtil.getPlayerStates(gs);
  return [p.selectedAction.action.getSelectableActionType(), o.selectedAction.action.getSelectableActionType()].includes('MONSTER');
}
function isStandardActionPhaseApplicable(gs: GameState) {
  const { p, o } = GameStateUtil.getPlayerStates(gs);
  return [p.selectedAction.action.getSelectableActionType(), o.selectedAction.action.getSelectableActionType()].includes('STANDARD');
}