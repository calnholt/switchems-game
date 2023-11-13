import { STAT_PIP_TYPES } from "./stat-pip-commands.model";
import { SWITCH_TYPES } from "./swtich-commands.model";
import { CardCompositeKey } from "~/app/shared/interfaces/ICompositeKey.interface";
import { MONSTER_ACTION_COMMANDS } from "./monster-action-commands.model";
import { STAT_MODIFICATION_COMMANDS } from "./stat-modification-command.model";
import { BUFF_COMMANDS } from "./buff-command.model";
import { HAND_COMMAND_TYPES } from "./hand-commands.model";
import { ONGOING_TURN_COMMAND_TYPES } from "./ongoing-turn-commands.model";
import { PlayerType } from "../player-type.mode";
import { UpdateGameStateService } from "../../services/update-game-state/update-game-state.service";
import { GamePhaseCommandType } from "./game-phase-commands.model";
import { MessageCommandType } from "./message-command.model";

export abstract class EventCommand<T extends CommandData> {
  readonly receiver: UpdateGameStateService;
  readonly type: EventCommandType;
  readonly data: T;
  constructor(receiver: UpdateGameStateService, type: EventCommandType, data: T) {
    this.receiver = receiver; // The entity that knows how to execute the action
    this.type = type;
    this.data = data;
  }

  public enqueue() {
    this.receiver.enqueue(this);
  }

  public execute() {
    this.receiver.execute(this);
  }

  public executeAsTrigger(type: EventCommandType) {
    this.receiver.registerTrigger(type, this);
  }

  abstract getDisplayMessage(): string;

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
  | MessageCommandType

export interface CommandData {
  monsterName?: string;
  opponentMonsterName?: string;
  key: CardCompositeKey;
  player: PlayerType;
  destroyOnTrigger?: boolean;
  ongoing?: boolean;
  display?: boolean;
  origin?: string;
};