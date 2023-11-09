import { EventCommandQueueService } from "~/app/pages/game/services/event-command-queue/event-command-queue.service";
import { CommandData, EventCommand } from "./event-command.model";

export type ONGOING_TURN_COMMAND_TYPES =
  | 'PREVENT_FLINCH'
  | 'PREVENT_RECOIL'
  | 'SPEED_REVERSED'

interface OngoingTurnCommandData extends CommandData {

}

export class PreventFlinchCommand extends EventCommand<OngoingTurnCommandData> {
  constructor(receiver: EventCommandQueueService, data: OngoingTurnCommandData) {
    super(receiver, 'PREVENT_FLINCH', data);
  }
  override getDisplayMessage(): string {
    return `${this.data.monsterName} can't be flinched this turn.`;
  }
}

export class PreventRecoilCommand extends EventCommand<OngoingTurnCommandData> {
  constructor(receiver: EventCommandQueueService, data: OngoingTurnCommandData) {
    super(receiver, 'PREVENT_RECOIL', data);
  }
  override getDisplayMessage(): string {
    return `${this.data.monsterName} doesn't take damage from recoil this turn.`;
  }
}

export class SpeedReversedCommand extends EventCommand<OngoingTurnCommandData> {
  constructor(receiver: EventCommandQueueService, data: OngoingTurnCommandData) {
    super(receiver, 'SPEED_REVERSED', data);
  }
  override getDisplayMessage(): string {
    return `Speeds are reversed this turn.`;
  }
}