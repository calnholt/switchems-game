import { Component } from '@angular/core';
import { SelectedActionService } from '../../services/selected-action/selected-action.service';
import { StatBoardSectionType } from '../../models/stat-board/stat-board.model';
import { GamePhaseService } from '../../services/game-phase/game-phase.service';
import { CurrentPhaseService } from '../../services/current-phase/current-phase.service';

const LABEL = 'Select an action';

@Component({
  selector: 'sw-submit-action-button',
  templateUrl: './submit-action-button.component.html',
  styleUrls: ['./submit-action-button.component.scss']
})
export class SubmitActionButtonComponent {

  isCostFulfilled = false;
  displayName: string | null = null;
  label: string | null = LABEL;
  numBuffSlotsUsed: number = 0;
  statBoardSectionType: StatBoardSectionType | null = null;
  enabled = true;

  constructor(
    private selectedActionService: SelectedActionService,
    private gamePhaseService: GamePhaseService,
    private currentPhaseService: CurrentPhaseService,
  ) {

  }

  ngOnInit() {
    this.selectedActionService.selectedAction$.subscribe((selectedAction) => {
      if (!selectedAction.action) return;
      this.displayName = selectedAction.action.getDisplayName();
      this.isCostFulfilled = selectedAction.isCostFulfilled();
      this.label = this.getDisplayText();
    })
    this.currentPhaseService.currentPhase$.subscribe((phase) => {
      this.enabled = phase === 'SELECTION_PHASE';
      if (phase === 'SELECTION_PHASE') {
        this.label = LABEL;
      }
    })
  }

  getDisplayText(): string {
    if (this.isCostFulfilled) {
      return `${this.displayName} - GO!`;
    }
    return `${this.displayName} (requires discard)`;
  }

  submit() {
    if (this.enabled) {
      this.gamePhaseService.testActionPhase();
    }
  }

}
