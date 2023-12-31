import { UpdateGameStateService } from "../../services/update-game-state/update-game-state.service";
import { CommandData, EventCommand } from "./event-command.model";
import { SelectedAction } from "../../services/selected-action/selected-action.model";
import { PlayerType } from "../player-type.mode";
import { AbilityTextUtil } from "~/app/shared/utils/ability-text.util";

export type GamePhaseCommandType = 
  | 'TUTORIAL'
  | 'START_OF_GAME'
  | 'START_PHASE'
  | 'SELECTION_PHASE'
  | 'REVEAL_PHASE'
  | 'APPLY_PIPS_PHASE'
  | 'APPLY_BUFFS_PHASE'
  | 'SWITCH_ACTIONS_PHASE'
  | 'MONSTER_ACTIONS_PHASE'
  | 'STANDARD_ACTIONS_PHASE'
  | 'END_PHASE'
  | 'GAME_OVER'

  | 'GO_TO_NEXT_PHASE'

export interface GoToNextPhaseCommandData extends CommandData {
  nextPhase: GamePhaseCommandType,
}

export class GoToNextPhaseCommand extends EventCommand<CommandData> {
  constructor(receiver: UpdateGameStateService, data: GoToNextPhaseCommandData) {
    super(receiver, 'GO_TO_NEXT_PHASE', { ...data, display: false });
  }
  override getDisplayMessage(): string {
    return ``;
  }
}

export interface GamePhaseCommandData extends CommandData {
  
}

export class StartGamePhaseCommand extends EventCommand<GamePhaseCommandData> {
  constructor(receiver: UpdateGameStateService, data: GamePhaseCommandData) {
    super(receiver, 'START_PHASE', data);
  }
  override getDisplayMessage(): string {
    return ``;
  }
}

export class SelectionGamePhaseCommand extends EventCommand<GamePhaseCommandData> {
  constructor(receiver: UpdateGameStateService, data: GamePhaseCommandData) {
    super(receiver, 'SELECTION_PHASE', data);
  }
  override getDisplayMessage(): string {
    return ``;
  }
}

export interface RevealGamePhaseCommandData extends CommandData {
  opponentAction: SelectedAction;
}

export class RevealGamePhaseCommand extends EventCommand<RevealGamePhaseCommandData> {
  constructor(receiver: UpdateGameStateService, data: RevealGamePhaseCommandData) {
    super(receiver, 'REVEAL_PHASE', data);
  }
  override getDisplayMessage(): string {
    const name = `The opponent selected ${this.data.opponentAction.action.getDisplayName()}`;
    const { appliedBuffs, appliedDiscards, statBoardSection } = this.data.opponentAction;
    let pips = '';
    if (statBoardSection) {
      pips = ` using ${statBoardSection.current}${AbilityTextUtil.getIconText(statBoardSection.type)} Pips`
    }
    let buffs = '';
    if (appliedBuffs.length) {
      buffs = ` with buffs: ${appliedBuffs.map(b => b.name).join(", ")}`;
    }
    let discards = '';
    if (appliedDiscards.length) {
      discards = `, discarding: ${appliedDiscards.map(b => b.name).join(", ")}`
    }
    return `${name}${pips}${buffs}${discards}`;
  }
}
export class ApplyPipsGamePhaseCommand extends EventCommand<GamePhaseCommandData> {
  constructor(receiver: UpdateGameStateService, data: GamePhaseCommandData) {
    super(receiver, 'APPLY_PIPS_PHASE', data);
  }
  override getDisplayMessage(): string {
    return `apply pips phase`;
  }
}
export class ApplyBuffsGamePhaseCommand extends EventCommand<GamePhaseCommandData> {
  constructor(receiver: UpdateGameStateService, data: GamePhaseCommandData) {
    super(receiver, 'APPLY_BUFFS_PHASE', data);
  }
  override getDisplayMessage(): string {
    return `apply buff phase`;
  }
}
export class SwitchActionsGamePhaseCommand extends EventCommand<GamePhaseCommandData> {
  constructor(receiver: UpdateGameStateService, data: GamePhaseCommandData) {
    super(receiver, 'SWITCH_ACTIONS_PHASE', data);
  }
  override getDisplayMessage(): string {
    return `switch actions phase`;
  }
}
export class MonsterActionsGamePhaseCommand extends EventCommand<GamePhaseCommandData> {
  constructor(receiver: UpdateGameStateService, data: GamePhaseCommandData) {
    super(receiver, 'MONSTER_ACTIONS_PHASE', data);
  }
  override getDisplayMessage(): string {
    return `monster actions phase`;
  }
}
export class StandardActionsGamePhaseCommand extends EventCommand<GamePhaseCommandData> {
  constructor(receiver: UpdateGameStateService, data: GamePhaseCommandData) {
    super(receiver, 'STANDARD_ACTIONS_PHASE', data);
  }
  override getDisplayMessage(): string {
    return `standard action phase`;
  }
}
export class EndGamePhaseCommand extends EventCommand<GamePhaseCommandData> {
  constructor(receiver: UpdateGameStateService, data: GamePhaseCommandData) {
    super(receiver, 'END_PHASE', data);
  }
  override getDisplayMessage(): string {
    return `end phase`;
  }
}

export interface GameOverPhaseCommandData extends CommandData {
  winner: PlayerType;
}

export class GameOverPhaseCommand extends EventCommand<GameOverPhaseCommandData> {
  constructor(receiver: UpdateGameStateService, data: GameOverPhaseCommandData) {
    super(receiver, 'GAME_OVER', data);
  }
  override getDisplayMessage(): string {
    return ``;
  }
}
