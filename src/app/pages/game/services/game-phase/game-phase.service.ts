import { Injectable } from '@angular/core';
import { GameState, GameStateService } from '../game-state/game-state.service';
import { UpdateGameStateService } from '../update-game-state/update-game-state.service';
import { GamePhaseCommandType } from '../../logic/commands/game-phase-commands.model';
import { GamePhaseUtil } from '../update-game-state/game-phase.util';
import { CurrentPhaseService } from '../current-phase/current-phase.service';
import { Chargroar } from '../../logic/monsters/chargroar.model';
import { TutorialService } from '../tutorial/tutorial.service';
import { GuidedTutorialCheckUtil } from '../../models/tutorial/tutorial.util';
import { GameStateUtil } from '../game-state/game-state.util';
import { CPUActionSelectUtil } from '../update-game-state/cpu-action-select.util';

@Injectable({
  providedIn: 'root'
})
export class GamePhaseService {

  loaded = false;

  constructor(
    private gameStateService: GameStateService,
    private ugss: UpdateGameStateService,
    private currentPhaseService: CurrentPhaseService,
    private tutorialService: TutorialService,
  ) {
    this.currentPhaseService.currentPhase$.subscribe((value) => {
      if (value === 'GAME_OVER') {
        this.loaded = false;
        return;
      }
      this.gameLoop(value);
    });
  }

  public submitAction() {
    const gs: GameState = this.gameStateService.getGameState();
    if (this.tutorialService.isGuidedTutorialActive) {
      if (GuidedTutorialCheckUtil.checkTurn(gs, this.currentPhaseService.currentTurn) && gs.p.selectedAction.isCostFulfilled()) {
        this.currentPhaseService.goToNextPhase();
      }
    }
    else if (gs.p.selectedAction.isCostFulfilled() && gs.o.selectedAction.isCostFulfilled()) {
      if (gs.cpu) {
        gs.selectedActionService.setOpponentAction(CPUActionSelectUtil.getRandomAction(GameStateUtil.getPlayerState(gs, 'O'), gs.rng));
      }
      this.currentPhaseService.goToNextPhase();
    }
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
        GamePhaseUtil.startGamePhase(gs, this.ugss);
        break;
    }
  }

}
