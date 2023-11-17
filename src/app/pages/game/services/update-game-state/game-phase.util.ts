import { CardCompositeKey } from "~/app/shared/interfaces/ICompositeKey.interface";
import { ApplyBuffCommand, BuffCommand } from "../../logic/commands/buff-command.model";
import { ApplyBuffsGamePhaseCommand, ApplyPipsGamePhaseCommand, EndGamePhaseCommand, MonsterActionsGamePhaseCommand, RevealGamePhaseCommand, RevealGamePhaseCommandData, SelectionGamePhaseCommand, StandardActionsGamePhaseCommand, StartGamePhaseCommand, SwitchActionsGamePhaseCommand } from "../../logic/commands/game-phase-commands.model";
import { DrawCommand } from "../../logic/commands/hand-commands.model";
import { DescriptiveMessageCommand } from "../../logic/commands/message-command.model";
import { DealAttackDamageCommand, FasterCommand, MonsterActionCommand, RecoilCheckCommand, TakeRecoilDamageCommand, WeakCommand } from "../../logic/commands/monster-action-commands.model";
import { ApplyStatPipsCommand } from "../../logic/commands/stat-pip-commands.model";
import { SwitchOutPromptCommand, SwitchRoutineCommand } from "../../logic/commands/switch-commands.model";
import { PlayerType } from "../../logic/player-type.mode";
import { CardByKeyUtil } from "../../logic/util/card-by-key.util";
import { DamageCalcUtil } from "../../logic/util/damage-calc.util";
import { GameState } from "../game-state/game-state.service";
import { GameStateUtil } from "../game-state/game-state.util";
import { SelectedAction } from "../selected-action/selected-action.model";
import { CommandUtil } from "./command.util";
import { UpdateGameStateService } from "./update-game-state.service";

export const GamePhaseUtil = {
  revealPhase,
  applyPipsPhase,
  applyBuffsPhase,
  switchActionsPhase,
  monsterActionsPhase,
  standardActionsPhase,
  endPhase,
  selectionPhase,
  startGamePhase,

  executeStartGamePhase,
  executeRevealPhase,
  executeApplyPipsPhase,
  executeApplyBuffs,
  executeSwitchActionsPhase,
  executeMonsterActionsPhase,
  executeStandardActionsPhase,
  executeEndPhase,

  isApplyPipsPhaseApplicable,
  isApplyBuffsPhaseApplicable,
  isSwitchActionPhaseApplicable,
  isMonsterActionPhaseApplicable,
  isStandardActionPhaseApplicable,
}

function revealPhase(gs: GameState, rc: UpdateGameStateService) {
  new RevealGamePhaseCommand(rc, { opponentAction: gs.o.selectedAction, key: 'phase', player: 'P', display: true }).enqueue();
}
function applyPipsPhase(gs: GameState, rc: UpdateGameStateService) {
  new ApplyPipsGamePhaseCommand(rc, { key: 'phase', player: 'P', display: false }).enqueue();
}
function applyBuffsPhase(gs: GameState, rc: UpdateGameStateService) {
  new ApplyBuffsGamePhaseCommand(rc, { key: 'phase', player: 'P', display: false }).enqueue();
}
function switchActionsPhase(gs: GameState, rc: UpdateGameStateService) {
  new SwitchActionsGamePhaseCommand(rc, { key: 'phase', player: 'P', display: false }).enqueue();
}
function monsterActionsPhase(gs: GameState, rc: UpdateGameStateService) {
  new MonsterActionsGamePhaseCommand(rc, { key: 'phase', player: 'P', display: false }).enqueue();
}
function standardActionsPhase(gs: GameState, rc: UpdateGameStateService) {
  new StandardActionsGamePhaseCommand(rc, { key: 'phase', player: 'P', display: false }).enqueue();
}
function endPhase(gs: GameState, rc: UpdateGameStateService) {
  new EndGamePhaseCommand(rc, { key: 'phase', player: 'P', display: false }).enqueue();
}
function selectionPhase(gs: GameState, rc: UpdateGameStateService) {
  new SelectionGamePhaseCommand(rc, { key: 'phase', player: 'P', display: false }).enqueue();
}
function startGamePhase(gs: GameState, rc: UpdateGameStateService) {
  new StartGamePhaseCommand(rc, { key: 'phase', player: 'P', display: false }).enqueue();
}

