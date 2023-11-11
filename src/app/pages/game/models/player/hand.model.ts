import { ArrayUtil } from "~/app/shared/utils/array.util";
import { Buff } from "../monster/buff.model";
import { CardCompositeKey } from "~/app/shared/interfaces/ICompositeKey.interface";

const MAX_HAND_SIZE = 5;

export class Hand {
  private _cards: Buff[] = [];
  private _maxHandSize: number = MAX_HAND_SIZE;

  public get cards() { return this._cards; }

  cardsInHand(): number { return this._cards.length; }

  canDiscard(): boolean { return this._cards.length > 0; }

  addCardToHand(card: Buff): void { this._cards.push(card); }

  hasMaxHandSize(): boolean { return this._cards.length === this._maxHandSize };

  discardRandomCard(): Buff {
    return this._cards.splice(ArrayUtil.getRandomIndex(this._cards.length))[0];
  }

  getCardByKey(key: CardCompositeKey): Buff {
    return this._cards.find(card => card.key() === key) as Buff;
  }

  removeCardByKeys(keys: CardCompositeKey[]) {
    this._cards = this._cards.filter(c => !keys.includes(c.key()));
  }

}