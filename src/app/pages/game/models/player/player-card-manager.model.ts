import { BehaviorSubject } from "rxjs";
import { Buff } from "../monster/buff.model";
import { Deck } from "./deck.model";
import { DiscardPile } from "./discard-pile.model";
import { Hand } from "./hand.model";
import { SeedableRngService } from "../../services/seedable-rng/seedable-rng.service";

export class PlayerCardManager {
  private _hand$: BehaviorSubject<Hand>;
  private _deck: Deck;
  private _discardPile: DiscardPile;

  constructor(cards: Buff[], rng: SeedableRngService) {
    this._hand$ = new BehaviorSubject<Hand>(new Hand(rng));
    this._deck = new Deck(cards);
    this._discardPile = new DiscardPile();
  }

  public get hand() { return this._hand$.value; }
  public get hand$() { return this._hand$; }
  public get deck() { return this._deck; }
  public get discardPile() { return this._discardPile; }

  public drawCard() {
    if (this.hand.hasMaxHandSize()) {
      return;
    }
    if (this._deck.isEmpty()) {
      this._deck.reshuffle(this._discardPile.empty());
      this.hand.addCardToHand(this._deck.draw());
    }
    this.hand.addCardToHand(this._deck.draw());
    // push changes
    this._hand$.next(this.hand);
  }

  public cleanup(cardsToDiscard: Buff[]) {
    this.hand.removeCardByKeys(cardsToDiscard.map(c => c.key()));
    this.discardPile.addMultiple(cardsToDiscard);
    this.hand$.next(this.hand);
  }

  public reset(cards: Buff[]) {
    this.hand.reset();
    this._hand$.next(this.hand);
    this.discardPile.reset();
    this.deck.reset(cards);
  }

}

