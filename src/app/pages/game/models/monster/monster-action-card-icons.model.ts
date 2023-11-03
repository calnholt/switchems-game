export class MonsterActionCardIcons {
  private _buff: number;
  private _discard: number;
  private _draw: number;
  private _addedBuff: number;
  private _appliedBuff: number;
  private _appliedDiscard: number;

  constructor(
    buff: number = 0,
    discard: number = 0,
    draw: number = 0,
    addedBuff: number = 0,
    appliedBuff: number = 0,
    appliedDiscard: number = 0
  ) {
    this._buff = buff;
    this._discard = discard;
    this._draw = draw;
    this._addedBuff = addedBuff;
    this._appliedBuff = appliedBuff;
    this._appliedDiscard = appliedDiscard;
  }

  get buff(): number {
    return this._buff;
  }

  get discard(): number {
    return this._discard;
  }

  get draw(): number {
    return this._draw;
  }

  get addedBuff(): number {
    return this._addedBuff;
  }

  get appliedBuff(): number {
    return this._appliedBuff;
  }

  get appliedDiscard(): number {
    return this._appliedDiscard;
  }

  setAppliedBuff(value: number) { this._appliedBuff = value; }
  setAppliedDiscard(value: number) { this._appliedDiscard = value; }

  canApplyBuff(isSuper: boolean): boolean { 
    return this._appliedBuff + this._addedBuff +(isSuper ? 1 : 0) < this._buff; 
  }

  canApplyDiscard(): boolean { return this._appliedDiscard < this._discard; }

  clearApplied() {
    this._appliedBuff = 0;
    this._appliedDiscard = 0;
  }

}