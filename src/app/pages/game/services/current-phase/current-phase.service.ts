import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { GamePhaseCommandType } from '../../logic/commands/game-phase-commands.model';

@Injectable({
  providedIn: 'root'
})
export class CurrentPhaseService {
  private _currentPhase = new BehaviorSubject<GamePhaseCommandType>('TUTORIAL');
  private _currentTurn = 1;

  // Observable that other services/components can subscribe to
  readonly currentPhase$ = this._currentPhase.asObservable();

  public get currentPhase() { return this._currentPhase.value; }
  public get currentTurn() { return this._currentTurn; }

  constructor() {}

  public startGame() {
    this._currentPhase.next('START_OF_GAME');
  }

  // Method to transition to the next phase
  goToNextPhase() {
    const nextPhase = this.calculateNextPhase();
    console.log('going to next phase', nextPhase);
    if (nextPhase === 'END_PHASE') {
      this._currentTurn ++;
    }
    this._currentPhase.next(nextPhase);
  }

  // Method to determine the next phase (this is just an example)
  private calculateNextPhase(): GamePhaseCommandType {
    const allPhases = [
      'SELECTION_PHASE', 
      'REVEAL_PHASE', 
      'APPLY_PIPS_PHASE', 
      'APPLY_BUFFS_PHASE', 
      'SWITCH_ACTIONS_PHASE', 
      'MONSTER_ACTIONS_PHASE', 
      'STANDARD_ACTIONS_PHASE', 
      'END_PHASE'
    ];
    const currentPhaseIndex = allPhases.indexOf(this._currentPhase.value);
    const nextIndex = (currentPhaseIndex + 1) >= allPhases.length ? 0 : (currentPhaseIndex + 1);
    return allPhases[nextIndex] as GamePhaseCommandType;
  }

  // Optionally, you can also have methods to go to a specific phase directly
  goToPhase(phase: GamePhaseCommandType) {
    this._currentPhase.next(phase);
  }
}