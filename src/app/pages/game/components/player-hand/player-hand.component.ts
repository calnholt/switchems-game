import { Component, Input } from '@angular/core';
import { ImageUtil } from '~/app/shared/utils/image.util';
import { Buff } from '../../models/monster/buff.model';
import { SelectedActionService } from '../../services/selected-action/selected-action.service';

@Component({
  selector: 'sw-player-hand',
  templateUrl: './player-hand.component.html',
  styleUrls: ['./player-hand.component.scss']
})
export class PlayerHandComponent {
  @Input() buffs: Buff[] = [];

  unapplied!: Buff[];
  appliedAsDiscard: Buff[] = [];
  appliedAsBuff: Buff[] = [];
  
  buffPath = ImageUtil.icons.buff;
  discardPath = ImageUtil.icons.discard;

  constructor(private selectedActionService: SelectedActionService) {
  }

  ngOnInit() {
    if (this.dupeCheck()) {
      window.postMessage('hand contains dupe');
      return;
    }
    this.unapplied = this.buffs;
    this.selectedActionService.selectedAction$.subscribe((selectedAction) => {
      // TODO: update logic so applied cards are not returned to their original index,
      // but rather pushed to the back of the applied array (low priority)
      const { appliedBuffs, appliedDiscards } = selectedAction;
      const appliedKeys = appliedBuffs.map(b => b.key()).concat(appliedDiscards.map(b => b.key()));
      this.unapplied = this.buffs.filter(b => !appliedKeys.includes(b.key()));
      this.appliedAsBuff = selectedAction.appliedBuffs;
      this.appliedAsDiscard = selectedAction.appliedDiscards;
    });
  }

  dupeCheck() {
    return new Set(this.buffs.map(b => b.key())).size < this.buffs.length;
  }

}
