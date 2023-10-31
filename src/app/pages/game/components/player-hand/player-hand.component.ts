import { Component, DoCheck, Input, IterableDiffer, IterableDifferFactory, IterableDiffers, KeyValueDiffers, SimpleChanges } from '@angular/core';
import { Buff } from '../../models/monster/monster.model';
import { ImageUtil } from '~/app/shared/utils/image.util';

@Component({
  selector: 'sw-player-hand',
  templateUrl: './player-hand.component.html',
  styleUrls: ['./player-hand.component.scss']
})
export class PlayerHandComponent implements DoCheck {
  @Input() buffs!: Buff[];

  unapplied!: Buff[];
  appliedAsDiscard: Buff[] = [];
  appliedAsBuff: Buff[] = [];
  
  objDiffer: any;
  differ: any;

  buffPath = ImageUtil.icons.buff;
  discardPath = ImageUtil.icons.discard;

  constructor(private differs: KeyValueDiffers) {
    this.differ = differs.find([]).create();
  }

  ngOnInit() {
    this.unapplied = this.buffs;
    this.objDiffer = {};
    this.buffs.forEach((buff, i) => {
      this.objDiffer[i] = this.differs.find(buff).create();
    });
  }

  ngDoCheck() {
    const pUnapplied = this.unapplied.length;
    const cUnapplied = this.buffs.filter(this.filterUnapplied).length;
    const pBuffs = this.appliedAsBuff.length;
    const cBuffs = this.buffs.filter(this.filterAppliedAsBuff).length;
    const pDiscards = this.appliedAsDiscard.length;
    const cDiscards = this.buffs.filter(this.filterAppliedAsDiscard).length;

    if (pUnapplied !== cUnapplied || pBuffs !== cBuffs || pDiscards !== cDiscards) {
      this.updateApplied();
    }
  }

  updateApplied() {
    this.unapplied = this.buffs.filter(this.filterUnapplied);
    this.appliedAsDiscard = this.buffs.filter(this.filterAppliedAsDiscard);
    this.appliedAsBuff = this.buffs.filter(this.filterAppliedAsBuff);
  }

  filterUnapplied(b: Buff): boolean {
    return !b._isAppliedAsBuff && !b._isAppliedAsDiscard;
  }
  filterAppliedAsDiscard(b: Buff): boolean {
    return b._isAppliedAsDiscard;
  }
  filterAppliedAsBuff(b: Buff): boolean {
    return b._isAppliedAsBuff;
  }

}
