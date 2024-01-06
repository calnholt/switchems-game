import { Component, Input } from '@angular/core';
import { ImageUtil } from '~/app/shared/utils/image.util';
import { Buff } from '../../models/monster/buff.model';
import { SelectedActionService } from '../../services/selected-action/selected-action.service';
import { PlayerService } from '../../services/player/player.service';
import { CardCompositeKey } from '~/app/shared/interfaces/ICompositeKey.interface';
import { fadeOutOnLeaveAnimation } from 'angular-animations';

@Component({
  selector: 'sw-player-hand',
  templateUrl: './player-hand.component.html',
  styleUrls: ['./player-hand.component.scss'],  
  animations: [
    fadeOutOnLeaveAnimation({ duration: 500 }),
  ]
})
export class PlayerHandComponent {
  @Input() hide: boolean = false;

  buffs: Buff[] = [];
  lastSelectedAction: CardCompositeKey | undefined = undefined;

  buffPath = ImageUtil.icons.buff;
  discardPath = ImageUtil.icons.discard;

  constructor(
    private selectedActionService: SelectedActionService,
    private playerService: PlayerService  
  ) {
  }

  ngOnInit() {
    this.selectedActionService.selectedAction$.subscribe((selectedAction) => {
      if (selectedAction.action.getSelectableActionType() === 'NONE') return;
      const { appliedBuffs, appliedDiscards } = selectedAction;
      const appliedKeys = appliedBuffs.map(b => b.key()).concat(appliedDiscards.map(b => b.key()));
      if (this.lastSelectedAction !== selectedAction.action.key()) {
        this.lastSelectedAction = selectedAction.action.key();
        return;
      }
      this.lastSelectedAction = selectedAction.action.key();
    });
    this.playerService.playerCardManager.hand$.subscribe((hand) => {
      this.buffs = hand.cards;
    });
  }

}
