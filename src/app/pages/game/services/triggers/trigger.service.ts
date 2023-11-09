import { Injectable } from '@angular/core';
import { Condition } from '../../components/game/logic/condition.model';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TriggerService {

  // ~FASTER~ keyword
  public readonly faster$ = new BehaviorSubject<Condition>(this.getEmptyCondition());
  public readonly attackKO$ = new BehaviorSubject<Condition>(this.getEmptyCondition());

  constructor() { }

  public cleanup() {
    [this.faster$, this.attackKO$].forEach($ => {
      $.next(this.getEmptyCondition());
    });
  }

  private getEmptyCondition() { return new Condition(false, undefined, ''); }

}
