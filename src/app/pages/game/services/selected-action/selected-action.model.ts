import { ISelectableAction } from "~/app/shared/interfaces/ISelectableAction.interface";
import { Buff } from "../../models/monster/buff.model";
import { StatBoardSection } from "../../models/stat-board/stat-board.model";

export class SelectedAction {
  appliedBuffs: Buff[] = [];
  appliedDiscards: Buff[] = [];
  statBoardSection: StatBoardSection | undefined;
  action: ISelectableAction | undefined;
  constructor(action: ISelectableAction | undefined, buffs: Buff[] = [], discards: Buff[] = [], statBoardSection?: StatBoardSection | undefined) {
    this.appliedBuffs = buffs;
    this.appliedDiscards = discards;
    this.action = action;
    this.statBoardSection = statBoardSection;
  }
  isActionSelected(): boolean { return !!this.action; }
  isCostFulfilled(): boolean { return this.getNumDiscardSlotsUsed() === this.action?.getNumOfDiscardSlots(); }
  isAppliedAsBuff(buff: Buff): boolean { return this.appliedBuffs.map(b => b.key()).includes(buff.key()); }
  isAppliedAsDiscard(buff: Buff): boolean { return this.appliedDiscards.map(b => b.key()).includes(buff.key()); }
  canApplyBuff = (buff: Buff): boolean => { 
    if(!this.action) return false;
    return this.getNumBuffSlotsUsed() + buff.buffSlots <= this.action.getNumOfBuffSlots(); 
  }
  canApplyDiscard = (buff: Buff): boolean => { 
    if(!this.action) return false;
    return this.getNumDiscardSlotsUsed() + buff.discardSlots <= this.action.getNumOfDiscardSlots(); 
  }
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
  handleStatBoardSection(statBoardSection: StatBoardSection) { 
    if (this.statBoardSection?.type === statBoardSection.type) {
      this.statBoardSection = undefined;
    }
    else if (statBoardSection.current > 0 && this.action?.canApplyStat()) {
      this.statBoardSection = statBoardSection;
    }
  }
  clear() {
    this.appliedBuffs = [];
    this.appliedDiscards = [];
    this.action = undefined;
    this.statBoardSection = undefined;
  }
}