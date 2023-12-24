import { ArrayUtil } from "~/app/shared/utils/array.util";
import { Buff } from "../monster/buff.model";
import { SeedableRngService } from "../../services/seedable-rng/seedable-rng.service";

export class Deck {
  private _cards: Buff[];
  private _rng: SeedableRngService;

  constructor(cards: Buff[], rng: SeedableRngService) {
    this._cards = cards;
    this._rng = rng;
    this.shuffle();
  }

  shuffle(): void {
    this._cards = ArrayUtil.randomizeOrder(this._cards, this._rng);
  }

  reshuffle(cards: Buff[]) {
    this._cards = ArrayUtil.randomizeOrder(cards, this._rng);
  }

  isEmpty(): boolean { return this._cards.length === 0; }

  /**
   * Removes the top card of the deck (index 0)
   * @returns top card of of deck
   */
  draw(): Buff { return (this._cards.shift() as Buff); }

  reset(cards: Buff[]) {
    this._cards = cards;
    this.shuffle();
  }

}