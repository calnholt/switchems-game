import { Injectable } from '@angular/core';
import { GameState, GameStateService } from '../game-state/game-state.service';
import { UpdateGameStateService } from '../update-game-state/update-game-state.service';
import { GamePhaseUtil } from '../update-game-state/game-phase.util';
import { CurrentPhaseService } from '../current-phase/current-phase.service';
import { TutorialService } from '../tutorial/tutorial.service';
import { GuidedTutorialCheckUtil } from '../../models/tutorial/tutorial.util';
import { GameStateUtil } from '../game-state/game-state.util';
import { CPUActionSelectUtil } from '../update-game-state/cpu-action-select.util';
import { PeerJsService } from '~/app/shared/services/peer-js.service';
import { OnlineBattleService } from '../online-battle.service';

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
    private peerService: PeerJsService,
    private onlineBattleService: OnlineBattleService,
  ) {
    this.currentPhaseService.currentPhase$.subscribe((value) => {
      if (value === 'SELECTION_PHASE') {
        this.onlineBattleService.status$.next('SELECTING_ACTION');
        this.peerService.sendData('FINISHED_TURN');
      }
      if (value === 'GAME_OVER') {
        this.loaded = false;
        return;
      }
    });
  }

  public submitAction() {
    const gs: GameState = this.gameStateService.getGameState();
    console.log('current seed: ', gs.rng.seed)
    // online games
    if (!this.gameStateService.isCpu) {
      if (this.onlineBattleService.status == 'CONFIRMED_ACTION') {
        return;
      }
      this.onlineBattleService.status$.next('CONFIRMED_ACTION');
      this.peerService.sendData('SUBMIT_ACTION');
      return;
    }
    // guided tutorial
    if (this.tutorialService.isGuidedTutorialActive) {
      if (GuidedTutorialCheckUtil.checkTurn(gs, this.currentPhaseService.currentTurn) && gs.p.selectedAction.isCostFulfilled()) {
        GamePhaseUtil.enqueueRevealPhase(gs, this.ugss);
      }
    }
    // CPU
    else if (gs.p.selectedAction.isCostFulfilled() && gs.o.selectedAction.isCostFulfilled()) {
      let cpuAction = null;
      if (gs.cpu) {
        cpuAction = CPUActionSelectUtil.getRandomAction(
          GameStateUtil.getPlayerState(gs, 'O'),
          GameStateUtil.getPlayerState(gs, 'P'),
          gs.rng)
        gs.selectedActionService.setOpponentAction(cpuAction);
      }
      GamePhaseUtil.enqueueRevealPhase(gs, this.ugss, cpuAction);
    }
  }

  public startGame() {
    GamePhaseUtil.enqueueStartGamePhase(this.gameStateService.getGameState(), this.ugss);
  }

}
