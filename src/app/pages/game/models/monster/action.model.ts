import { IHaveTooltip } from "~/app/shared/interfaces/IHaveTooltip.interface";
import { Term } from "~/app/shared/types/data";
import { ElemType } from "~/app/shared/types/dataTypes";
import { AbilityTextUtil } from "~/app/shared/utils/ability-text.util";
import { MonsterActionCardIcons } from "./monster-action-card-icons.model";
import { CardCompositeKey, ICompositeKey } from "~/app/shared/interfaces/ICompositeKey.interface";

export class MonsterAction implements IHaveTooltip, ICompositeKey {
  private _name: string;
  private _monsterName: string;
  private _text: string;
  private _attack: number;
  private _speed: number;
  private _element: ElemType;
  private _icons: MonsterActionCardIcons;
  private _index: number;
  private _isStatus: boolean;
  public _isSelected: boolean;
  private _isLocked: boolean;
  private _isUsed: boolean;
  private _isDisabled: boolean;

  constructor(
    name: string,
    monsterName: string,
    text: string,
    attack: number,
    speed: number,
    element: ElemType,
    icons: MonsterActionCardIcons,
    index: number,
    isStatus: boolean = false,
    isSelected: boolean = false,
    isLocked: boolean = false,
    isUsed: boolean = false,
    isDisabled: boolean = false
  ) {
    this._name = name;
    this._monsterName = monsterName;
    this._text = text;
    this._attack = attack;
    this._speed = speed;
    this._element = element;
    this._icons = icons;
    this._index = index;
    this._isStatus = isStatus;
    this._isSelected = isSelected;
    this._isLocked = isLocked;
    this._isUsed = isUsed;
    this._isDisabled = isDisabled;
  }

  get name(): string { return this._name; }
  get monsterName(): string { return this._monsterName; }
  get text(): string { return this._text; }
  get attack(): number { return this._attack; }
  get speed(): number { return this._speed; }
  get element(): ElemType { return this._element; }
  get icons(): MonsterActionCardIcons { return this._icons; }
  get index(): number { return this._index; }
  get isStatus(): boolean { return this._isStatus; }
  get isSelected(): boolean { return this._isSelected; }
  get isLocked(): boolean { return this._isLocked; }
  get isUsed(): boolean { return this._isUsed; }
  get isDisabled(): boolean { return this._isDisabled; }

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

  key(): CardCompositeKey { return `${this.monsterName}_${this.name}`; }

  setIsSelected(value: boolean) { this._isSelected = value; }

  deselectAction() {
    this.icons.clearApplied();
    this._isSelected = false;
  }

}