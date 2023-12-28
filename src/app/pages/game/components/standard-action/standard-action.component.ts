import { Component, Input } from '@angular/core';
import { StandardAction } from '../../models/standard-action/standard-action.model';
import { EventManagerService } from '../../services/event-manager/event-manager.service';
import { GameUISelectionEventType } from '../../services/game-ui-selection/game-ui-selection-event.model';
import { SelectedActionService } from '../../services/selected-action/selected-action.service';
import { TutorialService } from '../../services/tutorial/tutorial.service';

@Component({
  selector: 'sw-standard-action',
  templateUrl: './standard-action.component.html',
  styleUrls: ['./standard-action.component.scss']
})
export class StandardActionComponent {
  @Input() standardAction!: StandardAction;

  selected = false;
  isStandardActionHighlighted = false;

  constructor(
    private eventManagerService: EventManagerService,
    private selectedActionService: SelectedActionService,
    private tutorialService: TutorialService,
  ) {

  }

  ngOnInit() {
    this.selectedActionService.selectedAction$.subscribe((selectedAction) => {
      if (!selectedAction.action) return;
      if (selectedAction.action.key() === this.standardAction.key()) {
        this.selected = true;
      }
      else {
        this.selected = false;
      }
    });
    this.tutorialService.currentSection$.subscribe((value) => {
      this.isStandardActionHighlighted = !!value.types?.includes('STANDARD_ACTIONS');
    })
  }

  select() {
    this.eventManagerService.sendEvent({ type: GameUISelectionEventType.TOGGLE_ACTION, data: this.standardAction })
  }

}
