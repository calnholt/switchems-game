import { UpdateGameStateService } from "../../services/update-game-state/update-game-state.service";
import { CommandData, EventCommand } from "./event-command.model";

export type STANDARD_ACTION_COMMAND_TYPES = 
  | 'STANDARD_ACTION'

export interface StandardActionCommandData extends CommandData {
  doStandardAction: () => void;
}

export class StandardActionCommand extends EventCommand<StandardActionCommandData> {
  constructor(receiver: UpdateGameStateService, data: StandardActionCommandData) {
    super(receiver, 'STANDARD_ACTION', data);
  }
  override getDisplayMessage(): string {
    return ``;
  }
}
