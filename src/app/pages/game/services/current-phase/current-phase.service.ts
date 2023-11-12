import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { GamePhaseCommandType } from '../../logic/commands/game-phase-commands.model';

@Injectable({
  providedIn: 'root'
})
export class CurrentPhaseService {
  private _currentPhase = new BehaviorSubject<GamePhaseCommandType>('SELECTION_PHASE');

  // Observable that other services/components can subscribe to
  currentPhase$ = this._currentPhase.asObservable();

  public get currentPhase() { return this._currentPhase.value; }

  constructor() {}

  // Method to transition to the next phase
  goToNextPhase() {
    const nextPhase = this.calculateNextPhase();
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
    const nextIndex = (currentPhaseIndex) >= allPhases.length ? 0 : (currentPhaseIndex + 1);
    return allPhases[nextIndex] as GamePhaseCommandType;
  }

  // Optionally, you can also have methods to go to a specific phase directly
  goToPhase(phase: GamePhaseCommandType) {
    this._currentPhase.next(phase);
  }
}