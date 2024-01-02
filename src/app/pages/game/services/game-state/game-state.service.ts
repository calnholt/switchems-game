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

export interface GameState {
  p: PlayerState;
  o: PlayerState;
  rng: SeedableRngService;
  battleAniService: BattleAnimationService;
  playerService: PlayerService;
  selectedActionService: SelectedActionService;
  gameOverService: GameOverService;
  cpu: boolean;
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

  constructor(
    private playerService: PlayerService,
    private selectedActionService: SelectedActionService,
    private seedableRngService: SeedableRngService,
    private battleAniService: BattleAnimationService,
    private gameOverService: GameOverService,
  ) { }

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
      gameOverService: this.gameOverService,
      cpu: this._isCpu,
      getFreshGameState: this.getGameState,
    }
  }

}
