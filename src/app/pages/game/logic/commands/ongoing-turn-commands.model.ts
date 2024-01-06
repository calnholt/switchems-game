import { UpdateGameStateService } from "../../services/update-game-state/update-game-state.service";
import { CommandData, EventCommand } from "./event-command.model";

export type ONGOING_TURN_COMMAND_TYPES =
  | 'PREVENT_FLINCH'
  | 'PREVENT_RECOIL'
  | 'SPEED_REVERSED'
  | 'FLINCHED'

interface OngoingTurnCommandData extends CommandData {

}

export class PreventFlinchCommand extends EventCommand<OngoingTurnCommandData> {
  constructor(receiver: UpdateGameStateService, data: OngoingTurnCommandData) {
    super(receiver, 'PREVENT_FLINCH', data);
  }
  override getDisplayMessage(): string {
    return `${this.getActiveMonsterName()} can't be flinched this turn.`;
  }
}

export class PreventRecoilCommand extends EventCommand<OngoingTurnCommandData> {
  constructor(receiver: UpdateGameStateService, data: OngoingTurnCommandData) {
    super(receiver, 'PREVENT_RECOIL', data);
  }
  override getDisplayMessage(): string {
    return `${this.getActiveMonsterName()} doesn't take damage from recoil this turn.`;
  }
}

export class SpeedReversedCommand extends EventCommand<OngoingTurnCommandData> {
  constructor(receiver: UpdateGameStateService, data: OngoingTurnCommandData) {
    super(receiver, 'SPEED_REVERSED', data);
  }
  override getDisplayMessage(): string {
    return `Speeds are reversed this turn.`;
  }
}

export class FlinchedCommand extends EventCommand<OngoingTurnCommandData> {
  constructor(receiver: UpdateGameStateService, data: OngoingTurnCommandData) {
    super(receiver, 'FLINCHED', data);
  }
  override getDisplayMessage(): string {
    return `${this.getOpposingMonsterName()} flinched!`;
  }
}