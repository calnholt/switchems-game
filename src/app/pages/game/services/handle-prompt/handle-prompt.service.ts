import { Injectable } from '@angular/core';
import { EventCommandType } from '../../logic/commands/event-command.model';
import { SwitchOutCommand } from '../../logic/commands/switch-commands.model';
import { UpdateGameStateService } from '../update-game-state/update-game-state.service';
import { UpdateGameStateUtil } from '../update-game-state/update-game-state.util';
import { GameStateService } from '../game-state/game-state.service';
import { CrushCommand } from '../../logic/commands/stat-pip-commands.model';

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
      case 'SWITCH_OUT_PROMPT':
        new SwitchOutCommand(this.uggs, { ...data, }).enqueueDecision();
        break;
      case 'KNOCKED_OUT_SWITCH_IN_PROMPT':
        UpdateGameStateUtil.switchIn(gs, { ...data }, this.uggs);
        break;
      case 'CRUSH_PROMPT':
        new CrushCommand(this.uggs, data).pushFrontDecision();
        break;
    }
  }

}
