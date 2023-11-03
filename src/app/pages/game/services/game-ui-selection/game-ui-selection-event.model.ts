import { Buff } from "../../models/monster/buff.model";
import { MonsterAction } from "../../models/monster/action.model";

export interface GameUISelectionEvent {
  type: GameUISelectionEventType,
  data: any;
} 

export enum GameUISelectionEventType {
  TOGGLE_APPLY_BUFF = "TOGGLE_APPLY_BUFF",
  TOGGLE_APPLY_DISCARD = "TOGGLE_APPLY_DISCARD",
  TOGGLE_MONSTER_ACTION_SELECT = 'TOGGLE_MONSTER_ACTION_SELECT',
  TOGGLE_SWITCH_TO_MONSTER = 'TOGGLE_SWITCH_TO_MONSTER',
  TOGGLE_STANDARD_ACTION = 'TOGGLE_STANDARD_ACTION',
  TOGGLE_APPLY_STAT_CUBES = 'TOGGLE_APPLY_STAT_CUBES'
}

export interface ToggleApplyBuffEvent extends GameUISelectionEvent {
  type: GameUISelectionEventType.TOGGLE_APPLY_BUFF,
  data: Buff,
}

export interface ToggleApplyDiscardEvent extends GameUISelectionEvent {
  type: GameUISelectionEventType.TOGGLE_APPLY_DISCARD,
  data: Buff,
}

export interface ToggleMonsterActionSelectEvent extends GameUISelectionEvent {
  type: GameUISelectionEventType.TOGGLE_MONSTER_ACTION_SELECT,
  data: MonsterAction,
}

export type GameUISelectionEventData = 
  | ToggleApplyBuffEvent
  | ToggleApplyDiscardEvent
  | ToggleMonsterActionSelectEvent;