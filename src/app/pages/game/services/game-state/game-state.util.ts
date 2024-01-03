import { GameState, PlayerState } from "./game-state.service";
import { MonsterAction } from "../../models/monster/monster-action.model";
import { PlayerType } from "../../logic/player-type.mode";
import { DamageCalcUtil } from "../../logic/util/damage-calc.util";
import { Monster } from "../../models/monster/monster.model";

export const GameStateUtil = {
  isFaster,
  isWeak,
  isResistant,
  hasMoreHP,
  getPlayerState, 
  getOpponentPlayerState,
  getPlayerStates,
  getMonsterByPlayer,
  getMonsterAction,
  getMonsterActionByPlayer,
  dealsXDamage,
  getNumBuffSlotsUsed,
  opponentHasKnockedOutMonster,
  getFirstPlayer,
  getStatBoardByPlayer,
  getPlayerCardManagerByPlayer,
  getOppositePlayer,
  getInitiatives,
  getSpeedPlayers,
  getMonsterNames,
  getSwitchingToMonster,

}

function getPlayerState(gs: GameState, playerType: PlayerType): PlayerState {
  if (gs.activePlayerType === playerType) return gs.p;
  return gs.o;
}
function getOpponentPlayerState(gs: GameState, playerType: PlayerType): PlayerState {
  if (gs.activePlayerType === playerType) return gs.o;
  return gs.p;
}

function getOppositePlayer(playerType: PlayerType): PlayerType {
  return playerType === 'P' ? 'O' : 'P';
}

function isFaster(gs: GameState, playerType: PlayerType) {
  const { p, o } = getPlayerStates(gs, playerType);
  const selectedAction = p.selectedAction.action;
  const type = selectedAction.getSelectableActionType();
  if (type === 'SWITCH' || type === 'STANDARD') {
    return false;
  }
  const oSelectedAction = o.selectedAction.action;
  const oType = oSelectedAction.getSelectableActionType();
  if (type === 'MONSTER' && ['SWITCH', 'STANDARD'].includes(oType)) {
    return true;
  }
  const action = getMonsterAction(p);
  const monster = getMonsterByPlayer(gs, playerType);
  const oAction = getMonsterAction(o);
  const oMonster = getMonsterByPlayer(gs, getOppositePlayer(playerType));
  const speed = action.speed + monster.modifiers.sumByType('SPEED');
  const oSpeed = oAction.speed + oMonster.modifiers.sumByType('SPEED');
  if (speed > oSpeed) {
    return true;
  }
  if (speed < oSpeed) {
    return false;
  }
  const hasGreaterInitiative = p.activeMonster.initiative > o.activeMonster.initiative;
  return hasGreaterInitiative;
}

function getMonsterActionByPlayer(gs: GameState, playerType: PlayerType) {
  const playerState = gs.activePlayerType === playerType ? GameStateUtil.getPlayerState(gs, playerType) : GameStateUtil.getOpponentPlayerState(gs, getOppositePlayer(playerType));
  return GameStateUtil.getMonsterAction(playerState);
}
function getMonsterByPlayer(gs: GameState, playerType: PlayerType) {
  const playerState = gs.activePlayerType === playerType ? GameStateUtil.getPlayerState(gs, playerType) : GameStateUtil.getOpponentPlayerState(gs, getOppositePlayer(playerType));
  return playerState.activeMonster;
}
function getMonsterAction(ps: PlayerState) {
  return (ps.activeMonster.actions.find(a => a.key() === ps.selectedAction.action.key()) as MonsterAction);
}
function getStatBoardByPlayer(gs: GameState, playerType: PlayerType) {
  return getPlayerState(gs, playerType).statBoard;
}
function getPlayerCardManagerByPlayer(gs: GameState, playerType: PlayerType) {
  return getPlayerState(gs, playerType).playerCardManager;
}
function isWeak(gs: GameState, playerType: PlayerType) {
  const { p, o } = getPlayerStates(gs, playerType);
  return o.activeMonster.weaknesses.includes(getMonsterAction(p).element);
}

function isResistant(gs: GameState, playerType: PlayerType) {
  const { p, o } = getPlayerStates(gs, playerType);
  return o.activeMonster.resistances.includes(getMonsterAction(p).element);
}

function hasMoreHP(gs: GameState, playerType: PlayerType) {
  const { p, o } = getPlayerStates(gs, playerType);
  return p.activeMonster.currentHp > o.activeMonster.currentHp;
}

