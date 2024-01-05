import { CommandData, EventCommand } from "./event-command.model";
import { UpdateGameStateService } from "../../services/update-game-state/update-game-state.service";
import { StatBoardSectionType } from "../../models/stat-board/stat-board.model";
import { PlayerType } from "../player-type.mode";
import { AbilityTextUtil } from "~/app/shared/utils/ability-text.util";

export type STAT_PIP_TYPES = 
  | 'GAIN_RANDOM_STAT_PIP' 
  | 'GAIN_STAT_PIP' 
  | 'CRUSH_PROMPT'
  | 'CRUSH'
  | 'APPLY_STAT_PIPS'
  | 'DISCARD_PIPS'

export interface StatPipCommandData extends CommandData {
  statType: StatBoardSectionType;
  wasRandom?: boolean;
  amount: number,
}

export class GainStatPipCommand extends EventCommand<StatPipCommandData> {
  constructor(receiver: UpdateGameStateService, data: StatPipCommandData) {
    super(receiver, 'GAIN_STAT_PIP', data);
  }
  override getDisplayMessage(): string {
    return `${this.data.monsterName} ${this.data.wasRandom ? 'randomly ' : ''}gained ${this.data.amount} ${AbilityTextUtil.getIconText(this.data.statType)} Pip${this.data.amount > 1 ? 's' : ''}${this.data.origin ? ` from ${this.data.origin}` : ''}.`;
  }
}

export interface GainRandomStatPipCommandData extends CommandData {
  amount: number,
  superEffective?: boolean;
  displayRandomPipGain?: boolean;
}

export class GainRandomStatPipCommand extends EventCommand<GainRandomStatPipCommandData> {
  constructor(receiver: UpdateGameStateService, data: GainRandomStatPipCommandData) {
    super(receiver, 'GAIN_RANDOM_STAT_PIP', { ...data, display: false, });
  }
  override getDisplayMessage(): string {
    return ``;
  }
}
export interface CrushPromptCommandData extends CommandData {
  total: number,
}
export interface CrushCommandData extends CommandData {
  selections: { statType: StatBoardSectionType, amount: number }[],
}

export class CrushPromptCommand extends EventCommand<CrushPromptCommandData> {
  constructor(receiver: UpdateGameStateService, data: CrushPromptCommandData) {
    super(receiver, 'CRUSH_PROMPT', data);
  }
  override getDisplayMessage(): string {
    return ``;
  }
  public override requiresDecision(): boolean {
    return true;
  }
}
export class CrushCommand extends EventCommand<CrushCommandData> {
  constructor(receiver: UpdateGameStateService, data: CrushCommandData) {
    super(receiver, 'CRUSH', data);
  }
  override getDisplayMessage(): string {
    return `${this.data.monsterName} crushed ${this.data.selections.map(s => `${s.amount} ${AbilityTextUtil.getIconText(s.statType)} Pips`).join(", ")}`;
  }
}

export class ApplyStatPipsCommand extends EventCommand<StatPipCommandData> {
  constructor(receiver: UpdateGameStateService, data: StatPipCommandData) {
    super(receiver, 'APPLY_STAT_PIPS', data);
  }
  override getDisplayMessage(): string {
    return `${this.data.monsterName} applied ${this.data.amount} ${this.data.statType.toLowerCase()} Pips.`;
  }
}

export class DiscardPipsCommand extends EventCommand<StatPipCommandData> {
  constructor(receiver: UpdateGameStateService, data: StatPipCommandData) {
    super(receiver, 'DISCARD_PIPS', data);
  }
  override getDisplayMessage(): string {
    return `${this.getPlayerString(this.data.activePlayerType as PlayerType)} discarded ${this.data.amount} ${this.data.statType.toLowerCase()} Pips.`;
  }
}