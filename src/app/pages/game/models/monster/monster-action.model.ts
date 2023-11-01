import { ELEMENTS, ElemType } from "src/app/shared/types/dataTypes";
import { StatUtil } from "src/app/shared/utils/stat.util";
import { IHaveTooltip } from "~/app/shared/interfaces/IHaveTooltip.interface";
import { MonsterAction } from "./action.model";
import { Buff } from "./buff.model";

export class Monster implements IHaveTooltip {
  private name: string;
  private elements: Array<ElemType>;
  private switchIn: string;
  private passive: string;
  private hp: number;
  private initiative: number;
  private actions: MonsterAction[];
  private buffs: Buff[];
  
  // evaluated fields
  private currentHp: number = 0;
  private effectivenessArray!: number[];
  private weaknesses!: ElemType[];
  private resistances!: ElemType[];
  private switchDefense!: number;

  constructor(
    name: string,
    elements: ElemType[],
    switchIn: string,
    passive: string,
    hp: number,
    initiative: number,
    actions: MonsterAction[],
    buffs: Buff[],
  ) {
    this.name = name;
    this.elements = elements;
    this.switchIn = switchIn;
    this.passive = passive;
    this.hp = hp;
    this.initiative = initiative;
    this.actions = actions;
    this.buffs = buffs;
    this.currentHp = this.hp;

    this.effectivenessArray = this.getEffectivenessArray();
    this.weaknesses = this.getWeaknesses();
    this.resistances = this.getResistances();
    this.switchDefense = this.getSwitchDefenseValue();

  }
  hasTooltip () {
    return !!(this._switchIn || this.passive);
  }

  public get _name(): string { return this.name; }
  public get _elements(): ElemType[] { return this.elements; }
  public get _switchIn(): string { return this.switchIn; }
  public get _passive(): string { return this.passive; }
  public get _hp(): number { return this.hp; }
  public get _initiative(): number { return this.initiative; }
  public get _actions(): MonsterAction[] { return this.actions; }
  public get _buffs(): Buff[] { return this.buffs; }
  public get _currentHp(): number { return this.currentHp; }
  public get _effectivenessArray(): number[] { return this.effectivenessArray; }
  public get _weaknesses(): ElemType[] { return this.weaknesses; }
  public get _resistances(): ElemType[] { return this.resistances; }
  public get _switchDefense(): number { return this.switchDefense; }
  
  getEffectivenessArray(): number[] {
    const arrs = this._elements.map((el: ElemType) => StatUtil.getAdvantages(el)) ?? [];
    let totals = [0, 0, 0, 0, 0, 0];
    if (this.elements.length === 1) {
      totals = arrs[0];
    }
    else {
      for (let i = 0; i < ELEMENTS.length; i++) {
        const elemArr = [];
        for (let j = 0; j < arrs.length; j++) {
          elemArr.push(arrs[j][i]);
        }
        const containsNegative = elemArr.some(e => e < 0);
        const positives = elemArr.filter(e => e > 0);
        if (containsNegative) {
          totals[i] = -1;
        } else if (positives) {
          totals[i] = positives.length;
        } else {
          totals[i] = 0;
        }
      }
    }
    return totals;
  }

  getSwitchDefenseValue(): number {
    const defaultValue = 3;
    const effectivenessArray = this.getEffectivenessArray();
    return effectivenessArray.includes(2) ? defaultValue * 2 : defaultValue;
  }

  getWeaknesses(): ElemType[] {
    // @ts-ignore
    return this.effectivenessArray
        .map((n, i) => n < 0 ? ELEMENTS[i] : null)
        .filter(elem => elem);
  }

  getResistances(): ElemType[] {
    // @ts-ignore
    return this.effectivenessArray
        .map((n, i) => n > 0 ? ELEMENTS[i] : null)
        .filter(elem => elem);
  }
}
