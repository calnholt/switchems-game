import { CardCompositeKey, ICompositeKey } from "~/app/shared/interfaces/ICompositeKey.interface";
import { IHaveTooltip } from "~/app/shared/interfaces/IHaveTooltip.interface";
import { Term } from "~/app/shared/types/data";
import { AbilityTextUtil } from "~/app/shared/utils/ability-text.util";

export class Buff implements IHaveTooltip, ICompositeKey {
  private _monsterName: string;
  private _name: string;
  private _text: string;
  private _auraDuration: number;
  private _isAppliedAsBuff: boolean = false;
  private _isAppliedAsDiscard: boolean = false;
  private _terms: Term[] = [];

  constructor(monsterName: string, name: string, text: string, auraDuration: number) {
    this._monsterName = monsterName;
    this._name = name;
    this._text = text;
    this._auraDuration = auraDuration;
    this._terms = AbilityTextUtil.getTermsFromText(text);
  }
  
  key(): CardCompositeKey { return `${this.monsterName}_${this.name}`; }
  hasTooltip(): boolean { return !!this._terms.length; }

  isApplied(): boolean { return this._isAppliedAsBuff || this._isAppliedAsDiscard; }
  toggleAppliedAsBuff() {
    this._isAppliedAsBuff = !this._isAppliedAsBuff;
    this._isAppliedAsDiscard = false;
  }

  toggleAppliedAsDiscard() {
    this._isAppliedAsDiscard = !this._isAppliedAsDiscard;
    this._isAppliedAsBuff = false;
  }

  setIsAppliedAsBuff(value: boolean) { this._isAppliedAsBuff = value; }
  setIsAppliedAsDiscard(value: boolean) { this._isAppliedAsDiscard = value; }

  get monsterName(): string { return this._monsterName; }
  get name(): string { return this._name; }
  get text(): string { return this._text; }
  get auraDuration(): number { return this._auraDuration; }
  get isAppliedAsBuff(): boolean { return this._isAppliedAsBuff; }
  get isAppliedAsDiscard(): boolean { return this._isAppliedAsDiscard; }
  get terms(): Term[] { return this._terms; }

}