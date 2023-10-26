import { Term } from "src/app/shared/types/data";
import { ElemType } from "src/app/shared/types/dataTypes";
import { AbilityTextUtil } from "src/app/shared/utils/ability-text.util";

export class Monster {
  private name: string;
  private elements: Array<ElemType>;
  private switchIn: string;
  private passive: string;
  private hp: number;
  private initiative: number;
  private actions: MonsterAction[];
  private currentHp: number = 0;

  constructor(
    name: string,
    elements: ElemType[],
    switchIn: string,
    passive: string,
    hp: number,
    initiative: number,
    actions: MonsterAction[]
  ) {
    this.name = name;
    this.elements = elements;
    this.switchIn = switchIn;
    this.passive = passive;
    this.hp = hp;
    this.initiative = initiative;
    this.actions = actions;
    this.currentHp = this.hp;
  }

  public get _name(): string { return this.name; }
  public get _elements(): ElemType[] { return this.elements; }
  public get _switchIn(): string { return this.switchIn; }
  public get _passive(): string { return this.passive; }
  public get _hp(): number { return this.hp; }
  public get _initiative(): number { return this.initiative; }
  public get _actions(): MonsterAction[] { return this.actions; }
  public get _currentHp(): number { return this.currentHp; }
}

export class MonsterAction {
  private name: string;
  private text: string;
  private attack: number;
  private speed: number;
  private element: ElemType;
  private icons: MonsterActionCardIcons;
  private index: number;
  private isStatus: boolean;
  private isSelected: boolean;
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

export class MonsterActionCardIcons {
  private buff: number;
  private discard: number;
  private draw: number;
  private addedBuff: number;
  private appliedBuff: number;
  private appliedDiscard: number;

  constructor(
    buff: number = 0,
    discard: number = 0,
    draw: number = 0,
    addedBuff: number = 0,
    appliedBuff: number = 0,
    appliedDiscard: number = 0
  ) {
    this.buff = buff;
    this.discard = discard;
    this.draw = draw;
    this.addedBuff = addedBuff;
    this.appliedBuff = appliedBuff;
    this.appliedDiscard = appliedDiscard;
  }

  get _buff(): number {
    return this.buff;
  }

  get _discard(): number {
    return this.discard;
  }

  get _draw(): number {
    return this.draw;
  }

  get _addedBuff(): number {
    return this.addedBuff;
  }

  get _appliedBuff(): number {
    return this.appliedBuff;
  }

  get _appliedDiscard(): number {
    return this.appliedDiscard;
  }
}
