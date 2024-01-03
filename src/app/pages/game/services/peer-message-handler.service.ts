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
import { CurrentPhaseService } from './current-phase/current-phase.service';
import { PeerJsService } from '~/app/shared/services/peer-js.service';

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
    private currentPhaseService: CurrentPhaseService,
    private peerService: PeerJsService,
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
        setTimeout(() => {
          this.router.navigate(['/online-game']);
        }, 100);
        break;
      case 'SUBMIT_ACTION':
        this.onlineBattleService.oConfirmed$.next(true);
        break;
      case 'SEND_SELECTED_ACTION':
        this.onlineBattleService.setOpponentSelectedAction(data);
        this.currentPhaseService.goToNextPhase();
        break;
      case 'CRUSH_PROMPT':
      case 'DISABLE_ACTION_PROMPT':
      case 'KNOCKED_OUT_SWITCH_IN_PROMPT':
      case 'SWITCH_OUT_PROMPT':
        this.handlePromptService.execute(type, data);
        break;
    }
    console.log(`Received data from Peer A: ${type}`, data);
  }
}