function dealsXDamage(gs: GameState, playerType: PlayerType, x: number) {
  return DamageCalcUtil.calculateDamage(gs, playerType) >= x;
}

function getPlayerStates(gs: GameState, playerType: PlayerType = 'P') {
  return { p: getPlayerState(gs, playerType), o: getOpponentPlayerState(gs, playerType) };
}

function getNumBuffSlotsUsed(gs: GameState, playerType: PlayerType) {
  return getPlayerState(gs, playerType).selectedAction.getNumBuffSlotsUsed();
}

function opponentHasKnockedOutMonster(gs: GameState, playerType: PlayerType) {
  return !!getOpponentPlayerState(gs, playerType).inactiveMonsters.find(m => m.currentHp === 0);
}

function getFirstPlayer(gs: GameState, playerType: PlayerType): PlayerType {
  const { p, o } = getPlayerStates(gs, playerType);
  if (!p.selectedAction.action || !o.selectedAction.action) return gs.activePlayerType;
  const monster = p.activeMonster;
  const oMonster = o.activeMonster;
  const initiative = monster.initiative;
  const oInitiative = oMonster.initiative;
  const type = p.selectedAction.action.getSelectableActionType();
  const oType = o.selectedAction.action.getSelectableActionType();
  const key = p.selectedAction.action.key();
  const oKey = o.selectedAction.action.key();
  const speed = (monster.actions.find(a => a.key() === key) as MonsterAction)?.speed + (p.activeMonster.modifiers?.sumByType('SPEED') ?? 0);
  const oSpeed = (oMonster.actions.find(a => a.key() === oKey) as MonsterAction)?.speed + (o.activeMonster.modifiers?.sumByType('SPEED') ?? 0);
  if (type !== oType) {
    if (type === 'SWITCH') return gs.activePlayerType;
    if (oType === 'SWITCH') return gs.opponentPlayerType;
    if (type === 'MONSTER') return gs.activePlayerType;
    if (oType === 'MONSTER') return gs.opponentPlayerType;
    if (type === 'STANDARD') return gs.opponentPlayerType;
    return gs.activePlayerType;
  }
  else {
    if (type === 'SWITCH' || type === 'STANDARD') {
      return initiative > oInitiative ? gs.activePlayerType : gs.opponentPlayerType;
    }
    if (speed !== oSpeed) {
      return speed > oSpeed ? gs.activePlayerType : gs.opponentPlayerType;
    }
    if (initiative === oInitiative) {
      return gs.rng.getRandomPlayer();
    }
    return initiative > oInitiative ? gs.activePlayerType : gs.opponentPlayerType;
  }
}

function getInitiatives(gs: GameState) {
  // determine initiative player
  const initiative: number = gs.p.activeMonster.initiative;
  const oInitiative: number = gs.o.activeMonster.initiative;
  const playerWithInitiative: PlayerType = getInitiativePlayer(initiative, oInitiative, gs);
  const playerWithoutInitiative: PlayerType = GameStateUtil.getOppositePlayer(playerWithInitiative);
  return { playerWithInitiative, playerWithoutInitiative };
}

function getInitiativePlayer(initiative: number, oInitiative: number, gs: GameState): PlayerType {
  if (initiative === oInitiative) {
    return gs.rng.getRandomPlayer();
  }
  return initiative > oInitiative ? gs.activePlayerType : GameStateUtil.getOppositePlayer(gs.activePlayerType);
}

function getSpeedPlayers(gs: GameState) {
  const fasterPlayer = GameStateUtil.getFirstPlayer(gs, gs.activePlayerType);
  const slowerPlayer = GameStateUtil.getOppositePlayer(fasterPlayer);
  return { fasterPlayer, slowerPlayer };
}

function getMonsterNames(gs: GameState, playerType: PlayerType) {
  return { monsterName: GameStateUtil.getMonsterByPlayer(gs, playerType).name, opponentMonsterName: GameStateUtil.getMonsterByPlayer(gs, getOppositePlayer(playerType)).name };
}

function getSwitchingToMonster(gs: GameState, playerType: PlayerType) {
  const { selectedAction, inactiveMonsters } = getPlayerState(gs, playerType);
  return inactiveMonsters.find(m => m.key() === selectedAction.action.key()) as Monster;
}