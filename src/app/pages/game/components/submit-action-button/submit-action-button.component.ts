import { Component, EventEmitter, Input, Output } from '@angular/core';
import { SelectedActionService } from '../../services/selected-action/selected-action.service';
import { StatBoardSection, StatBoardSectionType } from '../../models/stat-board/stat-board.model';
import { GamePhaseService } from '../../services/game-phase/game-phase.service';
import { CurrentPhaseService } from '../../services/current-phase/current-phase.service';
import { OnlineBattleService, OnlineBattleStatusType } from '../../services/online-battle.service';
import { SelectedAction } from '../../services/selected-action/selected-action.model';

const LABEL = 'Select an action';
const WAITING_LABEL = `Waiting for opponent's selection...`;
const WAITING_TURN_LABEL = `Waiting for opponent to finish turn...`;

@Component({
  selector: 'sw-submit-action-button',
  templateUrl: './submit-action-button.component.html',
  styleUrls: ['./submit-action-button.component.scss']
})
export class SubmitActionButtonComponent {
  @Input() viewingOtherMonstersActions = false;
  selectedAction!: SelectedAction;
  isCostFulfilled = false;
  displayName: string | null = null;
  label: string | null = LABEL;
  numBuffSlotsUsed: number = 0;
  statBoardSectionType: StatBoardSectionType | null = null;
  enabled = true;

  status!: OnlineBattleStatusType;
  opponentStatus!: OnlineBattleStatusType;

  showButton = true;

  constructor(
    private selectedActionService: SelectedActionService,
    private gamePhaseService: GamePhaseService,
    private currentPhaseService: CurrentPhaseService,
    private onlineBattleService: OnlineBattleService,
  ) {
  }

  ngOnInit() {
    this.selectedActionService.selectedAction$.subscribe((selectedAction) => {
      if (selectedAction.action.getSelectableActionType() === 'NONE') {
        this.isCostFulfilled = false;
        this.label = LABEL;
        return;
      }
      this.displayName = selectedAction.action.getDisplayName();
      this.isCostFulfilled = selectedAction.isCostFulfilled();
      this.label = this.getDisplayText(selectedAction?.statBoardSection);
    })
    this.currentPhaseService.currentPhase$.subscribe((phase) => {
      this.enabled = phase === 'SELECTION_PHASE';
      this.showButton = phase === 'SELECTION_PHASE';
      if (phase === 'SELECTION_PHASE') {
        this.label = LABEL;
      }
    })
    this.onlineBattleService.status$.subscribe((value) => {
      this.status = value;
      if (['SELECTING_ACTION'].includes(value) && this.opponentStatus == 'RESOLVING_TURN') {
        this.label = WAITING_TURN_LABEL;
      }
      if (value === 'CONFIRMED_ACTION') {
        if (this.opponentStatus === 'SELECTING_ACTION') {
          this.label = WAITING_LABEL;
        }
        else {
          this.label = LABEL;
        }
      }
    })
    this.onlineBattleService.oStatus$.subscribe((value) => {
      this.opponentStatus = value;
    })
  }

  isSubmitActive(): boolean {
    const baseBool = this.isCostFulfilled 
        && this.enabled 
        && !this.viewingOtherMonstersActions 
        && this.status === 'SELECTING_ACTION';
    if (this.onlineBattleService.isOnline) {
      return baseBool 
          && this.opponentStatus !== 'RESOLVING_TURN';
    }
    return baseBool;
  }

  getDisplayText(statBoardSection: StatBoardSection | undefined ): string {
    let pipInfo = '';
    if (statBoardSection) {
      pipInfo = `w/ ${statBoardSection.current} ${statBoardSection.type.toLowerCase()} Pips`
    }
    if (this.isCostFulfilled) {
      return `${this.displayName} ${pipInfo} - GO!`;
    }
    return `${this.displayName} ${pipInfo} (requires discard)`;
  }

  submit() {
    if (this.enabled && this.isCostFulfilled && !this.viewingOtherMonstersActions) {
      if (this.onlineBattleService.isOnline && this.opponentStatus === 'SELECTING_ACTION') {
        this.gamePhaseService.submitAction();
        return;
      }
      else {
        this.gamePhaseService.submitAction();
      }
    }
  }

}
