import { Component } from '@angular/core';
import { SelectedActionService } from '../../services/selected-action/selected-action.service';
import { StatBoardSectionType } from '../../models/stat-board/stat-board.model';

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
  ) {

  }

  ngOnInit() {
    this.selectedActionService.selectedAction$.subscribe((selectedAction) => {
      if (!selectedAction.action) return;
      this.displayName = selectedAction.action.getDisplayName();
      const num  = selectedAction.getNumDiscardSlotsUsed();
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

}
