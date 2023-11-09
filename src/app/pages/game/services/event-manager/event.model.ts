import { GameUISelectionEventData, GameUISelectionEventType } from "../game-ui-selection/game-ui-selection-event.model";
import { StatModificationEventData, StatModificationEventType } from "../stat-modification/stat-modification.model";
import { PlayerTrackedEventData } from "../tracked-events/player-tracked-events.model";
import { PlayerTrackedEventKey } from "../tracked-events/player-tracked-events.service";

export type EventType = 
  | PlayerTrackedEventKey
  | StatModificationEventType
  | GameUISelectionEventType;

export type EventDataType = 
  | PlayerTrackedEventData
  | StatModificationEventData
  | GameUISelectionEventData;