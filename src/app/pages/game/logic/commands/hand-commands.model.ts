import { UpdateGameStateService } from "../../services/update-game-state/update-game-state.service";
import { CommandData, EventCommand } from "./event-command.model";

export type HAND_COMMAND_TYPES = 
  | 'DRAW'
  | 'DISCARD'
  | 'RANDOM_DISCARD'

export interface HandCommandData extends CommandData {
  buffName?: string;
}

export class DrawCommand extends EventCommand<HandCommandData> {
  constructor(data: HandCommandData) {
    super('DRAW', data);
  }
  override getDisplayMessage(): string {
    return `${this.getPlayerString()} drew a card.`;
  }
  override skipMessage(): boolean {
    return !!this.data.skipMessage;
  }
}

export class DiscardCommand extends EventCommand<HandCommandData> {
  constructor(data: HandCommandData) {
    super('DISCARD', data);
  }
  override getDisplayMessage(): string {
    return `${this.getPlayerString()} discarded ${this.data.buffName}.`;
  }
}

export class RandomDiscardCommand extends EventCommand<HandCommandData> {
  constructor(data: HandCommandData) {
    super('RANDOM_DISCARD', data);
  }
  override getDisplayMessage(): string {
    return `${this.getPlayerString()} randomly discarded ${this.data.buffName}.`;
  }
}

