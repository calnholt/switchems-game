import { EventCommandQueueService } from "~/app/pages/game/services/event-command-queue/event-command-queue.service";
import { CommandData, EventCommand } from "./event-command.model";

export type BUFF_COMMANDS = 
  | 'APPLY_BUFF'
  | 'APPLY_BUFF_BELONGS'
  | 'FLIP_BELONGS'
  | 'DRAW_FROM_ICON'

interface BuffCommandData extends CommandData {
  buffName: string;
}

export class ApplyBuffCommand extends EventCommand<BuffCommandData> {
  constructor(receiver: EventCommandQueueService, data: BuffCommandData) {
    super(receiver, 'APPLY_BUFF', data);
  }
  override getDisplayMessage(): string {
    return `${this.data.monsterName} was buffed with ${this.data.buffName}.`;
  }
}

export class ApplyBuffBelongsCommand extends EventCommand<BuffCommandData> {
  constructor(receiver: EventCommandQueueService, data: BuffCommandData) {
    super(receiver, 'APPLY_BUFF_BELONGS', data);
  }
  public override skipMessage(): boolean {
    return true;
  }
  override getDisplayMessage(): string {
    return `${this.data.monsterName} applied a buff that belongs to it.`;
  }
}

export class FlipBelongsCommand extends EventCommand<BuffCommandData> {
  constructor(receiver: EventCommandQueueService, data: BuffCommandData) {
    super(receiver, 'FLIP_BELONGS', data);
  }
  override getDisplayMessage(): string {
    return `The flipped card belongs to ${this.data.monsterName}.`;
  }
}