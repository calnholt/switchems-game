import { UpdateGameStateService } from "../../services/update-game-state/update-game-state.service";
import { CommandData, EventCommand } from "./event-command.model";
import { BasicCommandData } from "./monster-action-commands.model";

export type MessageCommandType = 
  | 'DESCRIPTIVE'
  | 'WAITING_FOR_OPPONENT'

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

  export class WaitingForOpponentCommand extends EventCommand<BasicCommandData> {
    constructor(receiver: UpdateGameStateService, data: BasicCommandData) {
      super(receiver, 'WAITING_FOR_OPPONENT', { ...data, display: true});
    }
    override getDisplayMessage(): string {
      return `Waiting for opponent to make a decision...`;
    }
  }