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
import { EventCommandType } from '../logic/commands/event-command.model';

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
        this.onlineBattleService.oStatus$.next('CONFIRMED_ACTION');
        break;
      case 'SEND_SELECTED_ACTION':
        this.onlineBattleService.setOpponentSelectedAction(data);
        this.currentPhaseService.goToNextPhase();
        this.onlineBattleService.oStatus$.next('RESOLVING_TURN');
        break;
      case 'FINISHED_TURN':
        this.onlineBattleService.oStatus$.next('SELECTING_ACTION');
        break;
    }

    // handles all prompts
    if (type.includes('_PROMPT')) {
      this.handlePromptService.execute(type as EventCommandType, data);
    }

    console.log(`Received data from Peer A: ${type}`, data);
  }
}
