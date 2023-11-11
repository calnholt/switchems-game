import { Injectable } from '@angular/core';
import { GameState, GameStateService } from '../game-state/game-state.service';
import { UpdateGameStateService } from '../update-game-state/update-game-state.service';
import { SelectionGamePhaseCommand } from '../../logic/commands/game-phase-commands.model';
import { UpdateGamePhaseUtil } from '../update-game-state/update-game-phase.util';

@Injectable({
  providedIn: 'root'
})
export class GamePhaseService {

  constructor(
    private gameStateService: GameStateService,
    private ugss: UpdateGameStateService,
  ) { }

  public testActionPhase() {
    const gs: GameState = this.gameStateService.getGameState();
    if (gs.p.selectedAction.isCostFulfilled() && gs.o.selectedAction.isCostFulfilled()) {
      this.processActionPhase();
    }
    // gs.o.selectedAction.action = new StandardAction('PREPARE', []);
  }

  public startGame() {
    this.ugss.enqueue(new SelectionGamePhaseCommand(this.ugss, { key: 'phase', player: 'P' }));
  }

  private processActionPhase() {
    const gs: GameState = this.gameStateService.getGameState();

    UpdateGamePhaseUtil.revealPhase(gs, this.ugss);

    UpdateGamePhaseUtil.applyPipsPhase(gs, this.ugss);

    UpdateGamePhaseUtil.applyBuffsPhase(gs, this.ugss);

    UpdateGamePhaseUtil.switchActionsPhase(gs, this.ugss);

    UpdateGamePhaseUtil.monsterActionsPhase(gs, this.ugss);

    UpdateGamePhaseUtil.standardActionsPhase(gs, this.ugss);

    UpdateGamePhaseUtil.endPhase(gs, this.ugss);

    UpdateGamePhaseUtil.selectionPhase(gs, this.ugss);
  }

}
