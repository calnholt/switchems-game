import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Path } from '../types/dataTypes';

const BASE_PATH = '../../../../assets/audio/ui/';

@Injectable({
  providedIn: 'root'
})
export class SfxService {

  private _playSfx: BehaviorSubject<SfxType> = new BehaviorSubject<SfxType>('');

  public get playSfx() { return this._playSfx.value; }
  public get playSfx$() { return this._playSfx; }

  constructor() { 
    this._playSfx.subscribe((value) => {
      const audio = new Audio(this.getPath(value));
      audio.play().catch(err => console.error('Error playing sound:', err));
    })
  }

  public play(sfx: SfxType) {
    this.playSfx$.next(sfx);
  }

  public clear() {
    this.playSfx$.next('');
  }

  private getPath(sfxType: SfxType): Path {
    switch (sfxType) {
      case 'CLICK':
        return BASE_PATH + 'click.ogg';
      case 'SWITCH':
        return BASE_PATH + 'switch.mp3';
    }
    return '';
  }

}

export type SfxType = 
  | 'SWITCH'
  | 'CLICK'
  | ''
;