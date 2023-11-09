import { MonsterAction } from "../../models/monster/monster-action.model";
import { Monster } from "../../models/monster/monster.model";
import { GameState, PlayerState } from "../../services/game-state/game-state.service";
import { GameStateUtil } from "../../services/game-state/game-state.util";
import { PlayerType } from "../player-type.mode";

export const DamageCalcUtil = {
  calculateDamage,
}

function calculateDamage(gs: GameState, playerType: PlayerType): number {
  const { p, o } = GameStateUtil.getPlayerStates(gs, playerType);
  const action = GameStateUtil.getMonsterAction(p);

  let attack = getAttack(action);
  let defense = getDefense(o.activeMonster) + getSwitchDefense(o, action);
  let pierce = getPierce(action);
  if (pierce) {
    defense =- pierce;
    if (defense < 0) {
      defense = 0;
    }
  }
  return attack - defense;
}

function getAttack(action: MonsterAction): number {
  return action.attack + action.modifiers.sumByType('ATTACK');
}

function getDefense(monster: Monster): number {
  return monster.modifiers.sumByType('DEFENSE');
}

function getSwitchDefense(o: PlayerState, action: MonsterAction): number {
  if (o.selectedAction.action?.getSelectableActionType() !== 'SWITCH') {
    return 0;
  }
  return o.activeMonster.getResistances().includes(action.element) ? o.activeMonster.getSwitchDefenseValue() : 0;
}

function getPierce(action: MonsterAction): number {
  return action.modifiers.sumByType('PIERCE');
}