import { ISelectableAction } from "~/app/shared/interfaces/ISelectableAction.interface";
import { GameState, PlayerState } from "./game-state.service";
import { MonsterAction } from "../../models/monster/monster-action.model";
import { PlayerType } from "../../logic/player-type.mode";
import { DamageCalcUtil } from "../../logic/util/damage-calc.util";

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
}

function getPlayerState(gs: GameState, playerType: PlayerType): PlayerState {
  if (playerType === 'P') return gs.p;
  return gs.o;
}
function getOpponentPlayerState(gs: GameState, playerType: PlayerType): PlayerState {
  if (playerType === 'P') return gs.o;
  return gs.p;
}

function getOppositePlayer(playerType: PlayerType) {
  return playerType === 'P' ? 'O' : 'P';
}

function isFaster(gs: GameState, playerType: PlayerType) {
  const { p, o } = getPlayerStates(gs, playerType);
  const selectedAction = (p.selectedAction.action as ISelectableAction);
  const type = selectedAction.getSelectableActionType();
  if (type === 'SWITCH' || type === 'STANDARD') {
    return false;
  }
  const oSelectedAction = (o.selectedAction.action as ISelectableAction);
  const oType = oSelectedAction.getSelectableActionType();
  if (type === 'MONSTER' && oType === 'STANDARD') {
    return true;
  }
  const action = getMonsterAction(p);
  const oAction = getMonsterAction(o);
  const speed = action.speed + action.modifiers.sumByType('SPEED');
  const oSpeed = oAction.speed + oAction.modifiers.sumByType('SPEED');
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
  const playerState = playerType === 'P' ? GameStateUtil.getPlayerState(gs, playerType) : GameStateUtil.getOpponentPlayerState(gs, getOppositePlayer(playerType));
  return GameStateUtil.getMonsterAction(playerState);
}
function getMonsterByPlayer(gs: GameState, playerType: PlayerType) {
  const playerState = playerType === 'P' ? GameStateUtil.getPlayerState(gs, playerType) : GameStateUtil.getOpponentPlayerState(gs, getOppositePlayer(playerType));
  return playerState.activeMonster;
}
function getMonsterAction(ps: PlayerState) {
  return (ps.activeMonster.actions.find(a => a.key() === (ps.selectedAction.action as ISelectableAction).key()) as MonsterAction);
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

function getPlayerStates(gs: GameState, playerType: PlayerType) {
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
  if (!p.selectedAction.action || !o.selectedAction.action) return 'P';
  const monster = p.activeMonster;
  const oMonster = o.activeMonster;
  const initiative = monster.initiative;
  const oInitiative = oMonster.initiative;
  const type = p.selectedAction.action.getSelectableActionType();
  const oType = o.selectedAction.action.getSelectableActionType();
  const key = p.selectedAction.action.key();
  const oKey = o.selectedAction.action.key();
  const speed = (monster.actions.find(a => a.key() === key) as MonsterAction)?.speed;
  const oSpeed = (oMonster.actions.find(a => a.key() === oKey) as MonsterAction)?.speed;
  if (type !== oType) {
    if (type === 'SWITCH') return 'P';
    if (oType === 'SWITCH') return 'O';
    if (type === 'MONSTER') return 'P';
    if (oType === 'MONSTER') return 'O';
    if (type === 'STANDARD') return 'O';
    return 'P';
  }
  else {
    if (type === 'SWITCH' || type === 'STANDARD') {
      return initiative > oInitiative ? 'P' : 'O';
    }
    if (speed !== oSpeed) {
      return speed > oSpeed ? 'P' : 'O';
    }
    if (initiative === oInitiative) {
      return gs.rng.getRandomPlayer();
    }
    return initiative > oInitiative ? 'P' : 'O';
  }
}
