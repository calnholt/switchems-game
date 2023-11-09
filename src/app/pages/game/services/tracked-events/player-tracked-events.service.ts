import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { PlayerType } from '../../components/game/logic/condition.model';

export enum PlayerTrackedEventsType {
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

  readonly playerTrackedEvents$ = new BehaviorSubject<Map<PlayerTrackedEventsType, number | boolean>>(new Map());
  readonly oPlayerTrackedEvents$ = new BehaviorSubject<Map<PlayerTrackedEventsType, number | boolean>>(new Map());

  public get playerTrackedEvents() { return this.playerTrackedEvents$.value; }
  public get oPlayerTrackedEvents() { return this.oPlayerTrackedEvents$.value; }

  constructor() { }

  public addEvent(type: PlayerTrackedEventsType, value: any, playerType: PlayerType) {
    this.getPlayerTrackedEvents(playerType).set(type, value);
    this.getPlayerTrackedEvents$(playerType).next(this.getPlayerTrackedEvents(playerType));
  }

  private getPlayerTrackedEvents$(playerType: PlayerType) {
    return playerType === 'P' ? this.playerTrackedEvents$ : this.oPlayerTrackedEvents$;
  }
  private getPlayerTrackedEvents(playerType: PlayerType) {
    return playerType === 'P' ? this.playerTrackedEvents : this.oPlayerTrackedEvents;
  }


}
