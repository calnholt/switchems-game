import { Injectable } from '@angular/core';
import { PlayerCardManager } from '../../models/player/player-card-manager.model';
import { PlayerService } from '../player/player.service';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PlayerCardManagerService {

  private model!: PlayerCardManager;
  private _applied$: BehaviorSubject<{buff: number, discard: number}> = new BehaviorSubject({buff: 0, discard: 0});

  constructor(
    private playerService: PlayerService,
  ) {
    this.setup();
  }

  public get playerCardManager(): PlayerCardManager { return this.model; }
  public get applied$() { return this._applied$ }; 

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

  private endOfTurnCleanup() {
    this.model.cleanupAppliedCards();
  }

}
