import { Injectable } from '@angular/core';
import { GameState, GameStateService } from '../game-state/game-state.service';
import { GamePhaseCommandType, SelectionGamePhaseCommand } from '../../logic/commands/game-phase-commands.model';
import { UpdateGamePhaseUtil } from '../update-game-state/update-game-phase.util';
import { EventUpdateMediatorService } from '../event-update-mediator.service';
import { BehaviorSubject } from 'rxjs';
import { CurrentGamePhaseService } from '../current-game-phase/current-game-phase.service';

@Injectable({
  providedIn: 'root'
})
export class GameLoopService {

  constructor(
    private gameStateService: GameStateService,
    private med: EventUpdateMediatorService,
    private currentPhaseService: CurrentGamePhaseService,
  ) { 
    this.currentPhaseService.currentPhase$.subscribe((phase) => {
      this.gameLoop(phase);
    })
  }

  public testActionPhase() {
    const gs: GameState = this.gameStateService.getGameState();
    if (gs.p.selectedAction.isCostFulfilled() && gs.o.selectedAction.isCostFulfilled()) {
      this.currentPhaseService.currentPhase$.next('REVEAL_PHASE');
    }
    // gs.o.selectedAction.action = new StandardAction('PREPARE', []);
  }

  public startGame() {
    this.med.enqueue(new SelectionGamePhaseCommand({ key: 'phase', player: 'P' }));
  }

  private gameLoop(phase: GamePhaseCommandType) {
    const gs: GameState = this.gameStateService.getGameState();
    switch (phase) {
      case 'REVEAL_PHASE':
        UpdateGamePhaseUtil.revealPhase(gs, this.med);
      break;
      case 'APPLY_PIPS_PHASE':
        UpdateGamePhaseUtil.applyPipsPhase(gs, this.med);
      break;
      case 'APPLY_BUFFS_PHASE':
        UpdateGamePhaseUtil.applyBuffsPhase(gs, this.med);
      break;
      case 'SWITCH_ACTIONS_PHASE':
        UpdateGamePhaseUtil.switchActionsPhase(gs, this.med);
      break;
      case 'MONSTER_ACTIONS_PHASE':
        UpdateGamePhaseUtil.monsterActionsPhase(gs, this.med);
      break;
      case 'STANDARD_ACTIONS_PHASE':
        UpdateGamePhaseUtil.standardActionsPhase(gs, this.med);
      break;
      case 'END_PHASE':
        UpdateGamePhaseUtil.endPhase(gs, this.med);
      break;
      case 'SELECTION_PHASE':
        UpdateGamePhaseUtil.selectionPhase(gs, this.med);
      break;
    }
  }

}
