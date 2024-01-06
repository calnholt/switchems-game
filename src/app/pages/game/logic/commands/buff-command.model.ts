import { UpdateGameStateService } from "../../services/update-game-state/update-game-state.service";
import { CommandData, EventCommand } from "./event-command.model";

export type BUFF_COMMANDS = 
  | 'BUFF'
  | 'APPLY_BUFF'
  | 'APPLY_BUFF_BELONGS'
  | 'FLIP_BELONGS'
  | 'DRAW_FROM_ICON'

export interface BuffCommandData extends CommandData {
  buffName?: string;
  doBuff?: () => void;
}

// wrapper for buff effect from card
export class BuffCommand extends EventCommand<BuffCommandData> {
  constructor(receiver: UpdateGameStateService, data: BuffCommandData) {
    super(receiver, 'BUFF', data);
  }
  override getDisplayMessage(): string {
    return ``;
  }
}

// emits that a slot has been used; for triggers
export class ApplyBuffCommand extends EventCommand<BuffCommandData> {
  constructor(receiver: UpdateGameStateService, data: BuffCommandData) {
    super(receiver, 'APPLY_BUFF', data);
  }
  override getDisplayMessage(): string {
    return `${this.getActiveMonsterName()} was buffed with ${this.data.buffName}.`;
  }
}

// emits that a belongs buff slots has been used; for triggers
export class ApplyBuffBelongsCommand extends EventCommand<BuffCommandData> {
  constructor(receiver: UpdateGameStateService, data: BuffCommandData) {
    super(receiver, 'APPLY_BUFF_BELONGS', data);
  }
  override getDisplayMessage(): string {
    return `${this.getActiveMonsterName()} applied a buff that belongs to it.`;
  }
}

export class FlipBelongsCommand extends EventCommand<BuffCommandData> {
  constructor(receiver: UpdateGameStateService, data: BuffCommandData) {
    super(receiver, 'FLIP_BELONGS', data);
  }
  override getDisplayMessage(): string {
    return `The flipped card belongs to ${this.getActiveMonsterName()}.`;
  }
}