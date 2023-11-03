import { CardCompositeKey } from "~/app/shared/interfaces/ICompositeKey.interface";
import { Buff } from "../monster/buff.model";
import { Deck } from "./deck.model";
import { DiscardPile } from "./discard-pile.model";
import { Hand } from "./hand.model";

type DrawResultType = 'MAX_HAND_SIZE' | 'RESHUFFLE' | 'DRAW';

export class PlayerCardManager {
  private _hand: Hand;
  private _deck: Deck;
  private _discardPile: DiscardPile;
  private _appliedBuffs: Buff[] = [];
  private _appliedDiscards: Buff[] = [];

  constructor(cards: Buff[]) {
    this._hand = new Hand();
    this._deck = new Deck(cards);
    this._discardPile = new DiscardPile();
  }

  public get hand() { return this._hand; }
  public get deck() { return this._deck; }
  public get discardPile() { return this._discardPile; }
  public get appliedBuffs() { return this._appliedBuffs; }
  public get appliedDiscards() { return this._appliedDiscards; }

  public drawCard(): DrawResultType {
    if (this._hand.hasMaxHandSize()) {
      return 'MAX_HAND_SIZE';
    }
    if (this._deck.isEmpty()) {
      this._deck.reshuffle(this._discardPile.empty());
      this._hand.addCardToHand(this._deck.draw());
      return 'RESHUFFLE';
    }
    this._hand.addCardToHand(this._deck.draw());
    return 'DRAW';
  }

  public applyCards(): void {
    this._appliedBuffs = this._hand.getAppliedBuffs();
    this._appliedDiscards = this._hand.getAppliedDiscards();
    this._hand.removeAppliedCards();
  }

  public cleanupAppliedCards() {
    this._discardPile.addMultiple(this._appliedDiscards);
    this._discardPile.addMultiple(this._appliedBuffs);
    this._appliedBuffs = [];
    this._appliedDiscards = [];
  }

  public toggleCardAsBuff(key: CardCompositeKey) {
    this._hand.toggleCardAsBuff(key);
  }

  public toggleCardAsDiscard(key: CardCompositeKey) {
    this._hand.toggleCardAsDiscard(key);
  }

}

