import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CardCompositeKey } from '~/app/shared/interfaces/ICompositeKey.interface';

export interface Applied {
  buff: number,
  discard: number,
  key: CardCompositeKey, // identifier for the obj that the cards are applied to
}

@Injectable({
  providedIn: 'root'
})
export class AppliedService {

  private _applied$: BehaviorSubject<Applied> = new BehaviorSubject({buff: 0, discard: 0, key: ''});

  public get applied$() { return this._applied$; } 
  public get applied() { return this._applied$.value; }

  public setApplied(key: CardCompositeKey, buff: number, discard: number) {
    this._applied$.next({
      key: key,
      buff: buff,
      discard: discard,
    })
  }
  
  public updateApplied(buff: number, discard: number) {
    this._applied$.next({
      ...this.applied,
      buff: buff,
      discard: discard,
    })
  }

}
