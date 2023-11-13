import { Injectable } from '@angular/core';
import { PlayerService } from '../player/player.service';
import { SelectedActionService } from '../selected-action/selected-action.service';
import { Monster } from '../../models/monster/monster.model';
import { PlayerCardManager } from '../../models/player/player-card-manager.model';
import { StatBoard } from '../../models/stat-board/stat-board.model';
import { SelectedAction } from '../selected-action/selected-action.model';
import { SeedableRngService } from '../seedable-rng/seedable-rng.service';
import { BattleAnimationService } from '../battle-animation/battle-animation.service';

export interface GameState {
  p: PlayerState;
  o: PlayerState;
  rng: SeedableRngService;
  battleAniService: BattleAnimationService;
}

export interface PlayerState {
  activeMonster: Monster;
  inactiveMonsters: Monster[];
  playerCardManager: PlayerCardManager;
  statBoard: StatBoard;
  selectedAction: SelectedAction;
}

@Injectable({
  providedIn: 'root'
})
export class GameStateService {

  constructor(
    private playerService: PlayerService,
    private selectedActionService: SelectedActionService,
    private seedableRngService: SeedableRngService,
    private battleAniService: BattleAnimationService,
  ) { }

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
      },
      o: {
        activeMonster: oActiveMonster,
        selectedAction: oSelectedAction,
        inactiveMonsters: oInactiveMonsters,
        playerCardManager: oPlayerCardManager,
        statBoard: oStatBoard,
      },
      rng: this.seedableRngService,
      battleAniService: this.battleAniService,
    }
  }

}
