import { Injectable } from '@angular/core';
import { PlayerCardManagerEventService } from '../player-card-manager/player-card-manager-event.service';
import { EventType } from './event.model';
import { PlayerCardManagerEventType } from '../player-card-manager/player-card-manager-event.model';

@Injectable({
  providedIn: 'root'
})
export class EventManagerService {

  constructor(
    private playerCardManagerService: PlayerCardManagerEventService,
  ) { }

  public sendEvent(type: EventType, data: any) {
    
    if (Object.values(PlayerCardManagerEventType).includes(type as PlayerCardManagerEventType)) {
      this.playerCardManagerService.sendEvent(type, data)
    }
  }

}
