import { Injectable } from '@angular/core';
import { GameUISelectionEvent, GameUISelectionEventType } from './game-ui-selection-event.model';
import { Buff } from '../../models/monster/buff.model';
import { SelectedActionService } from '../selected-action/selected-action.service';
import { ISelectableAction } from '~/app/shared/interfaces/ISelectableAction.interface';

@Injectable({
  providedIn: 'root'
})
export class GameUISelectionService {

  constructor(
    private selectedActionService: SelectedActionService,
  ) { }

  public sendEvent(event: GameUISelectionEvent) {
    switch(event.type) {
      case GameUISelectionEventType.TOGGLE_APPLY_BUFF:
        this.toggleCardAsBuff(event.data);
        break;
      case GameUISelectionEventType.TOGGLE_APPLY_DISCARD:
        this.toggleCardAsDiscard(event.data);
        break;
      case GameUISelectionEventType.TOGGLE_ACTION:
        this.toggleSelectedAction(event.data);
        break;
    }
  }

  private toggleCardAsBuff(selectedBuff: Buff) {
    const { action, selectedAction } = this.selectedActionService;
    // cant apply if no action is selected
    if (!action) {
      return;
    }
    // cant apply if at capacity
    if (!action.canApplyBuff(selectedAction.getNumBuffSlotsUsed(), selectedBuff) && !selectedAction.isApplied(selectedBuff)) {
      return;
    }
    this.selectedActionService.handleBuff(selectedBuff);
  }

  private toggleCardAsDiscard(selectedBuff: Buff) {
    const { action, selectedAction } = this.selectedActionService;
    // cant apply if no action is selected
    if (!action) {
      return;
    }
    // cant apply if at capacity
    if (!action.canApplyDiscard(selectedAction.getNumDiscardSlotsUsed(), selectedBuff) && !selectedAction.isApplied(selectedBuff)) {
      return;
    }
    this.selectedActionService.handleDiscard(selectedBuff);
  }

  private toggleSelectedAction(newSelectedAction: ISelectableAction) {
    const { action } = this.selectedActionService;
    if (newSelectedAction.key() === action?.key()) {
      return;
    }
    this.selectedActionService.selectAction(newSelectedAction);
  }

}
