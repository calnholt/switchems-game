import { Injectable } from '@angular/core';
import { PlayerCardManagerEventData, PlayerCardManagerEventType } from './player-card-manager-event.model';

@Injectable({
  providedIn: 'root'
})
export class PlayerCardManagerEventService {

  constructor() { }

  public sendEvent(event: PlayerCardManagerEventType, data: PlayerCardManagerEventData) {
    switch(event) {
      case PlayerCardManagerEventType.TOGGLE_APPLY_BUFF:
        
    }
  }

}
