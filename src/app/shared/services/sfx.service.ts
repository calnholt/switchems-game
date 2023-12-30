import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SfxService {

  private _playSfx: BehaviorSubject<SfxType> = new BehaviorSubject<SfxType>('');

  public get playSfx() { return this._playSfx.value; }
  public get playSfx$() { return this._playSfx; }

  constructor() { }

  public play(sfx: SfxType) {
    this.playSfx$.next(sfx);
  }

  public clear() {
    this.playSfx$.next('');
  }

}

export type SfxType = 
  | 'SWITCH'
  | 'CLICK'
  | ''
;