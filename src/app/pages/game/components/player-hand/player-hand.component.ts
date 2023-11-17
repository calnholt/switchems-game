import { Component } from '@angular/core';
import { ImageUtil } from '~/app/shared/utils/image.util';
import { Buff } from '../../models/monster/buff.model';
import { SelectedActionService } from '../../services/selected-action/selected-action.service';
import { PlayerService } from '../../services/player/player.service';
import { CardCompositeKey } from '~/app/shared/interfaces/ICompositeKey.interface';

@Component({
  selector: 'sw-player-hand',
  templateUrl: './player-hand.component.html',
  styleUrls: ['./player-hand.component.scss']
})
export class PlayerHandComponent {
  buffs: Buff[] = [];
  hand!: Buff[];
  appliedAsDiscard: Buff[] = [];
  appliedAsBuff: Buff[] = [];
  lastSelectedAction: CardCompositeKey | undefined = undefined;

  buffPath = ImageUtil.icons.buff;
  discardPath = ImageUtil.icons.discard;

  constructor(
    private selectedActionService: SelectedActionService,
    private playerService: PlayerService  
  ) {
  }

  // ngOnChanges(changes: SimpleChanges): void {
  //   if (changes['buffs']) {
  //     this.ngOnInit();
  //   }
  // }

  ngOnInit() {
    this.selectedActionService.selectedAction$.subscribe((selectedAction) => {
      if (selectedAction.action.getSelectableActionType() === 'NONE') return;
      const { appliedBuffs, appliedDiscards } = selectedAction;
      const appliedKeys = appliedBuffs.map(b => b.key()).concat(appliedDiscards.map(b => b.key()));
      if (this.lastSelectedAction !== selectedAction.action.key()) {
        this.hand = this.hand.concat(this.appliedAsBuff).concat(this.appliedAsDiscard);
        this.appliedAsBuff = [];
        this.appliedAsDiscard = [];
        this.lastSelectedAction = selectedAction.action.key();
        return;
      }
      // return cards to hand in order presented when applied
      this.appliedAsBuff = appliedBuffs;
      this.appliedAsDiscard = appliedDiscards;
      this.hand = this.buffs.filter(b => !appliedKeys.includes(b.key()));
      this.lastSelectedAction = selectedAction.action.key();
    });
    this.playerService.playerCardManager.hand$.subscribe((hand) => {
      this.buffs = hand.cards;
      this.hand = this.buffs;
      this.appliedAsDiscard = [];
      this.appliedAsBuff = [];
    });
  }

}
