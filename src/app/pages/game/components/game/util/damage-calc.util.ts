import { GameState } from "../../../services/game-state/game-state.service";
import { GameStateUtil } from "../../../services/game-state/game-state.util";
import { PlayerType } from "../logic/condition.model";

export const DamageCalcUtil = {
  calculateDamage,
}

function calculateDamage(gs: GameState, playerType: PlayerType): number {
  const { p, o } = GameStateUtil.getPlayerStates(gs, playerType);
  const action = GameStateUtil.getMonsterAction(p);
  let totalAttack = (action.attack + p.modifications.attack);
  let defense = o.modifications.defense;
  if (p.modifications.pierce) {
    defense =- p.modifications.pierce;
    if (defense < 0) {
      defense = 0;
    }
  }
  return totalAttack - defense;
}
