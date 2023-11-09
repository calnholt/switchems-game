import { EventManagerService } from "~/app/pages/game/services/event-manager/event-manager.service";
import { CardCompositeKey } from "~/app/shared/interfaces/ICompositeKey.interface";
import { CardEffect } from "../../card-effect.model";
import { StatModificationUtil } from "~/app/pages/game/services/stat-modification/stat-modification.util";
import { PlayerType } from "../../condition.model";
import { GameStateService } from "~/app/pages/game/services/game-state/game-state.service";
import { IActionEffect } from "../../IActionEffect.interface";

export class Hypercharge extends CardEffect implements IActionEffect {
  
  constructor(key: CardCompositeKey, player: PlayerType, ems: EventManagerService, gss: GameStateService) {
    super(key, player, ems, gss);
  }

  beforeAction(): void { 
    StatModificationUtil.modifyDefense(this.ems, 1, this.playerType);
    // gain 3 attack cubes
  }

  afterAction(): void {}

  override onTrigger(): void { return; }

}