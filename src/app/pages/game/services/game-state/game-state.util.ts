import { ISelectableAction } from "~/app/shared/interfaces/ISelectableAction.interface";
import { PlayerType } from "../../components/game/logic/condition.model";
import { GameState, PlayerState } from "./game-state.service";
import { MonsterAction } from "../../models/monster/monster-action.model";
import { DamageCalcUtil } from "../../components/game/util/damage-calc.util";
import { PlayerTrackedEventsType } from "../tracked-events/player-tracked-events.service";

export const GameStateUtil = {
  isFaster,
  isWeak,
  isResistant,
  hasMoreHP,
  getPlayerStates,
  getMonsterAction,
  dealsXDamage,
  hasPlayerTrackedEvent,
  getNumBuffSlotsUsed,
  opponentHasKnockedOutMonster,
}

function getPlayerState(gs: GameState, playerType: PlayerType): PlayerState {
  if (playerType === 'P') return gs.p;
  return gs.o;
}
function getOpponentPlayerState(gs: GameState, playerType: PlayerType): PlayerState {
  if (playerType === 'P') return gs.o;
  return gs.p;
}

function compareInitiative(gs: GameState): PlayerType {
  if (gs.p.activeMonster.initiative === gs.o.activeMonster.initiative) return 'T';
  return gs.p.activeMonster.initiative > gs.o.activeMonster.initiative ? 'P' : 'O';
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
  const speed = getMonsterAction(p).speed + p.modifications.speed;
  const oSpeed = getMonsterAction(o).speed + o.modifications.speed;
  if (speed > oSpeed) {
    return true;
  }
  if (speed < oSpeed) {
    return false;
  }
  const hasGreaterInitiative = p.activeMonster.initiative > o.activeMonster.initiative;
  return hasGreaterInitiative;
}

function getMonsterAction(ps: PlayerState) {
  return (ps.activeMonster.actions.find(a => a.key() === (ps.selectedAction.action as ISelectableAction).key()) as MonsterAction);
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
  const { p, o } = getPlayerStates(gs, playerType);
  return DamageCalcUtil.calculateDamage(gs, playerType) >= x;
}

function getPlayerStates(gs: GameState, playerType: PlayerType) {
  return { p: getPlayerState(gs, playerType), o: getOpponentPlayerState(gs, playerType) };
}

function hasPlayerTrackedEvent(gs: GameState, playerType: PlayerType, type: PlayerTrackedEventsType) {
  return getPlayerState(gs, playerType).playerTrackedEvents.has(type);
}

function getNumBuffSlotsUsed(gs: GameState, playerType: PlayerType) {
  return getPlayerState(gs, playerType).selectedAction.getNumBuffSlotsUsed();
}

function opponentHasKnockedOutMonster(gs: GameState, playerType: PlayerType) {
  return !!getOpponentPlayerState(gs, playerType).inactiveMonsters.find(m => m.currentHp === 0);
}
