import { Injectable } from '@angular/core';
import { PlayerCardManagerEventService } from '../player-card-manager/player-card-manager-event.service';
import { EventDataType } from './event.model';
import { PlayerCardManagerEventType } from '../player-card-manager/player-card-manager-event.model';

@Injectable({
  providedIn: 'root'
})
export class EventManagerService {

  constructor(
    private playerCardManagerService: PlayerCardManagerEventService,
  ) { }

  public sendEvent(event: EventDataType) {
    
    if (Object.values(PlayerCardManagerEventType).includes(event.type as PlayerCardManagerEventType)) {
      this.playerCardManagerService.sendEvent(event)
    }
  }

}
