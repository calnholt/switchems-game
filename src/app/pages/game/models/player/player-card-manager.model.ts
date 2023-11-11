import { Buff } from "../monster/buff.model";
import { Deck } from "./deck.model";
import { DiscardPile } from "./discard-pile.model";
import { Hand } from "./hand.model";

type DrawResultType = 'MAX_HAND_SIZE' | 'RESHUFFLE' | 'DRAW';

export class PlayerCardManager {
  private _hand: Hand;
  private _deck: Deck;
  private _discardPile: DiscardPile;

  constructor(cards: Buff[]) {
    this._hand = new Hand();
    this._deck = new Deck(cards);
    this._discardPile = new DiscardPile();
  }

  public get hand() { return this._hand; }
  public get deck() { return this._deck; }
  public get discardPile() { return this._discardPile; }

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

}

