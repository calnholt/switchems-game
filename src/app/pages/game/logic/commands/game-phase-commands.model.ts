import { UpdateGameStateService } from "../../services/update-game-state/update-game-state.service";
import { CommandData, EventCommand } from "./event-command.model";

export type GamePhaseCommandType = 
  | 'START_PHASE'
  | 'SELECTION_PHASE'
  | 'REVEAL_PHASE'
  | 'APPLY_PIPS_PHASE'
  | 'APPLY_BUFFS_PHASE'
  | 'SWITCH_ACTIONS_PHASE'
  | 'MONSTER_ACTIONS_PHASE'
  | 'STANDARD_ACTIONS_PHASE'
  | 'END_PHASE'

export interface GamePhaseCommandData extends CommandData {

}

export class StartGamePhaseCommand extends EventCommand<GamePhaseCommandData> {
  constructor(receiver: UpdateGameStateService, data: GamePhaseCommandData) {
    super(receiver, 'START_PHASE', data);
  }
  override getDisplayMessage(): string {
    return ``;
  }
  public override skipMessage(): boolean {
    return true;
  }
}

export class SelectionGamePhaseCommand extends EventCommand<GamePhaseCommandData> {
  constructor(receiver: UpdateGameStateService, data: GamePhaseCommandData) {
    super(receiver, 'SELECTION_PHASE', data);
  }
  override getDisplayMessage(): string {
    return ``;
  }
  public override skipMessage(): boolean {
    return true;
  }
}
export class RevealGamePhaseCommand extends EventCommand<GamePhaseCommandData> {
  constructor(receiver: UpdateGameStateService, data: GamePhaseCommandData) {
    super(receiver, 'REVEAL_PHASE', data);
  }
  override getDisplayMessage(): string {
    return ``;
  }
  public override skipMessage(): boolean {
    return true;
  }
}
export class ApplyPipsGamePhaseCommand extends EventCommand<GamePhaseCommandData> {
  constructor(receiver: UpdateGameStateService, data: GamePhaseCommandData) {
    super(receiver, 'APPLY_PIPS_PHASE', data);
  }
  override getDisplayMessage(): string {
    return ``;
  }
  public override skipMessage(): boolean {
    return true;
  }
}
export class ApplyBuffsGamePhaseCommand extends EventCommand<GamePhaseCommandData> {
  constructor(receiver: UpdateGameStateService, data: GamePhaseCommandData) {
    super(receiver, 'APPLY_BUFFS_PHASE', data);
  }
  override getDisplayMessage(): string {
    return ``;
  }
  public override skipMessage(): boolean {
    return true;
  }
}
export class SwitchActionsGamePhaseCommand extends EventCommand<GamePhaseCommandData> {
  constructor(receiver: UpdateGameStateService, data: GamePhaseCommandData) {
    super(receiver, 'SWITCH_ACTIONS_PHASE', data);
  }
  override getDisplayMessage(): string {
    return ``;
  }
  public override skipMessage(): boolean {
    return true;
  }
}
export class MonsterActionsGamePhaseCommand extends EventCommand<GamePhaseCommandData> {
  constructor(receiver: UpdateGameStateService, data: GamePhaseCommandData) {
    super(receiver, 'MONSTER_ACTIONS_PHASE', data);
  }
  override getDisplayMessage(): string {
    return ``;
  }
  public override skipMessage(): boolean {
    return true;
  }
}
export class StandardActionsGamePhaseCommand extends EventCommand<GamePhaseCommandData> {
  constructor(receiver: UpdateGameStateService, data: GamePhaseCommandData) {
    super(receiver, 'STANDARD_ACTIONS_PHASE', data);
  }
  override getDisplayMessage(): string {
    return ``;
  }
  public override skipMessage(): boolean {
    return true;
  }
}
export class EndGamePhaseCommand extends EventCommand<GamePhaseCommandData> {
  constructor(receiver: UpdateGameStateService, data: GamePhaseCommandData) {
    super(receiver, 'END_PHASE', data);
  }
  override getDisplayMessage(): string {
    return ``;
  }
  public override skipMessage(): boolean {
    return true;
  }
}