function executeStartGamePhase(gs: GameState, rc: UpdateGameStateService) {
  const { playerWithInitiative, playerWithoutInitiative } = GameStateUtil.getInitiatives(gs);
  
  function startPhaseByPlayer(player: PlayerType) {
    const { activeMonster } = GameStateUtil.getPlayerState(gs, player);
    const key = activeMonster.key();
    new MonsterActionCommand(rc, { key, player, doMonsterAction: () => CardByKeyUtil.executeCardByKey(key, player, rc, gs) }).enqueue();
  }

  startPhaseByPlayer(playerWithInitiative);
  startPhaseByPlayer(playerWithoutInitiative);
  
}

function executeRevealPhase(gs: GameState, rc: UpdateGameStateService) {
  const { playerWithInitiative, playerWithoutInitiative } = GameStateUtil.getInitiatives(gs);

  function reveal(player: PlayerType) {
      // move buffs and discards
      const { selectedAction, playerCardManager, activeMonster } = GameStateUtil.getPlayerState(gs, player);
      playerCardManager.cleanup(selectedAction.appliedBuffs);
      playerCardManager.cleanup(selectedAction.appliedDiscards);
  }

  reveal(playerWithInitiative);
  reveal(playerWithoutInitiative);

}

function executeApplyPipsPhase(gs: GameState, rc: UpdateGameStateService) {
  const { playerWithInitiative, playerWithoutInitiative } = GameStateUtil.getInitiatives(gs);

  function applyStatPips(player: PlayerType) {
    const playerState = GameStateUtil.getPlayerState(gs, player);
    const section = playerState.selectedAction.statBoardSection;
    if (section) {
      rc.enqueue(
        new ApplyStatPipsCommand(rc, { key: 'pip', amount: section.current, player, statType: section.type })
      );
    }
  }

  applyStatPips(playerWithInitiative);
  applyStatPips(playerWithoutInitiative);
}

function executeApplyBuffs(gs: GameState, rc: UpdateGameStateService) {
  const { playerWithInitiative, playerWithoutInitiative } = GameStateUtil.getInitiatives(gs);

  function applyBuffs(gs: GameState, player: PlayerType) {
    const monsterNames = GameStateUtil.getMonsterNames(gs, player);
    const appliedBuffs = GameStateUtil.getPlayerState(gs, player).selectedAction.appliedBuffs;
    if (!appliedBuffs.length) return;

    appliedBuffs.forEach(buff => {
      // need to fire event per slot used, but only show the message for the first one
      for (let i = 0; i < buff.buffSlots; i++) {
        new ApplyBuffCommand(rc, { key: buff.key(), player, buffName: buff.name, monsterName: monsterNames.monsterName, display: i > 0 }).enqueue();
      }
      new BuffCommand(rc, { key: 'buff', player, doBuff: () => { CardByKeyUtil.executeCardByKey(buff.key(), player, rc, gs) }}).enqueue()
    });
  }

  applyBuffs(gs, playerWithInitiative);
  applyBuffs(gs, playerWithoutInitiative);
}

function executeSwitchActionsPhase(gs: GameState, rc: UpdateGameStateService) {
  const { playerWithInitiative, playerWithoutInitiative } = GameStateUtil.getInitiatives(gs);

  function performSwitchAction(gs: GameState, player: PlayerType) {
    const monsterNames = GameStateUtil.getMonsterNames(gs, player);
    const playerState = GameStateUtil.getPlayerState(gs, player);
    if (playerState.selectedAction.action?.getSelectableActionType() !== 'SWITCH') {
      return;
    }
    new SwitchRoutineCommand(rc, { key: playerState.selectedAction.action.key(), player, ...monsterNames }).enqueue();
  }

  performSwitchAction(gs, playerWithInitiative);
  performSwitchAction(gs, playerWithoutInitiative);

}

