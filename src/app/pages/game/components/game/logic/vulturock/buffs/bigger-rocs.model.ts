import { EventManagerService } from "~/app/pages/game/services/event-manager/event-manager.service";
import { GameStateService } from "~/app/pages/game/services/game-state/game-state.service";
import { CardCompositeKey } from "~/app/shared/interfaces/ICompositeKey.interface";
import { CardEffect } from "../../card-effect.model";
import { PlayerType } from "../../condition.model";
import { IActionEffect } from "../../IActionEffect.interface";
import { StatModificationUtil } from "~/app/pages/game/services/stat-modification/stat-modification.util";

export class SelfDefense extends CardEffect implements IActionEffect {

  constructor(key: CardCompositeKey, player: PlayerType, ems: EventManagerService, gss: GameStateService) {
    super(key, player, ems, gss);
  }

  override onTrigger(): void {
    return;
  }
  beforeAction(): void {
    StatModificationUtil.modifyAttack(this.ems, 2, this.playerType);
    StatModificationUtil.modifyRecoil(this.ems, 1, this.playerType);
  }
  
  afterAction(): void {
    return;
  }
  
}