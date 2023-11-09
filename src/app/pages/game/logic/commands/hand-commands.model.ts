import { EventCommandQueueService } from "~/app/pages/game/services/event-command-queue/event-command-queue.service";
import { CommandData, EventCommand } from "./event-command.model";

export type HAND_COMMAND_TYPES = 
  | 'DRAW'
  | 'DISCARD'
  | 'RANDOM_DISCARD'

interface HandCommandData extends CommandData {
  skipMessage?: boolean;
  buffName?: string;
}

export class DrawCommand extends EventCommand<HandCommandData> {
  constructor(receiver: EventCommandQueueService, data: HandCommandData) {
    super(receiver, 'DRAW', data);
  }
  override getDisplayMessage(): string {
    return `${this.getPlayerString()} drew a card.`;
  }
  override skipMessage(): boolean {
    return !!this.data.skipMessage;
  }
}

export class DiscardCommand extends EventCommand<HandCommandData> {
  constructor(receiver: EventCommandQueueService, data: HandCommandData) {
    super(receiver, 'DISCARD', data);
  }
  override getDisplayMessage(): string {
    return `${this.getPlayerString()} discarded ${this.data.buffName}.`;
  }
}

export class RandomDiscardCommand extends EventCommand<HandCommandData> {
  constructor(receiver: EventCommandQueueService, data: HandCommandData) {
    super(receiver, 'RANDOM_DISCARD', data);
  }
  override getDisplayMessage(): string {
    return `${this.getPlayerString()} randomly discarded ${this.data.buffName}.`;
  }
}

