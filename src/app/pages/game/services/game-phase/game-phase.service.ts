import { Injectable } from '@angular/core';
import { GameState, GameStateService } from '../game-state/game-state.service';
import { UpdateGameStateService } from '../update-game-state/update-game-state.service';
import { GamePhaseCommandType } from '../../logic/commands/game-phase-commands.model';
import { GamePhaseUtil } from '../update-game-state/game-phase.util';
import { CurrentPhaseService } from '../current-phase/current-phase.service';
import { Chargroar } from '../../logic/monsters/chargroar.model';
import { SwitchInCommand } from '../../logic/commands/switch-commands.model';

@Injectable({
  providedIn: 'root'
})
export class GamePhaseService {

  loaded = false;

  constructor(
    private gameStateService: GameStateService,
    private ugss: UpdateGameStateService,
    private currentPhaseService: CurrentPhaseService,
  ) {
    this.startGame();
    this.currentPhaseService.currentPhase$.subscribe((value) => {
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
    const gs = this.gameStateService.getGameState();
    if (gs.p.activeMonster.key() === 'CHARGROAR') {
      new Chargroar('CHARGROAR', '', 'P', gs, this.ugss).addTriggers();
    }
  }

  // this is the full action phase game loop. each phase resolves in order. 
  // when a new phase starts (initiated by an empty event queue from EventQueueCommandService),
  // a new phase is added to the queue, which is then processed, which will add new events
  // we skip all phases that aren't entered (based on action selections by players).

  private gameLoop(phase: GamePhaseCommandType) {
    const gs: GameState = this.gameStateService.getGameState();
    switch (phase) {
      case 'REVEAL_PHASE':
        GamePhaseUtil.revealPhase(gs, this.ugss);
        break;
      case 'APPLY_PIPS_PHASE':
        if (GamePhaseUtil.isApplyPipsPhaseApplicable(gs)) {
          GamePhaseUtil.applyPipsPhase(gs, this.ugss);
        }
        else {
          this.currentPhaseService.goToNextPhase();
        }
        break;
      case 'APPLY_BUFFS_PHASE':
        if (GamePhaseUtil.isApplyBuffsPhaseApplicable(gs)) {
          GamePhaseUtil.applyBuffsPhase(gs, this.ugss);
        }
        else {
          this.currentPhaseService.goToNextPhase();
        }
        break;
      case 'SWITCH_ACTIONS_PHASE':
        if (GamePhaseUtil.isSwitchActionPhaseApplicable(gs)) {
          GamePhaseUtil.switchActionsPhase(gs, this.ugss);
        }
        else {
          this.currentPhaseService.goToNextPhase();
        }
        break;
      case 'MONSTER_ACTIONS_PHASE':
        if (GamePhaseUtil.isMonsterActionPhaseApplicable(gs)) {
          GamePhaseUtil.monsterActionsPhase(gs, this.ugss);
        }
        else {
          this.currentPhaseService.goToNextPhase();
        }
        break;
      case 'STANDARD_ACTIONS_PHASE':
        if (GamePhaseUtil.isStandardActionPhaseApplicable(gs)) {
          GamePhaseUtil.standardActionsPhase(gs, this.ugss);
        }
        else {
          this.currentPhaseService.goToNextPhase();
        }
        break;
      case 'END_PHASE':
        GamePhaseUtil.endPhase(gs, this.ugss);
        break;
      case 'SELECTION_PHASE':
        if (!this.loaded) {
          this.loaded = true;
        }
        else {
          GamePhaseUtil.selectionPhase(gs, this.ugss);
        }
        break;
      case 'START_OF_GAME':
        this.startGame();
        GamePhaseUtil.selectionPhase(gs, this.ugss);
        break;
    }
  }

}
