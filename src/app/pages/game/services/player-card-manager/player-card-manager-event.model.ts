import { CardCompositeKey } from "~/app/shared/interfaces/ICompositeKey.interface";

export interface PlayerCardManagerEvent {
  type: PlayerCardManagerEventType,
} 

export enum PlayerCardManagerEventType {
  TOGGLE_APPLY_BUFF = "TOGGLE_APPLY_BUFF",
  TOGGLE_APPLY_DISCARD = "TOGGLE_APPLY_DISCARD",
}

export interface ToggleBuffEvent extends PlayerCardManagerEvent {
  type: PlayerCardManagerEventType.TOGGLE_APPLY_BUFF,
  payload: { key: CardCompositeKey }
}

export interface ToggleDiscardEvent extends PlayerCardManagerEvent {
  type: PlayerCardManagerEventType.TOGGLE_APPLY_DISCARD,
  payload: { key: CardCompositeKey }
}

export type PlayerCardManagerEventData = 
ToggleBuffEvent | 
ToggleDiscardEvent;