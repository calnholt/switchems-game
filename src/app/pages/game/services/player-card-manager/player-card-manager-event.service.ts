import { Injectable } from '@angular/core';
import { PlayerCardManagerEvent, PlayerCardManagerEventData, PlayerCardManagerEventType } from './player-card-manager-event.model';
import { PlayerCardManagerService } from './player-card-manager.service';

@Injectable({
  providedIn: 'root'
})
export class PlayerCardManagerEventService {

  constructor(
    private playerCardManagerService: PlayerCardManagerService
  ) { }

  public sendEvent(event: PlayerCardManagerEvent) {
    switch(event.type) {
      case PlayerCardManagerEventType.TOGGLE_APPLY_BUFF:
        this.playerCardManagerService.playerCardManager.toggleCardAsBuff(event.data);
        break;
      case PlayerCardManagerEventType.TOGGLE_APPLY_DISCARD:
        this.playerCardManagerService.playerCardManager.toggleCardAsDiscard(event.data);
        break;
    }
  }
}
