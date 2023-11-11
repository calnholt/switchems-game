import { STAT_PIP_TYPES } from "./stat-pip-commands.model";
import { SWITCH_TYPES } from "./swtich-commands.model";
import { CardCompositeKey } from "~/app/shared/interfaces/ICompositeKey.interface";
import { MONSTER_ACTION_COMMANDS } from "./monster-action-commands.model";
import { STAT_MODIFICATION_COMMANDS } from "./stat-modification-command.model";
import { BUFF_COMMANDS } from "./buff-command.model";
import { HAND_COMMAND_TYPES } from "./hand-commands.model";
import { ONGOING_TURN_COMMAND_TYPES } from "./ongoing-turn-commands.model";
import { PlayerType } from "../player-type.mode";
import { GamePhaseCommandType } from "./game-phase-commands.model";

export abstract class EventCommand<T extends CommandData> {
  readonly type: EventCommandType;
  readonly data: T;
  constructor(type: EventCommandType, data: T) {
    this.type = type;
    this.data = data;
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
  | GamePhaseCommandType

export interface CommandData {
  monsterName?: string;
  key: CardCompositeKey;
  player: PlayerType;
  destroyOnTrigger?: boolean;
  ongoing?: boolean;
  skipMessage?: boolean;
};