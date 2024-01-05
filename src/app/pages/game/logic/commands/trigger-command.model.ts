import { UpdateGameStateService } from "../../services/update-game-state/update-game-state.service";
import { EventCommand, CommandData } from "./event-command.model";

export type TRIGGER_TYPES = 
  | 'CONDITIONAL_TRIGGER'

  export class ConditionalTriggerCommand extends EventCommand<CommandData> {
    constructor(receiver: UpdateGameStateService, data: CommandData) {
      super(receiver, 'CONDITIONAL_TRIGGER', { ...data, display: false });
    }
    override getDisplayMessage(): string {
      return ``;
    }
  }
