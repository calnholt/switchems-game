import { EventManagerService } from "~/app/pages/game/services/event-manager/event-manager.service";
import { GameStateService } from "~/app/pages/game/services/game-state/game-state.service";
import { GameStateUtil } from "~/app/pages/game/services/game-state/game-state.util";
import { StatModificationUtil } from "~/app/pages/game/services/stat-modification/stat-modification.util";
import { CardCompositeKey } from "~/app/shared/interfaces/ICompositeKey.interface";
import { CardEffect } from "../../card-effect.model";
import { PlayerType } from "../../condition.model";
import { IActionEffect } from "../../IActionEffect.interface";

export class Revenge extends CardEffect implements IActionEffect {

  constructor(key: CardCompositeKey, player: PlayerType, ems: EventManagerService, gss: GameStateService) {
    super(key, player, ems, gss);
  }

  override onTrigger(): void {
    return;
  }
  beforeAction(): void {
    const isEnemyMonsterResistant = GameStateUtil.isResistant(this.gss.getGameState(), this.playerType);
    if (isEnemyMonsterResistant) {
      StatModificationUtil.modifySpeed(this.ems, 2, this.playerType);
      StatModificationUtil.modifyAttack(this.ems, 1, this.playerType);
    }
    else {
      StatModificationUtil.modifyRecoil(this.ems, 1, this.playerType);
    }
  }
  
  afterAction(): void {
    return;
  }
  
}