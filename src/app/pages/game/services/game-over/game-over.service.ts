import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { PlayerType } from '../../logic/player-type.mode';

export type WinnerType = PlayerType | null;

@Injectable({
  providedIn: 'root'
})
export class GameOverService {

  private _winner = new BehaviorSubject<WinnerType>('P');
  public get winner$() { return this._winner; }
  public get winner() { return this._winner.value; }

  constructor() { }
}
