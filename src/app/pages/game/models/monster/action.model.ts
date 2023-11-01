import { IHaveTooltip } from "~/app/shared/interfaces/IHaveTooltip.interface";
import { Term } from "~/app/shared/types/data";
import { ElemType } from "~/app/shared/types/dataTypes";
import { AbilityTextUtil } from "~/app/shared/utils/ability-text.util";
import { MonsterActionCardIcons } from "./monster-action-card-icons.model";

export class MonsterAction implements IHaveTooltip {
  private name: string;
  private text: string;
  private attack: number;
  private speed: number;
  private element: ElemType;
  private icons: MonsterActionCardIcons;
  private index: number;
  private isStatus: boolean;
  public isSelected: boolean;
  private isLocked: boolean;
  private isUsed: boolean;
  private isDisabled: boolean;

  constructor(
    name: string,
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
    this.name = name;
    this.text = text;
    this.attack = attack;
    this.speed = speed;
    this.element = element;
    this.icons = icons;
    this.index = index;
    this.isStatus = isStatus;
    this.isSelected = isSelected;
    this.isLocked = isLocked;
    this.isUsed = isUsed;
    this.isDisabled = isDisabled;
  }

  get _name(): string { return this.name; }
  get _text(): string { return this.text; }
  get _attack(): number { return this.attack; }
  get _speed(): number { return this.speed; }
  get _element(): ElemType { return this.element; }
  get _icons(): MonsterActionCardIcons { return this.icons; }
  get _index(): number { return this.index; }
  get _isStatus(): boolean { return this.isStatus; }
  get _isSelected(): boolean { return this.isSelected; }
  get _isLocked(): boolean { return this.isLocked; }
  get _isUsed(): boolean { return this.isUsed; }
  get _isDisabled(): boolean { return this.isDisabled; }

  getAbilityTextWithoutTerms(): string {
    return AbilityTextUtil.getAbilityTextWithoutTerms(this.text);
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
}