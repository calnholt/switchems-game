import { Component, Input } from '@angular/core';
import { StandardAction } from '../../models/standard-action/standard-action.model';
import { EventManagerService } from '../../services/event-manager/event-manager.service';
import { GameUISelectionEventType } from '../../services/game-ui-selection/game-ui-selection-event.model';

@Component({
  selector: 'sw-standard-action',
  templateUrl: './standard-action.component.html',
  styleUrls: ['./standard-action.component.scss']
})
export class StandardActionComponent {
  @Input() standardAction!: StandardAction;

  constructor(
    private eventManagerService: EventManagerService,
  ) {

  }

  select() {
    this.eventManagerService.sendEvent({ type: GameUISelectionEventType.TOGGLE_ACTION, data: this.standardAction })
  }

}
