import { Buff } from "../../models/monster/buff.model";
import { ISelectableAction } from "~/app/shared/interfaces/ISelectableAction.interface";
import { StatBoardSection } from "../../models/stat-board/stat-board.model";

export interface GameUISelectionEvent {
  type: GameUISelectionEventType,
  data: any;
} 

export enum GameUISelectionEventType {
  TOGGLE_APPLY_BUFF = "TOGGLE_APPLY_BUFF",
  TOGGLE_APPLY_DISCARD = "TOGGLE_APPLY_DISCARD",
  TOGGLE_ACTION = 'TOGGLE_ACTION',
  TOGGLE_APPLY_STAT = 'TOGGLE_APPLY_STAT',
}

export interface ToggleApplyBuffEvent extends GameUISelectionEvent {
  type: GameUISelectionEventType.TOGGLE_APPLY_BUFF,
  data: Buff,
}

export interface ToggleApplyDiscardEvent extends GameUISelectionEvent {
  type: GameUISelectionEventType.TOGGLE_APPLY_DISCARD,
  data: Buff,
}

export interface ToggleActionSelectEvent extends GameUISelectionEvent {
  type: GameUISelectionEventType.TOGGLE_ACTION,
  data: ISelectableAction,
}

export interface ToggleApplyStatEvent extends GameUISelectionEvent {
  type: GameUISelectionEventType.TOGGLE_APPLY_STAT,
  data: StatBoardSection,
}

export type GameUISelectionEventData = 
  | ToggleApplyBuffEvent
  | ToggleApplyDiscardEvent
  | ToggleApplyStatEvent
  | ToggleActionSelectEvent;