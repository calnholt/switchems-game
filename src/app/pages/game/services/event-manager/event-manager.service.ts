import { Injectable } from '@angular/core';
import { EventDataType } from './event.model';
import { GameUISelectionEvent, GameUISelectionEventType } from '../game-ui-selection/game-ui-selection-event.model';
import { GameUISelectionService } from '../game-ui-selection/game-ui-selection.service';
import { StatModificationEvent, StatModificationEventType } from '../stat-modification/stat-modification.model';
import { StatModificationService } from '../stat-modification/stat-modification.service';

@Injectable({
  providedIn: 'root'
})
export class EventManagerService {

  constructor(
    private gameUISelectionService: GameUISelectionService,
    private statModificationService: StatModificationService,
  ) { }

  public sendEvent(event: EventDataType) {
    if (Object.values(GameUISelectionEventType).includes(event.type as GameUISelectionEventType)) {
      this.gameUISelectionService.sendEvent(event as GameUISelectionEvent)
    }
    if (Object.values(StatModificationEventType).includes(event.type as StatModificationEventType)) {
      this.statModificationService.sendEvent(event as StatModificationEvent)
    }
  }
}
