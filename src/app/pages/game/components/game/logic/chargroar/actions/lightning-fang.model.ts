import { CardCompositeKey } from "~/app/shared/interfaces/ICompositeKey.interface";
import { PlayerType } from "../../condition.model";
import { EventManagerService } from "~/app/pages/game/services/event-manager/event-manager.service";
import { CardEffect } from "../../card-effect.model";
import { StatModificationUtil } from "~/app/pages/game/services/stat-modification/stat-modification.util";
import { GameStateService } from "~/app/pages/game/services/game-state/game-state.service";
import { GameStateUtil } from "~/app/pages/game/services/game-state/game-state.util";
import { IActionEffect } from "../../IActionEffect.interface";

export class LightningFang extends CardEffect implements IActionEffect {
  
  constructor(key: CardCompositeKey, player: PlayerType, ems: EventManagerService, gss: GameStateService) {
    super(key, player, ems, gss);
  }

  beforeAction(): void { 
    if (GameStateUtil.isFaster(this.gss.getGameState(), this.playerType)) {
      StatModificationUtil.modifyAttack(this.ems, 3, this.playerType);
    }
  }

  afterAction(): void { }

  override onTrigger(): void {
    return;
  }

}