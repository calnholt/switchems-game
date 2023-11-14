import { Injectable } from '@angular/core';
import { EventCommandType } from '../../logic/commands/event-command.model';
import { SwitchOutCommand } from '../../logic/commands/switch-commands.model';
import { UpdateGameStateService } from '../update-game-state/update-game-state.service';

@Injectable({
  providedIn: 'root'
})
export class HandlePromptService {

  constructor(
    private uggs: UpdateGameStateService,
  ) { }

  public execute(type: EventCommandType, data: any) {
    switch(type) {
      case 'SWITCH_OUT_PROMPT':
        new SwitchOutCommand(this.uggs, { ...data, }).enqueueDecision();
        break;
    }
  }

}
