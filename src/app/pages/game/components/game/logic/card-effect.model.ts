import { CardCompositeKey } from "~/app/shared/interfaces/ICompositeKey.interface";
import { EventManagerService } from "../../../services/event-manager/event-manager.service";
import { Condition, PlayerType } from "./condition.model";
import { BehaviorSubject } from "rxjs";
import { GameStateService } from "../../../services/game-state/game-state.service";

export abstract class CardEffect {
  readonly key: string;
  readonly playerType: PlayerType;
  readonly ems: EventManagerService;
  readonly gss: GameStateService;
  readonly trigger$?: BehaviorSubject<Condition>;

  readonly isSingleUse = false;
  readonly isTeamAura = false;

  // this assumes only one trigger...
  constructor(
    key: CardCompositeKey, 
    player: PlayerType, 
    ems: EventManagerService,
    gss: GameStateService,
    trigger$?: BehaviorSubject<Condition>) {
    this.key = key;
    this.playerType = player;
    this.gss = gss;
    this.ems = ems;
    if (trigger$) {
      this.trigger$ = trigger$;
      this.trigger$.subscribe((condition) => {
        if (condition.passCondition(this.playerType, this.key)) {
          this.onTrigger();
        }
      })
    }
  }

  public remove() { this.trigger$?.unsubscribe(); }

  abstract onTrigger(): void;

  protected getOppositePlayerType(): PlayerType { 
    return this.playerType === 'P' ? 'O' : 'P';
  }

}


