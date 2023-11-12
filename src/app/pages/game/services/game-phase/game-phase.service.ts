import { Injectable } from '@angular/core';
import { GameState, GameStateService } from '../game-state/game-state.service';
import { UpdateGameStateService } from '../update-game-state/update-game-state.service';
import { GamePhaseCommandType, SelectionGamePhaseCommand } from '../../logic/commands/game-phase-commands.model';
import { UpdateGamePhaseUtil } from '../update-game-state/update-game-phase.util';
import { CurrentPhaseService } from '../current-phase/current-phase.service';

@Injectable({
  providedIn: 'root'
})
export class GamePhaseService {

  constructor(
    private gameStateService: GameStateService,
    private ugss: UpdateGameStateService,
    private currentPhaseService: CurrentPhaseService,
  ) {
    this.currentPhaseService.currentPhase$.subscribe((value)=> {
      // if (value !== 'SELECTION_PHASE')
        this.gameLoop(value);
    });
  }

  public testActionPhase() {
    const gs: GameState = this.gameStateService.getGameState();
    if (gs.p.selectedAction.isCostFulfilled() && gs.o.selectedAction.isCostFulfilled()) {
      this.currentPhaseService.goToNextPhase();
    }
    // gs.o.selectedAction.action = new StandardAction('PREPARE', []);
  }

  public startGame() {
    // this.ugss.enqueue(new SelectionGamePhaseCommand(this.ugss, { key: 'phase', player: 'P' }));
  }

  private gameLoop(phase: GamePhaseCommandType) {
    const gs: GameState = this.gameStateService.getGameState();
    switch (phase) {
      case 'REVEAL_PHASE':
        UpdateGamePhaseUtil.revealPhase(gs, this.ugss);
      break;
      case 'APPLY_PIPS_PHASE':
        UpdateGamePhaseUtil.applyPipsPhase(gs, this.ugss);
      break;
      case 'APPLY_BUFFS_PHASE':
        UpdateGamePhaseUtil.applyBuffsPhase(gs, this.ugss);
      break;
      case 'SWITCH_ACTIONS_PHASE':
        UpdateGamePhaseUtil.switchActionsPhase(gs, this.ugss);
      break;
      case 'MONSTER_ACTIONS_PHASE':
        UpdateGamePhaseUtil.monsterActionsPhase(gs, this.ugss);
      break;
      case 'STANDARD_ACTIONS_PHASE':
        UpdateGamePhaseUtil.standardActionsPhase(gs, this.ugss);
      break;
      case 'END_PHASE':
        UpdateGamePhaseUtil.endPhase(gs, this.ugss);
      break;
      case 'SELECTION_PHASE':
        UpdateGamePhaseUtil.selectionPhase(gs, this.ugss);
      break;
    }
  }

}
