import { EventManagerService } from "~/app/pages/game/services/event-manager/event-manager.service";
import { GameStateService } from "~/app/pages/game/services/game-state/game-state.service";
import { CardCompositeKey } from "~/app/shared/interfaces/ICompositeKey.interface";
import { CardEffect } from "../../card-effect.model";
import { PlayerType } from "../../condition.model";
import { IActionEffect } from "../../IActionEffect.interface";
import { PlayerTrackedEventType } from "~/app/pages/game/services/tracked-events/player-tracked-events.model";
import { PlayerTrackedEventKey } from "~/app/pages/game/services/tracked-events/player-tracked-events.service";

export class SelfDefense extends CardEffect implements IActionEffect {

  constructor(key: CardCompositeKey, player: PlayerType, ems: EventManagerService, gss: GameStateService) {
    super(key, player, ems, gss);
  }

  override onTrigger(): void {
    return;
  }
  beforeAction(): void {
    this.ems.sendEvent({ 
      type: PlayerTrackedEventType.ADD, 
      data: { 
        key: PlayerTrackedEventKey.preventRecoil, 
        value: true 
      }, 
      playerType: this.playerType 
    });
  }
  
  afterAction(): void {
    return;
  }
  
}