import { CardCompositeKey } from "~/app/shared/interfaces/ICompositeKey.interface";

export interface GameUISelectionEvent {
  type: GameUISelectionEventType,
  data: any;
} 

export enum GameUISelectionEventType {
  TOGGLE_APPLY_BUFF = "TOGGLE_APPLY_BUFF",
  TOGGLE_APPLY_DISCARD = "TOGGLE_APPLY_DISCARD",
  TOGGLE_MONSTER_ACTION_SELECT = 'TOGGLE_MONSTER_ACTION_SELECT'
}

export interface ToggleApplyBuffEvent extends GameUISelectionEvent {
  type: GameUISelectionEventType.TOGGLE_APPLY_BUFF,
  data: CardCompositeKey,
}

export interface ToggleApplyDiscardEvent extends GameUISelectionEvent {
  type: GameUISelectionEventType.TOGGLE_APPLY_DISCARD,
  data: CardCompositeKey
}

export interface ToggleMonsterActionSelectEvent extends GameUISelectionEvent {
  type: GameUISelectionEventType.TOGGLE_MONSTER_ACTION_SELECT,
  data: CardCompositeKey
}

export type GameUISelectionEventData = 
  | ToggleApplyBuffEvent
  | ToggleApplyDiscardEvent
  | ToggleMonsterActionSelectEvent;