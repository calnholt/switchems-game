import { Injectable } from '@angular/core';
import { EventCommandType } from '../../logic/commands/event-command.model';
import { SwitchInCommand, SwitchOutCommand } from '../../logic/commands/switch-commands.model';
import { UpdateGameStateService } from '../update-game-state/update-game-state.service';
import { UpdateGameStateUtil } from '../update-game-state/update-game-state.util';
import { GameStateService } from '../game-state/game-state.service';
import { CrushCommand } from '../../logic/commands/stat-pip-commands.model';
import { GameStateUtil } from '../game-state/game-state.util';
import { MonsterAction } from '../../models/monster/monster-action.model';
import { Monster } from '../../models/monster/monster.model';
import { DisableActionCommand } from '../../logic/commands/monster-action-commands.model';

@Injectable({
  providedIn: 'root'
})
export class HandlePromptService {

  constructor(
    private uggs: UpdateGameStateService,
    private gameStateService: GameStateService,
  ) { }

  public execute(type: EventCommandType, data: any) {
    const gs = this.gameStateService.getGameState();

    switch(type) {
      case 'CRUSH_PROMPT':
        new CrushCommand(this.uggs, data).pushFrontDecision();
        break;
      case 'DISABLE_ACTION_PROMPT':
        new DisableActionCommand(this.uggs, data).pushFrontDecision();
        break;
      case 'KNOCKED_OUT_SWITCH_IN_PROMPT':
        const monsterName = (GameStateUtil.getPlayerState(gs, data.player).inactiveMonsters.find(m => m.key() === data.key) as Monster).name;
        new SwitchInCommand(this.uggs, { ...data, monsterName, isKo: true }).pushFrontDecision();
        break;
      case 'SWITCH_OUT_PROMPT':
        new SwitchOutCommand(this.uggs, { ...data, }).pushFrontDecision();
        break;
    }
  }

}
