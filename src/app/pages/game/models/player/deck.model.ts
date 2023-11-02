import { ArrayUtil } from "~/app/shared/utils/array.util";
import { Buff } from "../monster/buff.model";

export class Hand {
  private _cards: Buff[];

  constructor(cards: Buff[]) {
    this._cards = cards;
  }

  shuffle(): void {
    this._cards = ArrayUtil.randomizeOrder(this._cards);
  }

  reshuffle(cards: Buff[]) {
    this._cards = ArrayUtil.randomizeOrder(cards);
  }

  canDraw(): boolean { return this._cards.length > 0; }

  draw(): Buff { return (this._cards.shift() as Buff); }

}