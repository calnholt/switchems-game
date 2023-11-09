import { EventManagerService } from "~/app/pages/game/services/event-manager/event-manager.service";
import { GameStateService } from "~/app/pages/game/services/game-state/game-state.service";
import { GameStateUtil } from "~/app/pages/game/services/game-state/game-state.util";
import { CardCompositeKey } from "~/app/shared/interfaces/ICompositeKey.interface";
import { CardEffect } from "../../card-effect.model";
import { PlayerType } from "../../condition.model";
import { PlayerTrackedEventsType } from "~/app/pages/game/services/tracked-events/player-tracked-events.service";
import { IActionEffect } from "../../IActionEffect.interface";

export class LightsOut extends CardEffect implements IActionEffect {
  
  constructor(key: CardCompositeKey, player: PlayerType, ems: EventManagerService, gss: GameStateService) {
    super(key, player, ems, gss);
  }

  beforeAction(): void {}

  afterAction(): void { 
    if (GameStateUtil.hasPlayerTrackedEvent(this.gss.getGameState(), this.playerType, PlayerTrackedEventsType.monsterKnockedOutByAttack)) {
      // TODO: gain 2 speed cubes
    }
  }

  override onTrigger(): void {
    return;
  }

}