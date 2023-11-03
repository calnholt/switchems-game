import { Injectable } from '@angular/core';
import { PlayerService } from '../player/player.service';
import { GameUISelectionEvent, GameUISelectionEventType } from './game-ui-selection-event.model';
import { Buff } from '../../models/monster/buff.model';
import { MonsterAction } from '../../models/monster/action.model';
import { PlayerCardManagerService } from '../player-card-manager/player-card-manager.service';

@Injectable({
  providedIn: 'root'
})
export class GameUISelectionService {

  constructor(
    private playerService: PlayerService,
    private playerCardManagerService: PlayerCardManagerService,
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
    const { applied } = this.playerCardManagerService;
    // cant apply if no action is selected
    if (!activeMonster.isActionSelected()) {
      return
    }
    // cant apply if at capacity
    if (!activeMonster.getSelectedAction().canApplyBuff(applied.buff, selectedBuff.isSuper) && !selectedBuff.isAppliedAsBuff) {
      return;
    }
    playerCardManager.toggleCardAsBuff(selectedBuff.key());
    this.playerCardManagerService.setApplied(
      selectedBuff.key(),
      hand.getAppliedBuffCount(),
      hand.getAppliedDiscardCount(),
    );
  }

  private toggleCardAsDiscard(selectedBuff: Buff) {
    const { activeMonster, playerCardManager } = this.playerService;
    const { hand } = playerCardManager;
    const { applied } = this.playerCardManagerService;
    // cant apply if no action is selected
    if (!activeMonster.isActionSelected()) {
      return
    }
    // cant apply if at capacity
    if (!activeMonster.getSelectedAction().canApplyDiscard(applied.discard) && !selectedBuff.isAppliedAsDiscard) {
      return;
    }
    playerCardManager.toggleCardAsDiscard(selectedBuff.key());
    this.playerCardManagerService.setApplied(
      selectedBuff.key(),
      hand.getAppliedBuffCount(),
      hand.getAppliedDiscardCount(),
    );
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
      this.playerCardManagerService.setApplied(selectedAction.key(), 0, 0);
    }
  }

}
