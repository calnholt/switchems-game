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

  getAppliedBuffs(): Buff[] {
    return this._cards.filter(card => card.isAppliedAsBuff);
  }

  getAppliedBuffCount(): number { 
    return this.getAppliedBuffs().length + this.getAppliedBuffs().filter(b => b.isSuper).length; 
  }
  
  getAppliedDiscards(): Buff[] {
    return this._cards.filter(card => card.isAppliedAsDiscard);
  }

  getAppliedDiscardCount(): number { return this.getAppliedDiscards().length; }

  removeAppliedCards(): void {
    this._cards = [...this._cards.filter(card => card.isApplied())];
  }

  toggleCardAsBuff(key: CardCompositeKey) {
    this._cards.find(card => card.key() === key)?.toggleAppliedAsBuff();
  }

  toggleCardAsDiscard(key: CardCompositeKey) {
    this._cards.find(card => card.key() === key)?.toggleAppliedAsDiscard();
  }

  clearAllApplied() {
    this._cards.forEach(card => {
      card.setIsAppliedAsBuff(false);
      card.setIsAppliedAsDiscard(false);
    });
  }

  getCardByKey(key: CardCompositeKey): Buff {
    return this._cards.find(card => card.key() === key) as Buff;
  }

}