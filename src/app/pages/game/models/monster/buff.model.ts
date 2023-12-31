import { CardCompositeKey, ICompositeKey } from "~/app/shared/interfaces/ICompositeKey.interface";
import { IHaveTooltip } from "~/app/shared/interfaces/IHaveTooltip.interface";
import { Term } from "~/app/shared/types/data";
import { AbilityTextUtil } from "~/app/shared/utils/ability-text.util";

export class Buff implements IHaveTooltip, ICompositeKey {
  private _monsterName: string;
  private _name: string;
  private _text: string;
  private _auraDuration: number;
  private _terms: Term[] = [];
  private _isSuper: boolean;
  readonly index: number;

  constructor(monsterName: string, name: string, text: string, auraDuration: number, index: number) {
    this._monsterName = monsterName;
    this._name = name;
    this._text = text;
    this._auraDuration = auraDuration;
    this._terms = AbilityTextUtil.getTermsFromText(text);
    this._isSuper = text.includes('~SUPER~');
    this.index = index;
  }
  
  key(): CardCompositeKey { return `${this.monsterName.replaceAll(' ', '').toUpperCase()}_B${this.index + 1}`; }
  hasTooltip(): boolean { return !!this._terms.length; }

  get buffSlots(): number { return this.isSuper ? 2 : 1; }
  get discardSlots(): number { return 1; }

  get monsterName(): string { return this._monsterName; }
  get name(): string { return this._name; }
  get text(): string { return this._text; }
  get auraDuration(): number { return this._auraDuration; }
  get terms(): Term[] { return this._terms; }
  get isSuper(): boolean { return this._isSuper; }

}