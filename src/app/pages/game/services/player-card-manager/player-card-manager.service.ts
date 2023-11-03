import { Injectable } from '@angular/core';
import { PlayerCardManager } from '../../models/player/player-card-manager.model';
import { PlayerService } from '../player/player.service';
import { BehaviorSubject } from 'rxjs';

export interface Applied {
  buff: number,
  discard: number,
}

@Injectable({
  providedIn: 'root'
})
export class PlayerCardManagerService {

  private model!: PlayerCardManager;
  private _applied$: BehaviorSubject<Applied> = new BehaviorSubject({buff: 0, discard: 0});

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

  public setApplied(buff: number, discard: number) {
    this._applied$.next({
      buff: buff,
      discard: discard,
    })
  }

  public updateApplied(buff: number, discard: number) {
    this._applied$.next({
      buff: buff + this.applied.buff,
      discard: discard + this.applied.discard,
    })
  }

  public updateAppliedBuff(buff: number) {
    this._applied$.next({
      ...this.applied,
      buff: buff + this.applied.buff,
    })
  }

  public updateAppliedDiscard(discard: number) {
    this._applied$.next({
      ...this.applied,
      discard: discard + this.applied.discard,
    })
  }

  private endOfTurnCleanup() {
    this.model.cleanupAppliedCards();
  }

}
