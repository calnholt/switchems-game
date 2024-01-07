import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { PlayerProfileService } from '~/app/shared/services/player-profile.service';
import { PeerMessageType } from '~/app/shared/types/PeerMessageTypes';
import { MonsterSelectionService } from '../../select-monsters/services/monster-selection.service';
import { GameStateService } from './game-state/game-state.service';
import { HandlePromptService } from './handle-prompt/handle-prompt.service';
import { OnlineBattleService } from './online-battle.service';
import { SeedableRngService } from './seedable-rng/seedable-rng.service';
import { PeerMessageMediatorService } from './peer-message-mediator.service';
import { PeerJsService } from '~/app/shared/services/peer-js.service';
import { EventCommandType } from '../logic/commands/event-command.model';
import { PlayerService } from './player/player.service';
import { GamePhaseService } from './game-phase/game-phase.service';
import { TestOnlineUtil } from '~/app/shared/utils/test-online.util';

@Injectable({
  providedIn: 'root'
})
export class PeerMessageHandlerService {

  constructor(
    private playerProfileService: PlayerProfileService,
    private handlePromptService: HandlePromptService,
    private monsterSelectionService: MonsterSelectionService,
    private gameStateService: GameStateService,
    private onlineBattleService: OnlineBattleService,
    private rng: SeedableRngService,
    private router: Router,
    private peerMessageMediatorService: PeerMessageMediatorService,
    private peerService: PeerJsService,
    private playerService: PlayerService,
    private gamePhaseService: GamePhaseService,
  ) {
    this.peerMessageMediatorService.message$.subscribe((value) => {
      if (!value) return;
      this.handleMessage(value);
    });
  }

  // receives data from opponent and sets relevant state
  handleMessage(message: any) {
    const type = message.type as PeerMessageType;
    const data = message?.data?.data;
    const isHost = message?.data?.isHost

    switch (type) {
      case 'PLAYER_PROFILE':
        this.playerProfileService.setHost(data, isHost);
        if (isHost) {
          this.peerService.sendData('SHARE_SEED', { seed: this.rng.seed });
        }
        break;
      case 'SHARE_SEED':
        this.rng.setSeed(data.seed);
        break;
      case 'GO_TO_MONSTER_SELECT':
        this.monsterSelectionService.opponentSelectionType$.next('');
        this.router.navigate(['/select-monsters']);
        break;
      case 'PICK_4_CONFIRMED':
      case 'TEAM_CONFIRMED':
        this.monsterSelectionService.opponentSelectionType$.next(type);
        break;
      case 'PICK_4_SELECTIONS':
        this.monsterSelectionService.opponentSelections$.next(data);
        break;
      case 'START_GAME':
        this.monsterSelectionService.opponentSelections$.next(data);
        this.gameStateService.setCpu(false);
        // timeout for data to load
        setTimeout(() => {
          this.router.navigate(['/online-game']);
        }, 100);
        break;
      case 'SUBMIT_ACTION':
        this.onlineBattleService.oStatus$.next('CONFIRMED_ACTION');
        break;
      case 'SEND_SELECTED_ACTION':
        this.onlineBattleService.setOpponentSelectedAction(data);
        this.onlineBattleService.oStatus$.next('RESOLVING_TURN');
        this.gamePhaseService.revealActions();
        break;
      case 'ACKNOWLEDGE_DIALOG':
        this.onlineBattleService.oStatus$.next('ACKNOWLEDGE_DIALOG');
        break;
      case 'FINISHED_TURN':
        this.onlineBattleService.oStatus$.next('SELECTING_ACTION');
        break;
      case 'REPLAY_GAME':
        this.playerService.startOnlineGame();
        break;
      case 'TEST_GAME':
        this.gameStateService.setCpu(false);
        const selectionsA = TestOnlineUtil.getPlayerSelections([
          'DROWNIGATOR',
          'LANTERNSHADE',
          'VOLCANOGGIN',
        ]);
        const selectionsB = TestOnlineUtil.getPlayerSelections([
          'CHARGROAR',
          'STALAGROWTH',
          'SORROSPINE',
        ]);
        if (isHost) {
          this.monsterSelectionService.opponentSelections$.next(selectionsA);
          this.monsterSelectionService.selectedMonsters$.next(selectionsB);
        }
        else {
          this.monsterSelectionService.opponentSelections$.next(selectionsB);
          this.monsterSelectionService.selectedMonsters$.next(selectionsA);
          this.peerService.sendData('TEST_GAME', {  });
        }
        setTimeout(() => {
          this.router.navigate(['/online-game']);
        }, 200);
        break;
    }

    // handles all prompts
    if (type.includes('_PROMPT')) {
      this.handlePromptService.execute(type as EventCommandType, data);
    }

    console.log(`Received data from Peer A: ${type}`, data);
  }
}
