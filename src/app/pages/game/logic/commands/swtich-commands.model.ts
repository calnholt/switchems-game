import { UpdateGameStateService } from "../../services/update-game-state/update-game-state.service";
import { CommandData, EventCommand } from "./event-command.model";

export type SWITCH_TYPES =
  | 'SWITCH_OUT'
  | 'SWITCH_IN'
  | 'GAIN_SWITCH_DEFENSE'

export interface SwitchCommandData extends CommandData {
}

export class SwitchInCommandData extends EventCommand<SwitchCommandData> {
  constructor(data: SwitchCommandData) {
    super('SWITCH_IN', data);
  }
  override getDisplayMessage(): string {
    return `${this.data.monsterName} is switching in.`;
  }
}
export class SwitchOutCommandData extends EventCommand<SwitchCommandData> {
  constructor(data: SwitchCommandData) {
    super('SWITCH_OUT', data);
  }
  override getDisplayMessage(): string {
    return `${this.data.monsterName} is switching out.`;
  }
}

export class GainSwitchDefenseCommandData extends EventCommand<SwitchCommandData> {
  constructor(data: SwitchCommandData) {
    super('GAIN_SWITCH_DEFENSE', data);
  }
  override getDisplayMessage(): string {
    return `${this.data.monsterName} gained switch defense.`;
  }
}