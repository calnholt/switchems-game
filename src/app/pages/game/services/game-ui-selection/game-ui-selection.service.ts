import { Injectable } from '@angular/core';
import { PlayerService } from '../player/player.service';
import { GameUISelectionEvent, GameUISelectionEventType } from './game-ui-selection-event.model';
import { CardCompositeKey } from '~/app/shared/interfaces/ICompositeKey.interface';
import { Buff } from '../../models/monster/buff.model';
import { MonsterAction } from '../../models/monster/action.model';

@Injectable({
  providedIn: 'root'
})
export class GameUISelectionService {

  constructor(
    private playerService: PlayerService,
  ) { }

  public sendEvent(event: GameUISelectionEvent) {
    switch(event.type) {
      case GameUISelectionEventType.TOGGLE_APPLY_BUFF:
        this.toggleCardAsBuff(event.data);
        break;
      case GameUISelectionEventType.TOGGLE_APPLY_DISCARD:
        this.toggleCardAsDiscard(event.data);
        break;
      case GameUISelectionEventType.TOGGLE_MONSTER_ACTION_SELECT:
        this.toggleSelectedMonsterAction(event.data);
        break;
    }
  }

  private toggleCardAsBuff(selectedBuff: Buff) {
    const { activeMonster, playerCardManager } = this.playerService;
    const { hand } = playerCardManager;
    // cant apply if no action is selected
    if (!activeMonster.isActionSelected()) {
      return
    }
    const icons = activeMonster.getSelectedAction().icons;
    // cant apply if at capacity
    if (!icons.canApplyBuff(selectedBuff.isSuper) && !selectedBuff.isAppliedAsBuff) {
      return;
    }
    playerCardManager.toggleCardAsBuff(selectedBuff.key());
    activeMonster.getSelectedAction().icons.setAppliedBuff(hand.getAppliedBuffCount());
    activeMonster.getSelectedAction().icons.setAppliedDiscard(hand.getAppliedDiscardCount());
  }

  private toggleCardAsDiscard(selectedBuff: Buff) {
    const { activeMonster, playerCardManager } = this.playerService;
    const { hand } = playerCardManager;
    // cant apply if no action is selected
    if (!activeMonster.isActionSelected()) {
      return
    }
    const icons = activeMonster.getSelectedAction().icons;
    // cant apply if at capacity
    if (!icons.canApplyDiscard() && !selectedBuff.isAppliedAsDiscard) {
      return;
    }
    playerCardManager.toggleCardAsDiscard(selectedBuff.key());
    activeMonster.getSelectedAction().icons.setAppliedBuff(hand.getAppliedBuffCount());
    activeMonster.getSelectedAction().icons.setAppliedDiscard(hand.getAppliedDiscardCount());
  }

  private toggleSelectedMonsterAction(selectedAction: MonsterAction) {
    const { activeMonster, playerCardManager } = this.playerService;
    const { hand } = playerCardManager;
    if (!activeMonster.isActionSelected()) {
      selectedAction.setIsSelected(true);

    }
    // don't do anything if action is already selected
    else if (selectedAction.key() === activeMonster.getSelectedAction().key()) {
      return;
    }
    // if selection already exists, need to wipe out all card selections
    else {
      const previousSelectedAction = activeMonster.getSelectedAction();
      previousSelectedAction.deselectAction();
      selectedAction.setIsSelected(true);
      hand.clearAllApplied();
    }
  }

}
