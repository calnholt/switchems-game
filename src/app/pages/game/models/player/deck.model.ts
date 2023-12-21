import { ArrayUtil } from "~/app/shared/utils/array.util";
import { Buff } from "../monster/buff.model";

export class Deck {
  private _cards: Buff[];
  private _startingCards: Buff[];

  constructor(cards: Buff[]) {
    this._cards = cards;
    this._startingCards = cards;
    this.shuffle();
  }

  shuffle(): void {
    this._cards = ArrayUtil.randomizeOrder(this._cards);
  }

  reshuffle(cards: Buff[]) {
    this._cards = ArrayUtil.randomizeOrder(cards);
  }

  isEmpty(): boolean { return this._cards.length === 0; }

  /**
   * Removes the top card of the deck (index 0)
   * @returns top card of of deck
   */
  draw(): Buff { return (this._cards.shift() as Buff); }

  reset() {
    this._cards = this._startingCards;
  }

}