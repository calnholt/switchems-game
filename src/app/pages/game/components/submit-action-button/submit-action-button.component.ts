import { Component, EventEmitter, Input, Output } from '@angular/core';
import { SelectedActionService } from '../../services/selected-action/selected-action.service';
import { StatBoardSection, StatBoardSectionType } from '../../models/stat-board/stat-board.model';
import { GamePhaseService } from '../../services/game-phase/game-phase.service';
import { CurrentPhaseService } from '../../services/current-phase/current-phase.service';

const LABEL = 'Select an action';

@Component({
  selector: 'sw-submit-action-button',
  templateUrl: './submit-action-button.component.html',
  styleUrls: ['./submit-action-button.component.scss']
})
export class SubmitActionButtonComponent {
  @Input() viewingOtherMonstersActions = false;
  @Output() onSelect: EventEmitter<boolean> = new EventEmitter();

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
      if (selectedAction.action.getSelectableActionType() === 'NONE') {
        this.isCostFulfilled = false;
        return;
      }
      this.displayName = selectedAction.action.getDisplayName();
      this.isCostFulfilled = selectedAction.isCostFulfilled();
      this.label = this.getDisplayText(selectedAction?.statBoardSection);
    })
    this.currentPhaseService.currentPhase$.subscribe((phase) => {
      this.enabled = phase === 'SELECTION_PHASE';
      if (phase === 'SELECTION_PHASE') {
        this.label = LABEL;
      }
    })
  }

  getDisplayText(statBoardSection: StatBoardSection | undefined ): string {
    let pipInfo = '';
    if (statBoardSection) {
      pipInfo = `w/ ${statBoardSection.current} ${statBoardSection.type.toLowerCase()} pips`
    }
    if (this.isCostFulfilled) {
      return `${this.displayName} ${pipInfo} - GO!`;
    }
    return `${this.displayName} ${pipInfo} (requires discard)`;
  }

  submit() {
    if (this.enabled && this.isCostFulfilled) {
      this.gamePhaseService.submitAction();
    }
    if (this.viewingOtherMonstersActions) {
      this.onSelect.emit(true);
    }
  }

}
