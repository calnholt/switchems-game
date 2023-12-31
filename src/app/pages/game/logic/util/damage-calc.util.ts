import { MonsterAction } from "../../models/monster/monster-action.model";
import { Monster } from "../../models/monster/monster.model";
import { GameState, PlayerState } from "../../services/game-state/game-state.service";
import { GameStateUtil } from "../../services/game-state/game-state.util";
import { Modifier, Modifiers, MonsterModifierType } from "../modifiers/modifier.model";
import { PlayerType } from "../player-type.mode";

export const DamageCalcUtil = {
  calculateDamage,
}

function calculateDamage(gs: GameState, playerType: PlayerType): number {
  const { p, o } = GameStateUtil.getPlayerStates(gs, playerType);
  const { activeMonster } = p;
  const { modifiers } = activeMonster;
  const action = GameStateUtil.getMonsterAction(p) as MonsterAction;

  let attack = getAttack(action, modifiers);
  let defense = getDefense(o.activeMonster) + getSwitchDefense(o, action);
  let pierce = getPierce(modifiers);
  if (pierce) {
    defense =- pierce;
    if (defense < 0) {
      defense = 0;
    }
  }
  return attack - defense;
}

function getAttack(action: MonsterAction, modifiers: Modifiers<MonsterModifierType>): number {
  return action.attack + modifiers.sumByType('ATTACK');
}

function getDefense(monster: Monster): number {
  return monster.modifiers.sumByType('DEFENSE');
}

function getSwitchDefense(o: PlayerState, action: MonsterAction): number {
  const modifiers = o.activeMonster.modifiers.getByType('SWITCH_IN_DEFENSE');
  if (!modifiers || !modifiers.length) {
    return 0;
  }
  return modifiers[0].value;
}

function getPierce(modifiers: Modifiers<MonsterModifierType>): number {
  return modifiers.sumByType('PIERCE');
}