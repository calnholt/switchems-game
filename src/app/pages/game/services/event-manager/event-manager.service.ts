import { Injectable } from '@angular/core';
import { EventDataType } from './event.model';
import { GameUISelectionEvent, GameUISelectionEventType } from '../game-ui-selection/game-ui-selection-event.model';
import { GameUISelectionService } from '../game-ui-selection/game-ui-selection.service';

@Injectable({
  providedIn: 'root'
})
export class EventManagerService {

  constructor(
    private gameUISelectionService: GameUISelectionService,
  ) { }

  public sendEvent(event: EventDataType) {
    if (Object.values(GameUISelectionEventType).includes(event.type as GameUISelectionEventType)) {
      this.gameUISelectionService.sendEvent(event as GameUISelectionEvent)
    }
  }
}
