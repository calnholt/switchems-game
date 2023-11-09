import { EventCommandQueueService } from "~/app/pages/game/services/event-command-queue/event-command-queue.service";
import { CommandData, EventCommand } from "./event-command.model";

export type SWITCH_TYPES =
  | 'SWITCH_OUT'
  | 'SWITCH_IN'

export interface SwitchCommandData extends CommandData {
  monsterName: string;
}

export class SwitchInCommandData extends EventCommand<SwitchCommandData> {
  constructor(receiver: EventCommandQueueService, data: SwitchCommandData) {
    super(receiver, 'SWITCH_IN', data);
  }
  override getDisplayMessage(): string {
    return `${this.data.monsterName} is switching in.`;
  }
}
export class SwitchOutCommandData extends EventCommand<SwitchCommandData> {
  constructor(receiver: EventCommandQueueService, data: SwitchCommandData) {
    super(receiver, 'SWITCH_OUT', data);
  }
  override getDisplayMessage(): string {
    return `${this.data.monsterName} is switching out.`;
  }
}