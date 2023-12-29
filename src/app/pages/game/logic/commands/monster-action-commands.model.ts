import { CardCompositeKey } from "~/app/shared/interfaces/ICompositeKey.interface";
import { UpdateGameStateService } from "../../services/update-game-state/update-game-state.service";
import { PlayerType } from "../player-type.mode";
import { CommandData, EventCommand } from "./event-command.model";

export type MONSTER_ACTION_COMMANDS =
  | 'MONSTER_ACTION'
  | 'FASTER'
  | 'SLOWER'
  | 'RESISTANT'
  | 'WEAK'
  | 'DEAL_ATTACK_DAMAGE'
  | 'KNOCKED_OUT_BY_ATTACK'
  | 'KNOCKED_OUT'
  | 'TAKE_RECOIL_DAMAGE'
  | 'RECOIL_CHECK'
  | 'APPLY_STATUS_EFFECT'
  | 'APPLY_DRAIN_STATUS'
  | 'DRAIN'
  | 'REMOVE_STATUS_EFFECT'
  | 'REMOVE_STATUS_EFFECTS'
  | 'DISABLE_ACTION_PROMPT'
  | 'DISABLE_ACTION'


export interface BasicCommandData extends CommandData {

}

export interface MonsterActionCommandData extends CommandData {
  doMonsterAction: () => void,
}

export class MonsterActionCommand extends EventCommand<MonsterActionCommandData> {
  constructor(receiver: UpdateGameStateService, data: MonsterActionCommandData) {
    super(receiver, 'MONSTER_ACTION', { ...data, display: false });
  }
  override getDisplayMessage(): string {
    return ``;
  }
}

export class FasterCommand extends EventCommand<BasicCommandData> {
  constructor(receiver: UpdateGameStateService, data: BasicCommandData) {
    super(receiver, 'FASTER', data);
  }
  override getDisplayMessage(): string {
    return `${this.data.monsterName} is faster than ${this.data.opponentMonsterName}.`;
  }
}

export class SlowerCommand extends EventCommand<BasicCommandData> {
  constructor(receiver: UpdateGameStateService, data: BasicCommandData) {
    super(receiver, 'SLOWER', data);
  }
  override getDisplayMessage(): string {
    return `${this.data.monsterName} is faster than ${this.data.opponentMonsterName}.`;
  }
}

export class ResistantCommand extends EventCommand<BasicCommandData> {
  constructor(receiver: UpdateGameStateService, data: BasicCommandData) {
    super(receiver, 'RESISTANT', data);
  }
  override getDisplayMessage(): string {
    return `${this.data.monsterName} is resistant to ${this.data.opponentMonsterName}'s attack.`;
  }
}

export class WeakCommand extends EventCommand<BasicCommandData> {
  constructor(receiver: UpdateGameStateService, data: BasicCommandData) {
    super(receiver, 'WEAK', data);
  }
  override getDisplayMessage(): string {
    return `${this.data.monsterName} is weak to ${this.data.opponentMonsterName}'s attack.`;
  }
}

export interface DealDamageCommandData extends BasicCommandData {
  damageToDeal: number,
}

export class DealAttackDamageCommand extends EventCommand<DealDamageCommandData> {
  constructor(receiver: UpdateGameStateService, data: DealDamageCommandData) {
    super(receiver, 'DEAL_ATTACK_DAMAGE', data);
  }
  override getDisplayMessage(): string {
    return `${this.data.monsterName} dealt ${this.data.damageToDeal} to ${this.data.opponentMonsterName}.`;
  }
}

export class RecoilCheckCommand extends EventCommand<BasicCommandData> {
  constructor(receiver: UpdateGameStateService, data: BasicCommandData) {
    super(receiver, 'RECOIL_CHECK', data);
  }
  override getDisplayMessage(): string {
    return ``;
  }
}
export class TakeRecoilDamageCommand extends EventCommand<DealDamageCommandData> {
  constructor(receiver: UpdateGameStateService, data: DealDamageCommandData) {
    super(receiver, 'TAKE_RECOIL_DAMAGE', data);
  }
  override getDisplayMessage(): string {
    return `${this.data.monsterName} takes ${this.data.damageToDeal} damage from recoil.`;
  }
}

