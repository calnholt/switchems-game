import { IHaveTooltip } from "~/app/shared/interfaces/IHaveTooltip.interface";
import { Term } from "~/app/shared/types/data";
import { AbilityTextUtil } from "~/app/shared/utils/ability-text.util";

export class Buff implements IHaveTooltip {
  private monsterName: string;
  private name: string;
  private text: string;
  private auraDuration: number;
  public isAppliedAsBuff: boolean = false;
  public isAppliedAsDiscard: boolean = false;
  private terms: Term[] = [];

  constructor(monsterName: string, name: string, text: string, auraDuration: number) {
    this.monsterName = monsterName;
    this.name = name;
    this.text = text;
    this.auraDuration = auraDuration;
    this.terms = AbilityTextUtil.getTermsFromText(text);
  }
  hasTooltip(): boolean {
    return !!this._terms.length;
  }

  get _monsterName(): string { return this.monsterName; }
  get _name(): string { return this.name; }
  get _text(): string { return this.text; }
  get _auraDuration(): number { return this.auraDuration; }
  get _isAppliedAsBuff(): boolean { return this.isAppliedAsBuff; }
  get _isAppliedAsDiscard(): boolean { return this.isAppliedAsDiscard; }
  get _terms(): Term[] { return this.terms; }

}