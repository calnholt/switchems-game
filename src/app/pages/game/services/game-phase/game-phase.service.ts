import { Injectable } from '@angular/core';
import { GameState, GameStateService } from '../game-state/game-state.service';
import { SelectionGamePhaseCommand } from '../../logic/commands/game-phase-commands.model';
import { UpdateGamePhaseUtil } from '../update-game-state/update-game-phase.util';
import { EventCommandQueueService } from '../event-command-queue/event-command-queue.service';
import { EventUpdateMediatorService } from '../event-update-mediator.service';

@Injectable({
  providedIn: 'root'
})
export class GamePhaseService {

  constructor(
    private gameStateService: GameStateService,
    private med: EventUpdateMediatorService,
  ) { }

  public testActionPhase() {
    const gs: GameState = this.gameStateService.getGameState();
    if (gs.p.selectedAction.isCostFulfilled() && gs.o.selectedAction.isCostFulfilled()) {
      this.processActionPhase();
    }
    // gs.o.selectedAction.action = new StandardAction('PREPARE', []);
  }

  public startGame() {
    this.med.enqueue(new SelectionGamePhaseCommand({ key: 'phase', player: 'P' }));
  }

  private processActionPhase() {
    const gs: GameState = this.gameStateService.getGameState();

    UpdateGamePhaseUtil.revealPhase(gs, this.med);

    UpdateGamePhaseUtil.applyPipsPhase(gs, this.med);

    UpdateGamePhaseUtil.applyBuffsPhase(gs, this.med);

    UpdateGamePhaseUtil.switchActionsPhase(gs, this.med);

    UpdateGamePhaseUtil.monsterActionsPhase(gs, this.med);

    UpdateGamePhaseUtil.standardActionsPhase(gs, this.med);

    UpdateGamePhaseUtil.endPhase(gs, this.med);

    UpdateGamePhaseUtil.selectionPhase(gs, this.med);
  }

}
