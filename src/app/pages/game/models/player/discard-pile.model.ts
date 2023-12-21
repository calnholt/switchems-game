import { CardCompositeKey } from "~/app/shared/interfaces/ICompositeKey.interface";
import { Buff } from "../monster/buff.model";

export class DiscardPile {
  private _cards: Buff[] = [];

  constructor() {
    this._cards = [];
  }

  /**
 * Empties the discard pile and returns all of the cards in it
 */
  empty(): Buff[] {
    const cards = [...this._cards];
    this._cards = [];
    return cards;
  }

  add(card: Buff) { this._cards.unshift(card); }

  addMultiple(cards: Buff[]) { cards.forEach(card => this._cards.push(card)); }

  remove(key: CardCompositeKey): Buff { 
    const index = this._cards.findIndex(card => card.key() === key);
    return this._cards.splice(index, 1)[0];
  };

  removeMultiple(keys: CardCompositeKey[]) {return keys.map(this.remove); }

  reset() {
    this._cards = [];
  }

}
