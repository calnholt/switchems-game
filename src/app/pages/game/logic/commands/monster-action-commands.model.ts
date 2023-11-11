import { UpdateGameStateService } from "../../services/update-game-state/update-game-state.service";
import { CommandData, EventCommand } from "./event-command.model";

export type MONSTER_ACTION_COMMANDS =
  | 'FASTER'
  | 'SLOWER'
  | 'RESISTANT'
  | 'WEAK'
  | 'DEAL_DAMAGE'
  | 'KNOCKED_OUT_BY_ATTACK'
  | 'TAKE_RECOIL_DAMAGE'
  | 'APPLY_STATUS_EFFECT'
  | 'REMOVE_STATUS_EFFECT'
  | 'DISABLE_ACTION_PROMPT'


export interface BasicCommandData extends CommandData {
  opposingMonsterName?: string;
}

export class FasterCommand extends EventCommand<BasicCommandData> {
  constructor(data: BasicCommandData) {
    super('FASTER', data);
  }
  override getDisplayMessage(): string {
    return `${this.data.monsterName} is faster than ${this.data.opposingMonsterName}.`;
  }
}

export class SlowerCommand extends EventCommand<BasicCommandData> {
  constructor(data: BasicCommandData) {
    super('SLOWER', data);
  }
  override getDisplayMessage(): string {
    return `${this.data.monsterName} is faster than ${this.data.opposingMonsterName}.`;
  }
}

export class ResistantCommand extends EventCommand<BasicCommandData> {
  constructor(data: BasicCommandData) {
    super('RESISTANT', data);
  }
  override getDisplayMessage(): string {
    return `${this.data.monsterName} is resistant to ${this.data.opposingMonsterName}'s attack.`;
  }
}

export class WeakCommand extends EventCommand<BasicCommandData> {
  constructor(data: BasicCommandData) {
    super('WEAK', data);
  }
  override getDisplayMessage(): string {
    return `${this.data.monsterName} is weak to ${this.data.opposingMonsterName}'s attack.`;
  }
}

export interface DealDamageCommandData extends BasicCommandData {
  damageToDeal: number,
}

export class DealDamageCommand extends EventCommand<DealDamageCommandData> {
  constructor(data: DealDamageCommandData) {
    super('DEAL_DAMAGE', data);
  }
  override getDisplayMessage(): string {
    return `${this.data.monsterName} dealt ${this.data.damageToDeal} to ${this.data.opposingMonsterName}.`;
  }
}

export class TakeRecoilDamageCommand extends EventCommand<DealDamageCommandData> {
  constructor(data: DealDamageCommandData) {
    super('TAKE_RECOIL_DAMAGE', data);
  }
  override getDisplayMessage(): string {
    return `${this.data.monsterName} takes ${this.data.damageToDeal} from recoil.`;
  }
}

export class KnockedOutByAttackCommand extends EventCommand<BasicCommandData> {
  constructor(data: BasicCommandData) {
    super('KNOCKED_OUT_BY_ATTACK', data);
  }
  override getDisplayMessage(): string {
    return `${this.data.monsterName} was KO'd by ${this.data.opposingMonsterName}.`;
  }
}

export interface ApplyStatusEffectCommandData extends BasicCommandData {
  statusName: 'DRAIN' | 'FATIGUE' | 'WOUND' | 'STUN';
}

export class ApplyStatusCommand extends EventCommand<ApplyStatusEffectCommandData> {
  constructor(data: ApplyStatusEffectCommandData) {
    super('APPLY_STATUS_EFFECT', data);
  }
  override getDisplayMessage(): string {
    return `${this.data.monsterName} received a ${this.data.statusName.toLowerCase()} status condition.`;
  }
}
export class RemoveStatusCommand extends EventCommand<ApplyStatusEffectCommandData> {
  constructor(data: ApplyStatusEffectCommandData) {
    super('REMOVE_STATUS_EFFECT', data);
  }
  override getDisplayMessage(): string {
    return `${this.data.statusName} was removed from ${this.data.monsterName}.`;
  }
}
export class DisableActionPromptCommand extends EventCommand<BasicCommandData> {
  constructor(data: BasicCommandData) {
    super('DISABLE_ACTION_PROMPT', { ...data });
  }
  override getDisplayMessage(): string {
    return '';
  }

  public override skipMessage(): boolean {
    return true;
  }
}