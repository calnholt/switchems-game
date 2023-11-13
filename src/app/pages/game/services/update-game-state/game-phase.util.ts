import { ApplyBuffCommand } from "../../logic/commands/buff-command.model";
import { ApplyBuffsGamePhaseCommand, ApplyPipsGamePhaseCommand, EndGamePhaseCommand, MonsterActionsGamePhaseCommand, RevealGamePhaseCommand, RevealGamePhaseCommandData, SelectionGamePhaseCommand, StandardActionsGamePhaseCommand, SwitchActionsGamePhaseCommand } from "../../logic/commands/game-phase-commands.model";
import { DrawCommand } from "../../logic/commands/hand-commands.model";
import { FasterCommand } from "../../logic/commands/monster-action-commands.model";
import { ApplyStatPipsCommand } from "../../logic/commands/stat-pip-commands.model";
import { PlayerType } from "../../logic/player-type.mode";
import { CardByKeyUtil } from "../../logic/util/card-by-key.util";
import { GameState } from "../game-state/game-state.service";
import { GameStateUtil } from "../game-state/game-state.util";
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
  new RevealGamePhaseCommand(rc, { opponentAction: gs.o.selectedAction, key: 'phase', player: 'P', display: false }).enqueue();
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
    const appliedBuffs = GameStateUtil.getPlayerState(gs, player).selectedAction.appliedBuffs;
    if (!appliedBuffs.length) return;

    appliedBuffs.forEach(buff => {
      rc.enqueue(
        new ApplyBuffCommand(rc, { key: buff.key(), player, buffName: buff.name, monsterName: buff.monsterName })
      )
      CardByKeyUtil.getCardByKey(buff.key(), player, rc, gs);
    });
  }

  applyBuffs(gs, playerWithInitiative);
  applyBuffs(gs, playerWithoutInitiative);
}

function executeSwitchActionsPhase(gs: GameState, rc: UpdateGameStateService) {
  const { playerWithInitiative, playerWithoutInitiative } = GameStateUtil.getInitiatives(gs);

  function performSwitchAction(gs: GameState, player: PlayerType) {
    const playerState = GameStateUtil.getPlayerState(gs, player);
    if (playerState.selectedAction.action?.getSelectableActionType() !== 'SWITCH') {
      return;
    }
    // switch out dialog command
    // switch out command
    // switch in command
  }

}

function executeMonsterActionsPhase(gs: GameState, rc: UpdateGameStateService) {
  const { fasterPlayer, slowerPlayer } = GameStateUtil.getSpeedPlayers(gs);
  
  function performMonsterAction(gs: GameState, player: PlayerType) {
    const playerState = GameStateUtil.getPlayerState(gs, player);
    const opponentState = GameStateUtil.getPlayerState(gs, GameStateUtil.getOppositePlayer(player));
    if (playerState.selectedAction.action?.getSelectableActionType() !== 'MONSTER') return;

    // add monster action effect(s) to queue
    CardByKeyUtil.getCardByKey(playerState.selectedAction.action?.key(), player, rc, gs);
  }
  const monsterNames = GameStateUtil.getMonsterNames(gs, fasterPlayer);

  // add faster event to queue
  new FasterCommand(rc, { key: 'faster', player: fasterPlayer, ...monsterNames }).enqueue();

  performMonsterAction(gs, fasterPlayer);
  performMonsterAction(gs, slowerPlayer);

}

function executeStandardActionsPhase(gs: GameState, rc: UpdateGameStateService) {
  const { playerWithInitiative, playerWithoutInitiative } = GameStateUtil.getInitiatives(gs);

  function performStandardAction(gs: GameState, player: PlayerType) {
    const playerState = GameStateUtil.getPlayerState(gs, player);
    if (playerState.selectedAction.action?.getSelectableActionType() !== 'STANDARD') return;

    CardByKeyUtil.getCardByKey(playerState.selectedAction.action?.key(), player, rc, gs);
  }

  performStandardAction(gs, playerWithInitiative);
  performStandardAction(gs, playerWithoutInitiative);
}

function executeEndPhase(gs: GameState, rc: UpdateGameStateService) {
  const { playerWithInitiative, playerWithoutInitiative } = GameStateUtil.getInitiatives(gs);
  // this.selectedActionService.selectedAction$.next(playerState.selectedAction);

  function playerCleanup(gs: GameState, player: PlayerType) {
    // move buffs and discards
    const playerState = GameStateUtil.getPlayerState(gs, player);
    playerState.playerCardManager.cleanup(playerState.selectedAction.appliedBuffs);
    playerState.playerCardManager.cleanup(playerState.selectedAction.appliedDiscards);
    playerState.selectedAction.clear();

    // // handle team aura
    // // cleanup triggers
    // // cleanup modifiers
    playerState.activeMonster.modifiers.eotClear();
    playerState.activeMonster.actions.forEach(action => {
      action.modifiers.eotClear();
    });
    // draw card(s)
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