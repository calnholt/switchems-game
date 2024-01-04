import { Injectable } from '@angular/core';
import { CardCompositeKey } from '~/app/shared/interfaces/ICompositeKey.interface';
import { PlayerType } from '../../logic/player-type.mode';
import { BehaviorSubject } from 'rxjs';
import { PlayerService } from '../player/player.service';
import { EventType, Router } from '@angular/router';
import { PlayerProfileService } from '~/app/shared/services/player-profile.service';

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
    private playerProfileService: PlayerProfileService,
  ) { 
    this._monsterBeingViewed = new BehaviorSubject<MonsterBeingViewed>({
      key: this.playerService.activeMonster.key(),
      player: this.playerProfileService.profile.playerType ?? 'P',
    });
  }

  reset() {
    this.changeViewedMonster(this.playerService.activeMonster.key(), this.playerProfileService.profile.playerType);
  }

  changeViewedMonster(key: CardCompositeKey, player: PlayerType) {
    this.monsterBeingViewed$.next({
      key, player
    })
  }

}
