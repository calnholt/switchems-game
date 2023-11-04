import { Injectable } from '@angular/core';
import { PlayerService } from '../player/player.service';
import { GameUISelectionEvent, GameUISelectionEventType } from './game-ui-selection-event.model';
import { Buff } from '../../models/monster/buff.model';
import { SelectedActionService } from '../selected-action/selected-action.service';
import { ISelectableAction } from '~/app/shared/interfaces/ISelectableAction.interface';

@Injectable({
  providedIn: 'root'
})
export class GameUISelectionService {

  constructor(
    private playerService: PlayerService,
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
    const { activeMonster, playerCardManager } = this.playerService;
    const { hand } = playerCardManager;
    const { selectedAction } = this.selectedActionService;
    // cant apply if no action is selected
    if (!activeMonster.isActionSelected()) {
      return
    }
    // cant apply if at capacity
    if (!activeMonster.getSelectedAction().canApplyBuff(selectedAction.buff, selectedBuff.isSuper ? 2 : 1) && !selectedBuff.isAppliedAsBuff) {
      return;
    }
    playerCardManager.toggleCardAsBuff(selectedBuff.key());
    this.selectedActionService.update(
      hand.getAppliedBuffCount(),
      hand.getAppliedDiscardCount(),
    );
  }

  private toggleCardAsDiscard(selectedBuff: Buff) {
    const { activeMonster, playerCardManager } = this.playerService;
    const { hand } = playerCardManager;
    const { selectedAction } = this.selectedActionService;
    // cant apply if no action is selected
    if (!activeMonster.isActionSelected()) {
      return
    }
    // cant apply if at capacity
    if (!activeMonster.getSelectedAction().canApplyDiscard(selectedAction.discard, 1) && !selectedBuff.isAppliedAsDiscard) {
      return;
    }
    playerCardManager.toggleCardAsDiscard(selectedBuff.key());
    this.selectedActionService.update(
      hand.getAppliedBuffCount(),
      hand.getAppliedDiscardCount(),
    );
  }

  private toggleSelectedAction(newSelectedAction: ISelectableAction) {
    const { selectedAction } = this.selectedActionService;
    if (!selectedAction.action) {
      newSelectedAction.selectAsAction();
      this.selectedActionService.set(newSelectedAction, 0, 0);
    }
    // if selection already exists, need to wipe out all card selections
    else if (newSelectedAction.key() !== selectedAction.action.key()) {
      this.setNewSelectedAction(selectedAction.action, newSelectedAction);
    }
  }

  // helper functions - think about util

  private setNewSelectedAction(oldAction: ISelectableAction, newAction: ISelectableAction) {
    const { hand } = this.playerService.playerCardManager;
    oldAction.deselectAsAction();
    newAction.selectAsAction();
    hand.clearAllApplied();
    this.selectedActionService.set(newAction, 0, 0);
  }

}
