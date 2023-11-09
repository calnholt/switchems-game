import { PlayerType } from "../../components/game/logic/condition.model";
import { PlayerTrackedEventKey } from "./player-tracked-events.service";

export interface PlayerTrackedEvent {
  type: PlayerTrackedEventType,
  data: { value: number | boolean, key: PlayerTrackedEventKey },
  playerType: PlayerType,
}

export enum PlayerTrackedEventType {
  ADD = 'ADD',
}

export interface AddPlayerTrackedEvent extends PlayerTrackedEvent {
  type: PlayerTrackedEventType,
  data: { value: number | boolean, key: PlayerTrackedEventKey },
  playerType: PlayerType,
};


export type PlayerTrackedEventData = 
  | AddPlayerTrackedEvent;