import { CardCompositeKey } from "~/app/shared/interfaces/ICompositeKey.interface";
import { CardEffect } from "../../card-effect.model";
import { PlayerType } from "../../condition.model";
import { EventManagerService } from "~/app/pages/game/services/event-manager/event-manager.service";
import { GameStateService } from "~/app/pages/game/services/game-state/game-state.service";
import { StatModificationUtil } from "~/app/pages/game/services/stat-modification/stat-modification.util";
import { GameStateUtil } from "~/app/pages/game/services/game-state/game-state.util";
import { IActionEffect } from "../../IActionEffect.interface";
import { PlayerTrackedEventKey } from "~/app/pages/game/services/tracked-events/player-tracked-events.service";

export class Scavenge extends CardEffect implements IActionEffect {

  private resolved = false;

  constructor(key: CardCompositeKey, player: PlayerType, ems: EventManagerService, gss: GameStateService) {
    super(key, player, ems, gss);
  }

  override onTrigger(): void {
    return;
  }

  beforeAction(): void {
    if (this.hasEnemyMonsterBeenKnockedOutThisTurn()) {
      this.gss.getGameState().p.activeMonster.heal(6);
      this.resolved = true;
    }
  }
  
  afterAction(): void {
    if (this.hasEnemyMonsterBeenKnockedOutThisTurn() && !this.resolved) {
      this.gss.getGameState().p.activeMonster.heal(6);
      this.resolved = true;
    }
  }

  private hasEnemyMonsterBeenKnockedOutThisTurn() {
    return GameStateUtil.hasPlayerTrackedEvent(
      this.gss.getGameState(), 
      this.playerType, 
      PlayerTrackedEventKey.monsterKnockedOut,
    );
  }
  
}