export interface KnockedOutCommandData extends BasicCommandData {
  kodMonster: string;
  kodPlayer: PlayerType;
}

export class KnockedOutCommand extends EventCommand<KnockedOutCommandData> {
  constructor(receiver: UpdateGameStateService, data: KnockedOutCommandData) {
    super(receiver, 'KNOCKED_OUT', data);
  }
  override getDisplayMessage(): string {
    return `${this.data.kodMonster} was KO'd!`;
  }
}
export class KnockedOutByAttackCommand extends EventCommand<BasicCommandData> {
  constructor(receiver: UpdateGameStateService, data: BasicCommandData) {
    super(receiver, 'KNOCKED_OUT_BY_ATTACK', data);
  }
  override getDisplayMessage(): string {
    return `${this.data.opponentMonsterName} was KO'd by ${this.data.monsterName}.`;
  }
}

export interface ApplyStatusEffectCommandData extends BasicCommandData {
  statusName: 'DRAIN' | 'FATIGUE' | 'WOUND' | 'STUN';
}
export class ApplyDrainStatus extends EventCommand<BasicCommandData> {
  constructor(receiver: UpdateGameStateService, data: BasicCommandData) {
    super(receiver, 'APPLY_DRAIN_STATUS', data);
  }
  override getDisplayMessage(): string {
    return `${this.data.opponentMonsterName} became drained!`;
  }
}
export class DrainCommand extends EventCommand<BasicCommandData> {
  constructor(receiver: UpdateGameStateService, data: BasicCommandData) {
    super(receiver, 'DRAIN', data);
  }
  override getDisplayMessage(): string {
    return `1HP was drained from ${this.data.opponentMonsterName}!`;
  }
}
export class ApplyStatusCommand extends EventCommand<ApplyStatusEffectCommandData> {
  constructor(receiver: UpdateGameStateService, data: ApplyStatusEffectCommandData) {
    super(receiver, 'APPLY_STATUS_EFFECT', data);
  }
  override getDisplayMessage(): string {
    return `${this.data.monsterName} received a ${this.data.statusName.toLowerCase()} status condition.`;
  }
}
export class RemoveStatusCommand extends EventCommand<ApplyStatusEffectCommandData> {
  constructor(receiver: UpdateGameStateService, data: ApplyStatusEffectCommandData) {
    super(receiver, 'REMOVE_STATUS_EFFECT', data);
  }
  override getDisplayMessage(): string {
    return `${this.data.statusName} was removed from ${this.data.monsterName}.`;
  }
}
export class RemoveStatusEffectsCommand extends EventCommand<BasicCommandData> {
  constructor(receiver: UpdateGameStateService, data: BasicCommandData) {
    super(receiver, 'REMOVE_STATUS_EFFECTS', data);
  }
  override getDisplayMessage(): string {
    return `${this.data.monsterName} removed its status effects.`;
  }
}

export interface DisableActionPromptCommandData extends BasicCommandData {
  options: { key: CardCompositeKey, name: string }[];
  selection?: { key: CardCompositeKey, name: string };
}

export class DisableActionPromptCommand extends EventCommand<DisableActionPromptCommandData> {
  constructor(receiver: UpdateGameStateService, data: DisableActionPromptCommandData) {
    super(receiver, 'DISABLE_ACTION_PROMPT', { ...data });
  }
  override getDisplayMessage(): string {
    return `${this.data.origin ? this.data.origin + '. ' : ''}Select an opponent's monster action to disable:`;
  }
  public override requiresDecision(): boolean {
    return true;
  }
}

export interface DisableActionCommandData extends BasicCommandData {
  selection: { key: CardCompositeKey, name: string };
}

export class DisableActionCommand extends EventCommand<DisableActionCommandData> {
  constructor(receiver: UpdateGameStateService, data: DisableActionCommandData) {
    super(receiver, 'DISABLE_ACTION', { ...data });
  }
  override getDisplayMessage(): string {
    if (this.data.selection.key === 'NONE') {
      return `${this.data.monsterName} opted not to disable a monster action.`;
    }
    return `${this.data.monsterName} disabled ${this.data.opponentMonsterName}'s action ${this.data.selection.name}.`;
  }
}