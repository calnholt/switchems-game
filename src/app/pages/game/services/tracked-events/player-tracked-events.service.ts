import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { PlayerType } from '../../components/game/logic/condition.model';
import { PlayerTrackedEvent } from './player-tracked-events.model';

export enum PlayerTrackedEventKey {
  monsterKnockedOutByAttack = 'monsterKnockedOutByAttack',
  damageTaken = 'damageTaken',
  // speedReverse?: boolean;
  preventFlinch = 'preventFlinch',
  monsterKnockedOut = 'monsterKnockedOut',
  preventRecoil = 'preventRecoil',
}

@Injectable({
  providedIn: 'root'
})
export class PlayerTrackedEventsService {

  readonly playerTrackedEvents$ = new BehaviorSubject<Map<PlayerTrackedEventKey, number | boolean>>(new Map());
  readonly oPlayerTrackedEvents$ = new BehaviorSubject<Map<PlayerTrackedEventKey, number | boolean>>(new Map());

  public get playerTrackedEvents() { return this.playerTrackedEvents$.value; }
  public get oPlayerTrackedEvents() { return this.oPlayerTrackedEvents$.value; }

  constructor() { }

  public addEvent(event: PlayerTrackedEvent) {
    this.getPlayerTrackedEvents(event.playerType).set(event.data.key, event.data.value);
    this.getPlayerTrackedEvents$(event.playerType).next(this.getPlayerTrackedEvents(event.playerType));
  }

  private getPlayerTrackedEvents$(playerType: PlayerType) {
    return playerType === 'P' ? this.playerTrackedEvents$ : this.oPlayerTrackedEvents$;
  }
  private getPlayerTrackedEvents(playerType: PlayerType) {
    return playerType === 'P' ? this.playerTrackedEvents : this.oPlayerTrackedEvents;
  }


}
