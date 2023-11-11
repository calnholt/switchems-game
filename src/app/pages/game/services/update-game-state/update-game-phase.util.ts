import { ApplyBuffCommand } from "../../logic/commands/buff-command.model";
import { ApplyBuffsGamePhaseCommand, ApplyPipsGamePhaseCommand, EndGamePhaseCommand, MonsterActionsGamePhaseCommand, RevealGamePhaseCommand, RevealGamePhaseCommandData, SelectionGamePhaseCommand, StandardActionsGamePhaseCommand, SwitchActionsGamePhaseCommand } from "../../logic/commands/game-phase-commands.model";
import { DrawCommand } from "../../logic/commands/hand-commands.model";
import { DealDamageCommand, FasterCommand } from "../../logic/commands/monster-action-commands.model";
import { ApplyStatPipsCommand } from "../../logic/commands/stat-pip-commands.model";
import { PlayerType } from "../../logic/player-type.mode";
import { CardByKeyUtil } from "../../logic/util/card-by-key.util";
import { DamageCalcUtil } from "../../logic/util/damage-calc.util";
import { EventUpdateMediatorService } from "../event-update-mediator.service";
import { GameState } from "../game-state/game-state.service";
import { GameStateUtil } from "../game-state/game-state.util";
import { UpdateGameStateService } from "./update-game-state.service";

export const UpdateGamePhaseUtil = {
  revealPhase,
  applyPipsPhase,
  applyBuffsPhase,
  switchActionsPhase,
  monsterActionsPhase,
  standardActionsPhase,
  endPhase,
  selectionPhase,

  executeRevealPhase,
  executeApplyPipsPhase,
  executeApplyBuffs,
  executeSwitchActionsPhase,
  executeMonsterActionsPhase,
  executeStandardActionsPhase,
  executeEndPhase,
}

function revealPhase(gs: GameState, rc: EventUpdateMediatorService) {
  rc.enqueue(new RevealGamePhaseCommand({ opponentAction: gs.o.selectedAction, key: 'phase', player: 'P'}));
}
function applyPipsPhase(gs: GameState, rc: EventUpdateMediatorService) {
  rc.enqueue(new ApplyPipsGamePhaseCommand({ key: 'phase', player: 'P' }));
}
function applyBuffsPhase(gs: GameState, rc: EventUpdateMediatorService) {
  rc.enqueue(new ApplyBuffsGamePhaseCommand({ key: 'phase', player: 'P' }));
}
function switchActionsPhase(gs: GameState, rc: EventUpdateMediatorService) {
  rc.enqueue(new SwitchActionsGamePhaseCommand({ key: 'phase', player: 'P' }));
}
function monsterActionsPhase(gs: GameState, rc: EventUpdateMediatorService) {
  rc.enqueue(new MonsterActionsGamePhaseCommand({ key: 'phase', player: 'P' }));
}
function standardActionsPhase(gs: GameState, rc: EventUpdateMediatorService) {
  rc.enqueue(new StandardActionsGamePhaseCommand({ key: 'phase', player: 'P' }));
}
function endPhase(gs: GameState, rc: EventUpdateMediatorService) {
  rc.enqueue(new EndGamePhaseCommand({ key: 'phase', player: 'P' }));
}
function selectionPhase(gs: GameState, rc: EventUpdateMediatorService) {
  rc.enqueue(new SelectionGamePhaseCommand({ key: 'phase', player: 'P' }));
}

function executeRevealPhase(gs: GameState, rc: EventUpdateMediatorService) {
  gs.currentPhase$.next('APPLY_PIPS_PHASE');
}

function executeApplyPipsPhase(gs: GameState, rc: EventUpdateMediatorService) {
  const { playerWithInitiative, playerWithoutInitiative } = GameStateUtil.getInitiatives(gs);
  
  function applyStatPips(player: PlayerType) {
    const playerState = GameStateUtil.getPlayerState(gs, player);
    const section = playerState.selectedAction.statBoardSection;
    if (section) {
      rc.enqueue(
        new ApplyStatPipsCommand({ key: 'pip', amount: section.current, player, statType: section.type })
        );
      }
    }
    
  applyStatPips(playerWithInitiative);
  applyStatPips(playerWithoutInitiative);
  
  gs.currentPhase$.next('APPLY_BUFFS_PHASE');
}

