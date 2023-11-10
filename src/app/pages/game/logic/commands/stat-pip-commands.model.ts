import { StatBoardSectionType } from "~/app/pages/game/models/stat-board/stat-board.model";
import { CommandData, EventCommand } from "./event-command.model";
import { EventCommandQueueService } from "~/app/pages/game/services/event-command-queue/event-command-queue.service";

export type STAT_PIP_TYPES = 
  | 'GAIN_RANDOM_STAT_PIP' 
  | 'GAIN_STAT_PIP' 
  | 'CRUSH_STAT_PIP'
  | 'APPLY_STAT_PIPS'
  | 'DISCARD_PIPS'

export interface StatPipCommandData extends CommandData {
  statType: "SPEED" | "ATTACK" | "DEFENSE";
  wasRandom?: boolean;
  amount: number,
}

export class GainStatPipCommand extends EventCommand<StatPipCommandData> {
  constructor(receiver: EventCommandQueueService, data: StatPipCommandData) {
    super(receiver, 'GAIN_STAT_PIP', data);
  }
  override getDisplayMessage(): string {
    return ``;
  }
  override skipMessage(): boolean { return true; }
}

export interface GainRandomStatPipCommandData extends CommandData {
  amount: number,
}

export class GainRandomStatPipCommand extends EventCommand<GainRandomStatPipCommandData> {
  constructor(receiver: EventCommandQueueService, data: GainRandomStatPipCommandData) {
    super(receiver, 'GAIN_RANDOM_STAT_PIP', data);
  }
  override getDisplayMessage(): string {
    return ``;
  }
  public override skipMessage(): boolean {
    return true;
  }
}

export class CrushStatPipCommand extends EventCommand<StatPipCommandData> {
  constructor(receiver: EventCommandQueueService, data: StatPipCommandData) {
    super(receiver, 'CRUSH_STAT_PIP', data);
  }
  override getDisplayMessage(): string {
    return `${this.getPlayerString()} crushed ${this.data.amount} ${this.data.statType.toLowerCase()} pips.`;
  }
}

export class ApplyStatPipsCommand extends EventCommand<StatPipCommandData> {
  constructor(receiver: EventCommandQueueService, data: StatPipCommandData) {
    super(receiver, 'APPLY_STAT_PIPS', data);
  }
  override getDisplayMessage(): string {
    return `${this.getPlayerString()} applied ${this.data.amount} ${this.data.statType.toLowerCase()} pips.`;
  }
}

export class DiscardPipsCommand extends EventCommand<StatPipCommandData> {
  constructor(receiver: EventCommandQueueService, data: StatPipCommandData) {
    super(receiver, 'DISCARD_PIPS', data);
  }
  override getDisplayMessage(): string {
    return `${this.getPlayerString()} discarded ${this.data.amount} ${this.data.statType.toLowerCase()} pips.`;
  }
}