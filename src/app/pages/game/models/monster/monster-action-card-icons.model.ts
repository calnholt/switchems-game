export class MonsterActionCardIcons {
  private _buff: number;
  private _discard: number;
  private _draw: number;
  private _addedBuff: number;

  constructor(
    buff: number = 0,
    discard: number = 0,
    draw: number = 0,
    addedBuff: number = 0,
  ) {
    this._buff = buff;
    this._discard = discard;
    this._draw = draw;
    this._addedBuff = addedBuff;
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

  canApplyBuff(alreadyApplied: number, isSuper: boolean = false): boolean { 
    return alreadyApplied + this._addedBuff +(isSuper ? 1 : 0) < this._buff; 
  }

  canApplyDiscard(alreadyApplied: number): boolean { return alreadyApplied < this._discard; }

}