function executeApplyBuffs(gs: GameState, rc: EventUpdateMediatorService) {
  const { playerWithInitiative, playerWithoutInitiative } = GameStateUtil.getInitiatives(gs);

  function applyBuffs(gs: GameState, player: PlayerType) {
    const appliedBuffs = GameStateUtil.getPlayerState(gs, player).selectedAction.appliedBuffs;
    if (!appliedBuffs.length) return;

    appliedBuffs.forEach(buff => {
      rc.enqueue(
        new ApplyBuffCommand({ key: buff.key(), player, buffName: buff.name, monsterName: buff.monsterName })
      )
      CardByKeyUtil.getCardByKey(buff.key(), player, rc, gs);
    });
  }

  applyBuffs(gs, playerWithInitiative);
  applyBuffs(gs, playerWithoutInitiative);

  gs.currentPhase$.next('SWITCH_ACTIONS_PHASE');
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

  gs.currentPhase$.next('MONSTER_ACTIONS_PHASE');
}

function executeMonsterActionsPhase(gs: GameState, rc: EventUpdateMediatorService) {
  const { fasterPlayer, slowerPlayer } = GameStateUtil.getSpeedPlayers(gs);
  
  function performMonsterAction(gs: GameState, player: PlayerType, opponent: PlayerType) {
    const playerState = GameStateUtil.getPlayerState(gs, player);
    const opponentState = GameStateUtil.getPlayerState(gs, GameStateUtil.getOppositePlayer(player));
    if (playerState.selectedAction.action?.getSelectableActionType() !== 'MONSTER') return;

    const opponentMonster = GameStateUtil.getMonsterByPlayer(gs, fasterPlayer);
    CardByKeyUtil.getCardByKey(playerState.selectedAction.action?.key(), player, rc, gs);
    const damage = DamageCalcUtil.calculateDamage(gs, player);
    rc.enqueue(new DealDamageCommand({ damageToDeal: damage, key: opponentMonster.key(), player: opponent, ...GameStateUtil.getMonsterNames(gs, player, opponent) }))
  }
  
  // faster
  const monster = GameStateUtil.getMonsterByPlayer(gs, fasterPlayer);
  rc.enqueue(new FasterCommand({ key: monster.key(), player: fasterPlayer, ...GameStateUtil.getMonsterNames(gs, fasterPlayer, slowerPlayer) }));
  
  performMonsterAction(gs, fasterPlayer, slowerPlayer);
  performMonsterAction(gs, slowerPlayer, fasterPlayer);

  gs.currentPhase$.next('STANDARD_ACTIONS_PHASE');
}

function executeStandardActionsPhase(gs: GameState, rc: EventUpdateMediatorService) {
  const { playerWithInitiative, playerWithoutInitiative } = GameStateUtil.getInitiatives(gs);

  function performStandardAction(gs: GameState, player: PlayerType) {
    const playerState = GameStateUtil.getPlayerState(gs, player);
    if (playerState.selectedAction.action?.getSelectableActionType() !== 'STANDARD') return;

    CardByKeyUtil.getCardByKey(playerState.selectedAction.action?.key(), player, rc, gs);
  }

  performStandardAction(gs, playerWithInitiative);
  performStandardAction(gs, playerWithoutInitiative);

  gs.currentPhase$.next('END_PHASE');
}

function executeEndPhase(gs: GameState, rc: EventUpdateMediatorService) {
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
    rc.enqueue(
      new DrawCommand({ key: 'eot', player })
    );
  }

  playerCleanup(gs, playerWithInitiative);
  playerCleanup(gs, playerWithoutInitiative);

  gs.currentPhase$.next('SELECTION_PHASE');
}