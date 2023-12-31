import { STAT_PIP_TYPES } from "./stat-pip-commands.model";
import { SWITCH_TYPES } from "./switch-commands.model";
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
import { STANDARD_ACTION_COMMAND_TYPES } from "./standard-action-command.model";
import { TRIGGER_TYPES } from "./trigger-command.model";
import { GameState } from "../../services/game-state/game-state.service";
import { GameStateUtil } from "../../services/game-state/game-state.util";

export abstract class EventCommand<T extends CommandData> {
  readonly receiver: UpdateGameStateService;
  readonly type: EventCommandType;
  private _data: T;
  private _triggerData!: CommandData;

  public get data() { return this._data; }
  public get triggerData() { return this._triggerData; }

  constructor(receiver: UpdateGameStateService, type: EventCommandType, data: T) {
    this.receiver = receiver; // The entity that knows how to execute the action
    this.type = type;
    this._data = data;
  }

  public setTriggerData(data: CommandData) {
    this._triggerData = data;
  }

  public enqueue() {
    this.receiver.enqueue(this);
  }

  public enqueueDecision() {
    this.receiver.enqueueDecision(this);
  }

  public pushFrontDecision() {
    this.receiver.pushFrontDecision(this);
  }

  public pushFront() {
    this.receiver.pushFront(this);
  }

  public pushFrontOrBack(isFront: boolean) {
    if (isFront) {
      this.receiver.pushFront(this);
    }
    else {
      this.receiver.enqueue(this);
    }
  }

  public execute() {
    this.receiver.execute(this);
  }

  public executeAsTrigger(type: EventCommandType) {
    this._data.parent = type;
    this.receiver.registerTrigger(type, this);
  }

  abstract getDisplayMessage(): string;

  // In the EventCommand class or its subclasses
  public requiresDecision(): boolean {
    // Implement logic to determine if this command requires a player decision
    return false; // Placeholder for actual decision requirement
  }

  protected getPlayerString(): string {
    return this.data.gs.activePlayerType === this.data.player ? 'You' : 'Opponent';
  }

  protected getActiveMonsterName() {
    const { activeMonster } = GameStateUtil.getPlayerState(this.data.gs?.getFreshGameState() as GameState, this.data.player);
    return activeMonster.name;
  }
  protected getOpposingMonsterName() {
    const { activeMonster } = GameStateUtil.getOpponentPlayerState(this.data.gs?.getFreshGameState() as GameState, this.data.player);
    return activeMonster.name;
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
  | STANDARD_ACTION_COMMAND_TYPES
  | TRIGGER_TYPES

export interface CommandData {
  key: CardCompositeKey;
  player: PlayerType; // the player who the things happens to
  targetMonster?: CardCompositeKey;
  targetPlayer?: PlayerType;
  destroyOnTrigger?: boolean; // single time trigger flag, used for buffs
  ongoing?: boolean;
  display?: boolean; // determines if we display event as a message
  origin?: string;
  parent?: EventCommandType;
  gs: GameState;
  // TODO: not optional
  activePlayerType?: PlayerType;
  removeEotTrigger?: boolean;
  updateMonsterPlayerTriggers?: boolean;
  isStatusEffect?: boolean;
  triggerCondition?: (command: EventCommand<any>, trigger: EventCommand<any>) => boolean;
  getConditionalTrigger?: (command: any) => EventCommand<any>; // updates the command data using the command that caused trigger
  removeCondition?: () => boolean;
};