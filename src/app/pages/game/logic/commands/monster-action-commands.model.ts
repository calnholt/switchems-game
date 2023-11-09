import { EventCommandQueueService } from "~/app/pages/game/services/event-command-queue/event-command-queue.service";
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


interface BasicCommandData extends CommandData {
  monsterName?: string;
  opposingMonsterName?: string;
}

export class FasterCommand extends EventCommand<BasicCommandData> {
  constructor(receiver: EventCommandQueueService, data: BasicCommandData) {
    super(receiver, 'FASTER', data);
  }
  override getDisplayMessage(): string {
    return `${this.data.monsterName} is faster than ${this.data.opposingMonsterName}.`;
  }
}

export class SlowerCommand extends EventCommand<BasicCommandData> {
  constructor(receiver: EventCommandQueueService, data: BasicCommandData) {
    super(receiver, 'SLOWER', data);
  }
  override getDisplayMessage(): string {
    return `${this.data.monsterName} is faster than ${this.data.opposingMonsterName}.`;
  }
}

export class ResistantCommand extends EventCommand<BasicCommandData> {
  constructor(receiver: EventCommandQueueService, data: BasicCommandData) {
    super(receiver, 'RESISTANT', data);
  }
  override getDisplayMessage(): string {
    return `${this.data.monsterName} is resistant to ${this.data.opposingMonsterName}'s attack.`;
  }
}

export class WeakCommand extends EventCommand<BasicCommandData> {
  constructor(receiver: EventCommandQueueService, data: BasicCommandData) {
    super(receiver, 'WEAK', data);
  }
  override getDisplayMessage(): string {
    return `${this.data.monsterName} is weak to ${this.data.opposingMonsterName}'s attack.`;
  }
}

interface DamageDealtCommandData extends BasicCommandData {
  damageDealt: number,
}

export class DamageDealtCommand extends EventCommand<DamageDealtCommandData> {
  constructor(receiver: EventCommandQueueService, data: DamageDealtCommandData) {
    super(receiver, 'DEAL_DAMAGE', data);
  }
  override getDisplayMessage(): string {
    return `${this.data.monsterName} dealt ${this.data.damageDealt} to ${this.data.opposingMonsterName}.`;
  }
}

export class TakeRecoilDamageCommand extends EventCommand<DamageDealtCommandData> {
  constructor(receiver: EventCommandQueueService, data: DamageDealtCommandData) {
    super(receiver, 'TAKE_RECOIL_DAMAGE', data);
  }
  override getDisplayMessage(): string {
    return `${this.data.monsterName} takes ${this.data.damageDealt} from recoil.`;
  }
}

export class KnockedOutByAttackCommand extends EventCommand<BasicCommandData> {
  constructor(receiver: EventCommandQueueService, data: BasicCommandData) {
    super(receiver, 'KNOCKED_OUT_BY_ATTACK', data);
  }
  override getDisplayMessage(): string {
    return `${this.data.monsterName} was KO'd by ${this.data.opposingMonsterName}.`;
  }
}

interface ApplyStatusEffectCommandData extends BasicCommandData {
  statusName: 'drain' | 'fatigue' | 'wound' | 'stun';
}

export class ApplyStatusCommand extends EventCommand<ApplyStatusEffectCommandData> {
  constructor(receiver: EventCommandQueueService, data: ApplyStatusEffectCommandData) {
    super(receiver, 'APPLY_STATUS_EFFECT', data);
  }
  override getDisplayMessage(): string {
    return `${this.data.monsterName} received a ${this.data.statusName} status condition.`;
  }
}
export class RemoveStatusCommand extends EventCommand<ApplyStatusEffectCommandData> {
  constructor(receiver: EventCommandQueueService, data: ApplyStatusEffectCommandData) {
    super(receiver, 'REMOVE_STATUS_EFFECT', data);
  }
  override getDisplayMessage(): string {
    return `${this.data.statusName} was removed from ${this.data.monsterName}.`;
  }
}
export class DisableActionPromptCommand extends EventCommand<BasicCommandData> {
  constructor(receiver: EventCommandQueueService, data: BasicCommandData) {
    super(receiver, 'DISABLE_ACTION_PROMPT', { ...data, triggersPrompt: true });
  }
  override getDisplayMessage(): string {
    return '';
  }

  public override skipMessage(): boolean {
    return true;
  }
}