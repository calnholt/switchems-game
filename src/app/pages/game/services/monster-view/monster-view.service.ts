import { Injectable } from '@angular/core';
import { CardCompositeKey } from '~/app/shared/interfaces/ICompositeKey.interface';
import { PlayerType } from '../../logic/player-type.mode';
import { BehaviorSubject } from 'rxjs';
import { PlayerService } from '../player/player.service';
import { EventType, Router } from '@angular/router';

export interface MonsterBeingViewed {
  key: CardCompositeKey;
  player: PlayerType;
}

@Injectable({
  providedIn: 'root'
})
export class MonsterViewService {

  private _monsterBeingViewed: BehaviorSubject<MonsterBeingViewed>;

  public get monsterBeingViewed() { return this._monsterBeingViewed.value; }
  public get monsterBeingViewed$() { return this._monsterBeingViewed; }

  constructor(
    private playerService: PlayerService,
  ) { 
    this._monsterBeingViewed = new BehaviorSubject<MonsterBeingViewed>({
      key: this.playerService.activeMonster.key(),
      player: 'P',
    });
  }

  reset() {
    this.changeViewedMonster(this.playerService.activeMonster.key(), 'P');
  }

  changeViewedMonster(key: CardCompositeKey, player: PlayerType) {
    this.monsterBeingViewed$.next({
      key, player
    })
  }

}
