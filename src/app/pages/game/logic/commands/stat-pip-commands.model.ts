import { CommandData, EventCommand } from "./event-command.model";
import { UpdateGameStateService } from "../../services/update-game-state/update-game-state.service";

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
  constructor(data: StatPipCommandData) {
    super('GAIN_STAT_PIP', data);
  }
  override getDisplayMessage(): string {
    return `${this.data.monsterName} ${this.data.wasRandom ? 'randomly ' : ''}gained ${this.data.amount} ${this.data.statType.toLowerCase()} pip${this.data.amount > 2 ? 's' : ''}.`;
  }
  override skipMessage(): boolean { return false; }
}

export interface GainRandomStatPipCommandData extends CommandData {
  amount: number,
}

export class GainRandomStatPipCommand extends EventCommand<GainRandomStatPipCommandData> {
  constructor(data: GainRandomStatPipCommandData) {
    super('GAIN_RANDOM_STAT_PIP', data);
  }
  override getDisplayMessage(): string {
    return ``;
  }
  public override skipMessage(): boolean {
    return true;
  }
}

export class CrushStatPipCommand extends EventCommand<StatPipCommandData> {
  constructor(data: StatPipCommandData) {
    super('CRUSH_STAT_PIP', data);
  }
  override getDisplayMessage(): string {
    return `${this.getPlayerString()} crushed ${this.data.amount} ${this.data.statType.toLowerCase()} pips.`;
  }
}

export class ApplyStatPipsCommand extends EventCommand<StatPipCommandData> {
  constructor(data: StatPipCommandData) {
    super('APPLY_STAT_PIPS', data);
  }
  override getDisplayMessage(): string {
    return `${this.getPlayerString()} applied ${this.data.amount} ${this.data.statType.toLowerCase()} pips.`;
  }
}

export class DiscardPipsCommand extends EventCommand<StatPipCommandData> {
  constructor(data: StatPipCommandData) {
    super('DISCARD_PIPS', data);
  }
  override getDisplayMessage(): string {
    return `${this.getPlayerString()} discarded ${this.data.amount} ${this.data.statType.toLowerCase()} pips.`;
  }
}