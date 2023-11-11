import { Component } from '@angular/core';
import { SelectedActionService } from '../../services/selected-action/selected-action.service';
import { StatBoardSectionType } from '../../models/stat-board/stat-board.model';
import { GamePhaseService } from '../../services/game-phase/game-phase.service';

@Component({
  selector: 'sw-submit-action-button',
  templateUrl: './submit-action-button.component.html',
  styleUrls: ['./submit-action-button.component.scss']
})
export class SubmitActionButtonComponent {

  isCostFulfilled = false;
  displayName: string | null = null;
  label: string | null = 'Select an action';
  numBuffSlotsUsed: number = 0;
  statBoardSectionType: StatBoardSectionType | null = null;

  constructor(
    private selectedActionService: SelectedActionService,
    private gamePhaseService: GamePhaseService
  ) {

  }

  ngOnInit() {
    this.selectedActionService.selectedAction$.subscribe((selectedAction) => {
      if (!selectedAction.action) return;
      this.displayName = selectedAction.action.getDisplayName();
      this.isCostFulfilled = selectedAction.isCostFulfilled();
      this.label = this.getDisplayText();
    })
  }

  getDisplayText(): string {
    if (this.isCostFulfilled) {
      return `${this.displayName} - GO!`;
    }
    return `${this.displayName} (requires discard)`;
  }

  submit() {
    this.gamePhaseService.testActionPhase();
  }

}
