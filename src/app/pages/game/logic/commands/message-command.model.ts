import { UpdateGameStateService } from "../../services/update-game-state/update-game-state.service";
import { CommandData, EventCommand } from "./event-command.model";

export type MessageCommandType = 
  | 'DESCRIPTIVE'

  export interface MessageData extends CommandData {
    message: string;
  }

  export class DescriptiveMessageCommand extends EventCommand<MessageData> {
    constructor(receiver: UpdateGameStateService, data: MessageData) {
      super(receiver, 'DESCRIPTIVE', { ...data, display: true});
    }
    override getDisplayMessage(): string {
      return this.data.message;
    }
  }