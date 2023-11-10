import { EventCommandQueueService } from "~/app/pages/game/services/event-command-queue/event-command-queue.service";
import { STAT_PIP_TYPES } from "./stat-pip-commands.model";
import { SWITCH_TYPES } from "./swtich-commands.model";
import { CardCompositeKey } from "~/app/shared/interfaces/ICompositeKey.interface";
import { MONSTER_ACTION_COMMANDS } from "./monster-action-commands.model";
import { STAT_MODIFICATION_COMMANDS } from "./stat-modification-command.model";
import { BUFF_COMMANDS } from "./buff-command.model";
import { HAND_COMMAND_TYPES } from "./hand-commands.model";
import { ONGOING_TURN_COMMAND_TYPES } from "./ongoing-turn-commands.model";
import { PlayerType } from "../player-type.mode";

export abstract class EventCommand<T extends CommandData> {
  readonly receiver: EventCommandQueueService;
  readonly type: EventCommandType;
  readonly data: T;
  constructor(receiver: EventCommandQueueService, type: EventCommandType, data: T) {
    this.receiver = receiver; // The entity that knows how to execute the action
    this.type = type;
    this.data = data;
  }

  public execute() {
    this.receiver.enqueue(this);
    this.receiver.fireTriggers(this.type);
  }

  public executeAsTrigger(type: EventCommandType) {
    this.receiver.registerTrigger(type, this);
  }

  abstract getDisplayMessage(): string;

  public skipMessage(): boolean {
    return false;
  }

  // In the EventCommand class or its subclasses
  public requiresDecision(): boolean {
    // Implement logic to determine if this command requires a player decision
    return false; // Placeholder for actual decision requirement
  }

  protected getPlayerString(): string {
    return this.data.player === 'P' ? 'You' : 'Opponent';
  }
}

// union all command types so they can be a little more modular
export type EventCommandType =
  | STAT_PIP_TYPES
  | SWITCH_TYPES
  | MONSTER_ACTION_COMMANDS
  | STAT_MODIFICATION_COMMANDS
  | BUFF_COMMANDS
  | HAND_COMMAND_TYPES
  | ONGOING_TURN_COMMAND_TYPES

export interface CommandData {
  monsterName?: string;
  key: CardCompositeKey;
  player: PlayerType;
  destroyOnTrigger?: boolean;
  triggersPrompt?: boolean;
  skipMessage?: boolean;
};