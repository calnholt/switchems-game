import { CardCompositeKey } from "~/app/shared/interfaces/ICompositeKey.interface";
import { ISwitchIn } from "../ISwitchIn.interface";
import { CardEffect } from "../card-effect.model";
import { EventManagerService } from "~/app/pages/game/services/event-manager/event-manager.service";
import { GameStateService } from "~/app/pages/game/services/game-state/game-state.service";
import { PlayerType } from "../condition.model";

export class Chargroar extends CardEffect implements ISwitchIn {

  constructor(key: CardCompositeKey, player: PlayerType, ems: EventManagerService, gss: GameStateService) {
    super(key, player, ems, gss);
  }

  override onTrigger(): void {
    throw new Error("Method not implemented.");
  }
  onSwitchIn(): void {
    // TODO: disable action of choice
  }
  
}