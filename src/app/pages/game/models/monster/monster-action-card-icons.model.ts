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