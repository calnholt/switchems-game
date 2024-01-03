import { UpdateGameStateService } from "../../services/update-game-state/update-game-state.service";
import { PlayerType } from "../player-type.mode";
import { CommandData, EventCommand } from "./event-command.model";

export type HAND_COMMAND_TYPES = 
  | 'DRAW'
  | 'DISCARD'
  | 'RANDOM_DISCARD'

export interface HandCommandData extends CommandData {
  buffName?: string;
  amount: number;
}

export class DrawCommand extends EventCommand<HandCommandData> {
  constructor(receiver: UpdateGameStateService, data: HandCommandData) {
    super(receiver, 'DRAW', data);
  }
  override getDisplayMessage(): string {
    return `${this.getPlayerString(this.data.activePlayerType as PlayerType)} drew a card${this.data.origin ? ` from ${this.data.origin}` : ''}.`;
  }
}

export class DiscardCommand extends EventCommand<HandCommandData> {
  constructor(receiver: UpdateGameStateService, data: HandCommandData) {
    super(receiver, 'DISCARD', data);
  }
  override getDisplayMessage(): string {
    return `${this.getPlayerString(this.data.activePlayerType as PlayerType)} discarded ${this.data.buffName}.`;
  }
}

export class RandomDiscardCommand extends EventCommand<HandCommandData> {
  constructor(receiver: UpdateGameStateService, data: HandCommandData) {
    super(receiver, 'RANDOM_DISCARD', data);
  }
  override getDisplayMessage(): string {
    return `${this.getPlayerString(this.data.activePlayerType as PlayerType)} randomly discarded ${this.data.buffName}.`;
  }
}

