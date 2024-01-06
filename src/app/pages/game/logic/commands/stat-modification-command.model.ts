import { AbilityTextUtil } from "~/app/shared/utils/ability-text.util";
import { UpdateGameStateService } from "../../services/update-game-state/update-game-state.service";
import { CommandData, EventCommand } from "./event-command.model";

export type STAT_MODIFICATION_COMMANDS = 
  | 'HEAL'
  | 'MODIFY_STAT'
  | 'TRUE_DAMAGE'
  | 'APPLY_FLINCH'

export interface StatModificationData extends CommandData {
  statType: 'ATTACK' | 'DEFENSE' | 'SPEED' | 'PIERCE' | 'RECOIL' | 'SWITCH_IN_DEFENSE';
  amount: number;
  isStatusEffect?: boolean;
}

export class StatModificationCommand extends EventCommand<StatModificationData> {
  constructor(receiver: UpdateGameStateService, data: StatModificationData) {
    super(receiver, 'MODIFY_STAT', data);
  }
  override getDisplayMessage(): string {
    return `${this.getActiveMonsterName()} gained ${this.data.amount} ${AbilityTextUtil.getIconText(this.data.statType)} from ${this.data.origin}.`;
  }
}

export interface HealCommandData extends CommandData {
  amount: number;
  skip?: boolean;
}

export class HealCommand extends EventCommand<HealCommandData> {
  constructor(receiver: UpdateGameStateService, data: HealCommandData) {
    super(receiver, 'HEAL', { ...data, display: false });
  }
  override getDisplayMessage(): string {
    return `${this.getActiveMonsterName()} healed ${this.data.amount}[HP]${this.data.origin ? ` from ${this.data.origin}` : ''}.`;
  }
}

export class TrueDamageCommand extends EventCommand<StatModificationData> {
  constructor(receiver: UpdateGameStateService, data: StatModificationData) {
    super(receiver, 'TRUE_DAMAGE', data);
  }
  override getDisplayMessage(): string {
    return `${this.getActiveMonsterName()} was dealt ${this.data.amount} damage.`;
  }
}

export class ApplyFlinchCommand extends EventCommand<CommandData> {
  constructor(receiver: UpdateGameStateService, data: CommandData) {
    super(receiver, 'APPLY_FLINCH', data);
  }
  override getDisplayMessage(): string {
    return `${this.getActiveMonsterName()} gained flinch!`;
  }
}
