import { GameUISelectionEventData, GameUISelectionEventType } from "../game-ui-selection/game-ui-selection-event.model";

export type EventType = 
  | GameUISelectionEventType;

export type EventDataType = 
  | GameUISelectionEventData;