import { GameUISelectionEventData, GameUISelectionEventType } from "../game-ui-selection/game-ui-selection-event.model";
import { StatModificationEventData, StatModificationEventType } from "../stat-modification/stat-modification.model";

export type EventType = 
  | StatModificationEventType
  | GameUISelectionEventType;

export type EventDataType = 
  | StatModificationEventData
  | GameUISelectionEventData;