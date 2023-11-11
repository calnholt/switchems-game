import { UpdateGameStateService } from "../../services/update-game-state/update-game-state.service";
import { CommandData, EventCommand } from "./event-command.model";

export type STAT_MODIFICATION_COMMANDS = 
  | 'HEAL'
  | 'MODIFY_STAT'
  | 'TRUE_DAMAGE'
  | 'APPLY_FLINCH'

export interface StatModificationData extends CommandData {
  statType: 'ATTACK' | 'DEFENSE' | 'SPEED' | 'PIERCE' | 'RECOIL';
  amount: number;
}

export class StatModificationCommand extends EventCommand<StatModificationData> {
  constructor(receiver: UpdateGameStateService, data: StatModificationData) {
    super(receiver, 'MODIFY_STAT', data);
  }
  override getDisplayMessage(): string {
    return `${this.data.monsterName} gained ${this.data.amount} ${this.data.statType}.`;
  }
}

export interface HealCommandData extends CommandData {
  amount: number;
}

export class HealCommand extends EventCommand<HealCommandData> {
  constructor(receiver: UpdateGameStateService, data: HealCommandData) {
    super(receiver, 'HEAL', data);
  }
  override getDisplayMessage(): string {
    return `${this.data.monsterName} healed ${this.data.amount} HP.`;
  }
}

export class TrueDamageCommand extends EventCommand<StatModificationData> {
  constructor(receiver: UpdateGameStateService, data: StatModificationData) {
    super(receiver, 'TRUE_DAMAGE', data);
  }
  override getDisplayMessage(): string {
    return `${this.data.monsterName} was dealt ${this.data.amount} damage.`;
  }
}

export class ApplyFlinchCommand extends EventCommand<StatModificationData> {
  constructor(receiver: UpdateGameStateService, data: StatModificationData) {
    super(receiver, 'APPLY_FLINCH', data);
  }
  override getDisplayMessage(): string {
    return `${this.data.monsterName} flinched.`;
  }
}