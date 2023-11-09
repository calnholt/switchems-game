import { Injectable } from '@angular/core';
import { PlayerService } from '../player/player.service';
import { SelectedActionService } from '../selected-action/selected-action.service';
import { StatModificationService, StatModifications } from '../stat-modification/stat-modification.service';
import { Monster } from '../../models/monster/monster.model';
import { PlayerCardManager } from '../../models/player/player-card-manager.model';
import { StatBoard } from '../../models/stat-board/stat-board.model';
import { SelectedAction } from '../selected-action/selected-action.model';
import { PlayerTrackedEventsService, PlayerTrackedEventsType } from '../tracked-events/player-tracked-events.service';

export interface GameState {
  p: PlayerState;
  o: PlayerState;
}

export interface PlayerState {
  activeMonster: Monster;
  inactiveMonsters: Monster[];
  playerCardManager: PlayerCardManager;
  statBoard: StatBoard;
  selectedAction: SelectedAction;
  modifications: StatModifications;
  playerTrackedEvents: Map<PlayerTrackedEventsType, number | boolean>;
}

@Injectable({
  providedIn: 'root'
})
export class GameStateService {

  constructor(
    private playerService: PlayerService,
    private selectedActionService: SelectedActionService,
    private statModificationService: StatModificationService,
    private playerTrackedEventsService: PlayerTrackedEventsService,
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
    const {
      modifications,
      oModifications,
    } = this.statModificationService;
    const {
      playerTrackedEvents,
      oPlayerTrackedEvents
    } = this.playerTrackedEventsService;

    return {
      p: {
        activeMonster,
        selectedAction,
        inactiveMonsters,
        playerCardManager,
        statBoard,
        modifications,
        playerTrackedEvents
      },
      o: {
        activeMonster: oActiveMonster,
        selectedAction: oSelectedAction,
        inactiveMonsters: oInactiveMonsters,
        playerCardManager: oPlayerCardManager,
        statBoard: oStatBoard,
        modifications: oModifications,
        playerTrackedEvents: oPlayerTrackedEvents
      }
    }
  }

}
