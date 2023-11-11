import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { GamePhaseCommandType } from '../../logic/commands/game-phase-commands.model';

export interface CurrentGamePhase {
  phase: 'SELECTION_PHASE', 
  end: false
}

@Injectable({
  providedIn: 'root'
})
export class CurrentGamePhaseService {

  private _currentPhase$ = new BehaviorSubject<GamePhaseCommandType>('SELECTION_PHASE');

  public get currentPhase$() { return this._currentPhase$; }
  public get currentPhase() { return this._currentPhase$.value; }

  constructor() { }
}
