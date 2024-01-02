import { Css, ELEMENTS, ElemType, Path } from "src/app/shared/types/dataTypes";
import { StatUtil } from "src/app/shared/utils/stat.util";
import { IHaveTooltip } from "~/app/shared/interfaces/IHaveTooltip.interface";
import { MonsterAction } from "./monster-action.model";
import { Buff } from "./buff.model";
import { CardCompositeKey } from "~/app/shared/interfaces/ICompositeKey.interface";
import { ISelectableAction, SelectedActionType } from "~/app/shared/interfaces/ISelectableAction.interface";
import { Modifiers, MonsterModifierType } from "../../logic/modifiers/modifier.model";
import { ImageUtil } from "~/app/shared/utils/image.util";
import { Term } from "~/app/shared/types/data";
import { AbilityTextUtil } from "~/app/shared/utils/ability-text.util";

export class Monster implements IHaveTooltip, ISelectableAction {
  private _name: string;
  private _elements: Array<ElemType>;
  private _switchIn: string;
  private _passive: string;
  private _hp: number;
  private _initiative: number;
  private _actions: MonsterAction[];
  private _buffs: Buff[];

  private _isActive: boolean = false; // TODO: consider removing this
  
  // evaluated fields
  private _currentHp: number = 0;
  private _effectivenessArray!: number[];
  private _weaknesses!: ElemType[];
  private _resistances!: ElemType[];
  private _switchDefense!: number;

  readonly modifiers: Modifiers<MonsterModifierType> = new Modifiers();

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
    this._name = name;
    this._elements = elements;
    this._switchIn = switchIn;
    this._passive = passive;
    this._hp = hp;
    this._initiative = initiative;
    this._actions = actions;
    this._buffs = buffs;
    this._currentHp = hp;
    // this._currentHp = 1;

    this._effectivenessArray = this.getEffectivenessArray();
    this._weaknesses = this.getWeaknesses();
    this._resistances = this.getResistances();
    this._switchDefense = this.getSwitchDefenseValue();

  }

  // ISelectableAction function
  getNumOfBuffSlots = (): number => { return 0; };
  getNumOfDiscardSlots = (): number => { return 2; };
  getDisplayName = (): string => { return `Switch to ${this._name}`; } 
  getSelectableActionType = (): SelectedActionType => { return 'SWITCH'; } 
  canApplyPips = (): boolean => { return false; } 
  key(): CardCompositeKey { return this.name.replaceAll(' ', '').toUpperCase(); }
  // end
  hasTooltip () {
    return !!(this._switchIn || this._passive);
  }

  getTerms(): Term[] {
    return AbilityTextUtil.getTermsFromText(this.switchIn + this.passive);
  }
  

  public get name(): string { return this._name; }
  public get elements(): ElemType[] { return this._elements; }
  public get switchIn(): string { return this._switchIn; }
  public get passive(): string { return this._passive; }
  public get hp(): number { return this._hp; }
  public get initiative(): number { return this._initiative; }
  public get actions(): MonsterAction[] { return this._actions; }
  public get buffs(): Buff[] { return this._buffs; }
  public get currentHp(): number { return this._currentHp; }
  public get effectivenessArray(): number[] { return this._effectivenessArray; }
  public get weaknesses(): ElemType[] { return this._weaknesses; }
  public get resistances(): ElemType[] { return this._resistances; }
  public get switchDefense(): number { return this._switchDefense; }
  public get isActive(): boolean { return this._isActive; }

  setIsActive(value: boolean) { this._isActive = value; }

  setDisabledActions(key: CardCompositeKey) {
    this._actions.forEach(a => a.setDisabled(a.key() === key));
  }

  eotCleanup(key: CardCompositeKey) {
    this.modifiers.eotClear();
    this._actions.forEach(a => {
      a.modifiers.eotClear();
    });
  }
  
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

  getActionByKey(key: CardCompositeKey): MonsterAction {
    return this._actions.find(a => a.key() === key) as MonsterAction;
  }

  heal(value: number) {
    let total = value + this._currentHp;
    if (total > this._hp) {
      total = this._hp;
    }
    this._currentHp = total;
  }

  takeDamage(value: number) {
    let current = this._currentHp - value;
    this._currentHp = current < 0 ? 0 : current;
  }

  isAtFullHP(): boolean { return this._currentHp === this._hp; }

  getElementIcons(): Path[] {
    // @ts-ignore
    return this.elements.map(e => ImageUtil.elements?.[e.toLowerCase()]);
  }

  getBuffBackground(): Css {
    return this.elements.map(e => e.toString().toLowerCase()).join("") + "-b";
  }

}
