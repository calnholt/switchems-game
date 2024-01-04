import { Injectable } from '@angular/core';
import { PlayerService } from '../player/player.service';
import { SelectedActionService } from '../selected-action/selected-action.service';
import { Monster } from '../../models/monster/monster.model';
import { PlayerCardManager } from '../../models/player/player-card-manager.model';
import { StatBoard } from '../../models/stat-board/stat-board.model';
import { SelectedAction } from '../selected-action/selected-action.model';
import { SeedableRngService } from '../seedable-rng/seedable-rng.service';
import { BattleAnimationService } from '../battle-animation/battle-animation.service';
import { Player } from '../../models/player/player.model';
import { MonsterAction } from '../../models/monster/monster-action.model';
import { GameOverService } from '../game-over/game-over.service';
import { PlayerType } from '../../logic/player-type.mode';
import { PlayerProfileService } from '~/app/shared/services/player-profile.service';
import { GameStateUtil } from './game-state.util';
import { CurrentPhaseService } from '../current-phase/current-phase.service';
import { PeerJsService } from '~/app/shared/services/peer-js.service';

export interface GameState {
  p: PlayerState;
  o: PlayerState;
  rng: SeedableRngService;
  battleAniService: BattleAnimationService;
  playerService: PlayerService;
  selectedActionService: SelectedActionService;
  currentPhaseService: CurrentPhaseService;
  gameOverService: GameOverService;
  cpu: boolean;
  activePlayerType: PlayerType;
  opponentPlayerType: PlayerType;
  getFreshGameState: () => GameState;
}

export interface PlayerState {
  activeMonster: Monster;
  inactiveMonsters: Monster[];
  playerCardManager: PlayerCardManager;
  statBoard: StatBoard;
  selectedAction: SelectedAction;
  player: Player;
  monsterAction?: MonsterAction;
}

@Injectable({
  providedIn: 'root'
})
export class GameStateService {

  private _isCpu: boolean = true;
  private activePlayerType!: PlayerType;

  public get isCpu() { return this._isCpu; }

  constructor(
    private playerService: PlayerService,
    private selectedActionService: SelectedActionService,
    private seedableRngService: SeedableRngService,
    private battleAniService: BattleAnimationService,
    private gameOverService: GameOverService,
    private playerProfileService: PlayerProfileService,
    private currentPhaseService: CurrentPhaseService,
    private peerService: PeerJsService,
  ) {
    this.playerProfileService.profile$.subscribe((value) => {
      this.activePlayerType = value.playerType;
    })
  }

  public setCpu(value: boolean) {
    this._isCpu = value;
  }

  public getGameState(): GameState {
    const { 
      activeMonster, 
      oActiveMonster, 
      inactiveMonsters, 
      oInactiveMonsters, 
      playerCardManager,
      oPlayerCardManager,
      statBoard,
      oStatBoard,
      player,
      oPlayer
    } = this.playerService;
    const {
      selectedAction, 
      oSelectedAction,
    } = this.selectedActionService;
    return {
      p: {
        activeMonster,
        selectedAction,
        inactiveMonsters,
        playerCardManager,
        statBoard,
        player,
        monsterAction: activeMonster.actions.find(a => a.key() === selectedAction.action.key())
      },
      o: {
        activeMonster: oActiveMonster,
        selectedAction: oSelectedAction,
        inactiveMonsters: oInactiveMonsters,
        playerCardManager: oPlayerCardManager,
        statBoard: oStatBoard,
        player: oPlayer,
        monsterAction: oActiveMonster.actions.find(a => a.key() === selectedAction.action.key())
      },
      rng: this.seedableRngService,
      battleAniService: this.battleAniService,
      playerService: this.playerService,
      selectedActionService: this.selectedActionService,
      currentPhaseService: this.currentPhaseService,
      gameOverService: this.gameOverService,
      cpu: this._isCpu,
      activePlayerType: this.activePlayerType,
      opponentPlayerType: GameStateUtil.getOppositePlayer(this.activePlayerType),
      getFreshGameState: this.getGameState,
    }
  }

}
