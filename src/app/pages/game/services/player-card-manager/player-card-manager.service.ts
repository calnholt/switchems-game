import { Injectable } from '@angular/core';
import { PlayerCardManager } from '../../models/player/player-card-manager.model';
import { PlayerService } from '../player/player.service';

@Injectable({
  providedIn: 'root'
})
export class PlayerCardManagerService {

  private model!: PlayerCardManager;

  constructor(
    private playerService: PlayerService,
  ) {
    this.setup();
  }

  public get playerCardManager(): PlayerCardManager { return this.model; }

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
