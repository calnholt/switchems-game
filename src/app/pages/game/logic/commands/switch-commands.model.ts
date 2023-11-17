import { UpdateGameStateService } from "../../services/update-game-state/update-game-state.service";
import { CommandData, EventCommand } from "./event-command.model";

export type SWITCH_TYPES =
  | 'SWITCH_ROUTINE'
  | 'SWITCH_OUT_PROMPT'
  | 'SWITCH_OUT'
  | 'SWITCH_IN'
  | 'GAIN_SWITCH_DEFENSE'

export interface SwitchCommandData extends CommandData {
  type?: 'HEAL' | 'REMOVE_STATUS' | 'KO';
}

export class SwitchRoutineCommand extends EventCommand<SwitchCommandData> {
  constructor(receiver: UpdateGameStateService, data: SwitchCommandData) {
    super(receiver, 'SWITCH_ROUTINE', { ...data });
  }
  override getDisplayMessage(): string {
    return ``;
  }
}
export class SwitchOutPromptCommand extends EventCommand<SwitchCommandData> {
  constructor(receiver: UpdateGameStateService, data: SwitchCommandData) {
    super(receiver, 'SWITCH_OUT_PROMPT', { ...data });
  }
  override getDisplayMessage(): string {
    return `${this.data.monsterName} is switching out.`;
  }
  public override requiresDecision(): boolean {
    return true;
  }
}
export class SwitchInCommand extends EventCommand<SwitchCommandData> {
  constructor(receiver: UpdateGameStateService, data: SwitchCommandData) {
    super(receiver, 'SWITCH_IN', data);
  }
  override getDisplayMessage(): string {
    return `${this.data.monsterName} is switching in.`;
  }
}
export class SwitchOutCommand extends EventCommand<SwitchCommandData> {
  constructor(receiver: UpdateGameStateService, data: SwitchCommandData) {
    super(receiver, 'SWITCH_OUT', data);
  }
  override getDisplayMessage(): string {
    return `${this.data.monsterName} is switching out.`;
  }
}

export class GainSwitchDefenseCommand extends EventCommand<SwitchCommandData> {
  constructor(receiver: UpdateGameStateService, data: SwitchCommandData) {
    super(receiver, 'GAIN_SWITCH_DEFENSE', data);
  }
  override getDisplayMessage(): string {
    return `${this.data.monsterName} gained switch defense.`;
  }
}