function executeMonsterActionsPhase(gs: GameState, rc: UpdateGameStateService) {
  const { fasterPlayer, slowerPlayer } = GameStateUtil.getSpeedPlayers(gs);
  
  function performMonsterAction(gs: GameState, player: PlayerType) {
    const { activeMonster, selectedAction } = GameStateUtil.getPlayerState(gs, player);
    const monsterNames = GameStateUtil.getMonsterNames(gs, player);
    if (selectedAction.action?.getSelectableActionType() !== 'MONSTER') return;
    
    const action = GameStateUtil.getMonsterActionByPlayer(gs, player);

    // draw cards check
    if (action.draw > 0) {
      new DrawCommand(rc, { key: 'draw', player, amount: action.draw,origin: action.name, display: true }).enqueue();
    }

    // add monster action effect(s) to queue
    new MonsterActionCommand(rc, { 
      key: 'ma', 
      player, 
      ...monsterNames,
      doMonsterAction: () =>  { CardByKeyUtil.executeCardByKey(selectedAction.action?.key() as string, player, rc, gs) },
    }).enqueue()
    
    if (action.attack) {
      new DealAttackDamageCommand(rc, { key: 'damage', player: player, ...monsterNames, damageToDeal: 999 }).enqueue();
    }
    // super effective check
    if (GameStateUtil.isWeak(gs, player) && !action.isStatus) {
      new WeakCommand(rc, { key: 'weak', player: GameStateUtil.getOppositePlayer(player) }).enqueue();
      const pip = CommandUtil.gainRandomStatPip(gs, { key: 'pip', player, amount: 1 }, rc);
      const msg = `The attack was super effective! ${monsterNames.monsterName} gained 1 ${pip.attack ? 'attack' : ''}${pip.speed ? 'speed' : ''}${pip.defense ? 'defense' : ''} pip.`
      new DescriptiveMessageCommand(rc, { key: 'msg', player, message: msg }).enqueue();
    }
    new RecoilCheckCommand(rc, { key: 'recoil', player, ...monsterNames }).enqueue();
  }
  const action = GameStateUtil.getMonsterActionByPlayer(gs, fasterPlayer);
  // add faster event to queue
  const monsterNames = GameStateUtil.getMonsterNames(gs, fasterPlayer);
  new FasterCommand(rc, { key: action.key(), player: fasterPlayer, ...monsterNames, display: true }).enqueue();

  performMonsterAction(gs, fasterPlayer);
  performMonsterAction(gs, slowerPlayer);

}

function executeStandardActionsPhase(gs: GameState, rc: UpdateGameStateService) {
  const { playerWithInitiative, playerWithoutInitiative } = GameStateUtil.getInitiatives(gs);

  function performStandardAction(gs: GameState, player: PlayerType) {
    const playerState = GameStateUtil.getPlayerState(gs, player);
    if (playerState.selectedAction.action?.getSelectableActionType() !== 'STANDARD') return;

    CardByKeyUtil.executeStandardAction(playerState.selectedAction.action?.key(), player, rc, gs);
    gs.battleAniService.update(player === 'P', 'USING_SPECIAL');
  }

  performStandardAction(gs, playerWithInitiative);
  performStandardAction(gs, playerWithoutInitiative);
}

function executeEndPhase(gs: GameState, rc: UpdateGameStateService) {
  const { playerWithInitiative, playerWithoutInitiative } = GameStateUtil.getInitiatives(gs);
  // this.selectedActionService.selectedAction$.next(playerState.selectedAction);

  function playerCleanup(gs: GameState, player: PlayerType) {
    // move buffs and discards
    const { selectedAction, playerCardManager, activeMonster } = GameStateUtil.getPlayerState(gs, player);
    // handle team auras
    
    activeMonster.eotCleanup(selectedAction.action?.key() as CardCompositeKey);
    activeMonster.actions.forEach(action => {
      action.modifiers.eotClear();
    });
    // TODO: fix (we just want the opponent to spam standard action for now)
    if (player === 'P') {
      gs.selectedActionService.selectedAction$.next(new SelectedAction(undefined));
      selectedAction.clear();
    }
    // draw card
    new DrawCommand(rc, { key: 'eot', player, amount: 1 }).enqueue();
  }

  playerCleanup(gs, playerWithInitiative);
  playerCleanup(gs, playerWithoutInitiative);

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
  return [p.selectedAction.action?.getSelectableActionType(), o.selectedAction.action?.getSelectableActionType()].includes('SWITCH');
}
function isMonsterActionPhaseApplicable(gs: GameState) {
  const { p, o } = GameStateUtil.getPlayerStates(gs);
  return [p.selectedAction.action?.getSelectableActionType(), o.selectedAction.action?.getSelectableActionType()].includes('MONSTER');
}
function isStandardActionPhaseApplicable(gs: GameState) {
  const { p, o } = GameStateUtil.getPlayerStates(gs);
  return [p.selectedAction.action?.getSelectableActionType(), o.selectedAction.action?.getSelectableActionType()].includes('STANDARD');
}