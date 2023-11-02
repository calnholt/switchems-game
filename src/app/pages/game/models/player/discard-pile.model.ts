import { CardCompositeKey } from "~/app/shared/interfaces/ICompositeKey.interface";
import { Buff } from "../monster/buff.model";

export class DiscardPile {
  private _cards: Buff[] = [];

  constructor() {
    
  }

  empty(): Buff[] {
    const cards = [...this._cards];
    this._cards = [];
    return cards;
  }

  add(card: Buff) { this._cards.unshift(card); }

  addMultiple(cards: Buff[]) { cards.forEach(this.add); }

  remove(key: CardCompositeKey): Buff { 
    const index = this._cards.findIndex(card => card.key() === key);
    return this._cards.splice(index, 1)[0];
  };

  removeMultiple(keys: CardCompositeKey[]) {return keys.map(this.remove); }

}
