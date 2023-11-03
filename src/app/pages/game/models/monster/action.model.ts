import { IHaveTooltip } from "~/app/shared/interfaces/IHaveTooltip.interface";
import { Term } from "~/app/shared/types/data";
import { ElemType } from "~/app/shared/types/dataTypes";
import { AbilityTextUtil } from "~/app/shared/utils/ability-text.util";
import { CardCompositeKey } from "~/app/shared/interfaces/ICompositeKey.interface";
import { ISelectableAction } from "~/app/shared/interfaces/ISelectableAction.interface";

export class MonsterAction implements IHaveTooltip, ISelectableAction {
  private _name: string;
  private _monsterName: string;
  private _text: string;
  private _attack: number;
  private _speed: number;
  private _element: ElemType;
  private _index: number;
  private _isStatus: boolean;
  private _isSelected: boolean = false;
  private _isLocked: boolean = false;
  private _isUsed: boolean = false;
  private _isDisabled: boolean = false;
  private _buff: number;
  private _discard: number;
  private _draw: number;
  private _addedBuff: number;

  constructor(
    name: string,
    monsterName: string,
    text: string,
    attack: number,
    speed: number,
    element: ElemType,
    index: number,
    isStatus: boolean = false,
    buff: number = 0,
    discard: number = 0,
    draw: number = 0,
    addedBuff: number = 0,
  ) {
    this._name = name;
    this._monsterName = monsterName;
    this._text = text;
    this._attack = attack;
    this._speed = speed;
    this._element = element;
    this._index = index;
    this._isStatus = isStatus;
    this._buff = buff;
    this._discard = discard;
    this._draw = draw;
    this._addedBuff = addedBuff;
  }

  get name(): string { return this._name; }
  get monsterName(): string { return this._monsterName; }
  get text(): string { return this._text; }
  get attack(): number { return this._attack; }
  get speed(): number { return this._speed; }
  get element(): ElemType { return this._element; }
  get index(): number { return this._index; }
  get isStatus(): boolean { return this._isStatus; }
  get isSelected(): boolean { return this._isSelected; }
  get isLocked(): boolean { return this._isLocked; }
  get isUsed(): boolean { return this._isUsed; }
  get isDisabled(): boolean { return this._isDisabled; }
  get buff(): number { return this._buff; }
  get discard(): number { return this._discard; }
  get draw(): number { return this._draw; }
  get addedBuff(): number { return this._addedBuff; }

  getAbilityTextWithoutTerms(): string {
    return AbilityTextUtil.getAbilityTextWithoutTerms(this._text);
  }

  getAdvantages() {
    const map: Map<ElemType, number[]> = new Map();
    map.set('Death', [0, -1, 1, 1, -1, 0]);
    map.set('Electric', [-1, 1, -1, 0, 0, 1]);
    map.set('Fire', [0, -1, -1, 1, 1, 0]);
    map.set('Water', [1, 0, 0, -1, -1, 1]);
    map.set('Leaf', [-1, 1, 1, 0, 0, -1]);
    map.set('Rock', [1, 0, 0, -1, 1, -1]);
    return map.get(this.element as ElemType) as number[];
  }

  getTerms(): Term[] {
    return AbilityTextUtil.getTermsFromText(this.text);
  }

  hasTooltip(): boolean {
    const hasTerms = !!this.getTerms()?.length;
    return hasTerms || !this.isStatus;
  }

  // ISelectableAction function
  selectAsAction(): void { this._isSelected = true; }
  deselectAsAction(): void { this._isSelected = false; }
  key(): CardCompositeKey { return `${this.monsterName}_${this.name}`; } 
  isCostFulfilled(discards: number): boolean { return discards === this._discard; }
  // end

  setIsSelected(value: boolean) { this._isSelected = value; }


  canApplyBuff(alreadyApplied: number, isSuper: boolean = false): boolean { 
    return alreadyApplied + this._addedBuff +(isSuper ? 1 : 0) < this._buff; 
  }

  canApplyDiscard(alreadyApplied: number): boolean { return alreadyApplied < this._discard; }

}