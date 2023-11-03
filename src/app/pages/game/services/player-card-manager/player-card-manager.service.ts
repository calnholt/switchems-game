import { Injectable } from '@angular/core';
import { PlayerCardManager } from '../../models/player/player-card-manager.model';
import { PlayerService } from '../player/player.service';
import { BehaviorSubject } from 'rxjs';
import { CardCompositeKey } from '~/app/shared/interfaces/ICompositeKey.interface';

export interface Applied {
  buff: number,
  discard: number,
  key: CardCompositeKey,
}

@Injectable({
  providedIn: 'root'
})
export class PlayerCardManagerService {

  private model!: PlayerCardManager;
  private _applied$: BehaviorSubject<Applied> = new BehaviorSubject({buff: 0, discard: 0, key: ''});

  constructor(
    private playerService: PlayerService,
  ) {
    this.setup();
  }

  public get playerCardManager(): PlayerCardManager { return this.model; }
  public get applied$() { return this._applied$; } 
  public get applied() { return this._applied$.value; }

  private setup(): void {
    this.model = this.playerService.playerCardManager;
    this.model.drawCard();
    this.model.drawCard();
    this.model.drawCard();
    this.model.drawCard();
    this.model.drawCard();
    this.model.drawCard();
    this.model.drawCard();
    this.model.drawCard();
  }

  public setApplied(key: CardCompositeKey, buff: number, discard: number) {
    this._applied$.next({
      key: key,
      buff: buff,
      discard: discard,
    })
  }
  public updateApplied(buff: number, discard: number) {
    this._applied$.next({
      ...this.applied,
      buff: buff,
      discard: discard,
    })
  }

  private endOfTurnCleanup() {
    this.model.cleanupAppliedCards();
  }

}
