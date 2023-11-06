import { ISelectableAction } from "~/app/shared/interfaces/ISelectableAction.interface";
import { Buff } from "../../models/monster/buff.model";

export class SelectedAction {
  appliedBuffs: Buff[];
  appliedDiscards: Buff[] = [];
  action: ISelectableAction;
  constructor(action: ISelectableAction, buffs: Buff[] = [], discards: Buff[] = []) {
    this.appliedBuffs = buffs;
    this.appliedDiscards = discards;
    this.action = action;
  }
  isAppliedAsBuff(buff: Buff): boolean { return this.appliedBuffs.map(b => b.key()).includes(buff.key()); }
  isAppliedAsDiscard(buff: Buff): boolean { return this.appliedDiscards.map(b => b.key()).includes(buff.key()); }
  getNumBuffSlotsUsed(): number {
    return this.appliedBuffs.reduce((accumulator, value) => accumulator + value.buffSlots, 0);
  };
  getNumDiscardSlotsUsed(): number {
    return this.appliedDiscards.reduce((accumulator, value) => accumulator + value.discardSlots, 0);
  };
  isApplied(buff: Buff): boolean {
    return !!this.appliedBuffs.concat(this.appliedDiscards).find(b => b.key() === buff.key());
  };
  unApply(buff: Buff): void {
    if (this.isAppliedAsBuff(buff)) {
      this.appliedBuffs = this.appliedBuffs.filter(b => b.key() !== buff.key());
    }
    if (this.isAppliedAsDiscard(buff)) {
      this.appliedDiscards = this.appliedDiscards.filter(b => b.key() !== buff.key());
    }
  };
  swap(buff: Buff) {
    if (this.isAppliedAsBuff(buff)) {
      this.appliedBuffs = this.appliedBuffs.filter(b => b.key() !== buff.key());
      this.appliedDiscards.push(buff);
    }
    else {
      this.appliedDiscards = this.appliedDiscards.filter(b => b.key() !== buff.key());
      this.appliedBuffs.push(buff);
    }
  }
}