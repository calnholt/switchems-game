import { ArrayUtil } from "~/app/shared/utils/array.util";
import { Buff } from "../monster/buff.model";

const MAX_HAND_SIZE = 5;

export class Hand {
  private _cards: Buff[];
  private _maxHandSize: number = MAX_HAND_SIZE;

  constructor(cards: Buff[]) {
    this._cards = cards;
  }

  cardsInHand(): number { return this._cards.length; }

  canDiscard(): boolean { return this._cards.length > 0; }

  addCardToHand(card: Buff): void { this._cards.push(card); }

  canDraw(): boolean { return this._cards.length < this._maxHandSize };

  discardRandomCard(): Buff {
    return this._cards.splice(ArrayUtil.getRandomIndex(this._cards.length))[0];
  }

  getAppliedBuffs(): Buff[] {
    return this._cards.filter(card => card.isAppliedAsBuff);
  }

  getAppliedDiscards(): Buff[] {
    return this._cards.filter(card => card.isAppliedAsDiscard);
  }

  removeAppliedCards(): void {
    this._cards = [...this._cards.filter(card => card.isApplied())];
  }

}