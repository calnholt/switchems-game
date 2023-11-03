import { CardCompositeKey } from "~/app/shared/interfaces/ICompositeKey.interface";

export interface PlayerCardManagerEvent {
  type: PlayerCardManagerEventType,
  data: any;
} 

export enum PlayerCardManagerEventType {
  TOGGLE_APPLY_BUFF = "TOGGLE_APPLY_BUFF",
  TOGGLE_APPLY_DISCARD = "TOGGLE_APPLY_DISCARD",
}

export interface ToggleBuffEvent extends PlayerCardManagerEvent {
  type: PlayerCardManagerEventType.TOGGLE_APPLY_BUFF,
  data: CardCompositeKey,
}

export interface ToggleDiscardEvent extends PlayerCardManagerEvent {
  type: PlayerCardManagerEventType.TOGGLE_APPLY_DISCARD,
  data: CardCompositeKey
}

export type PlayerCardManagerEventData = 
ToggleBuffEvent | 
ToggleDiscardEvent;