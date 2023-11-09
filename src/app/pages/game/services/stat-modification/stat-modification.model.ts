import { PlayerType } from "../../components/game/logic/condition.model";

export interface StatModificationEvent {
  type: StatModificationEventType,
  data: number,
  player: PlayerType,
} 

export enum StatModificationEventType {
  MODIFY_ATTACK = "MODIFY_ATTACK",
  MODIFY_SPEED = "MODIFY_SPEED",
  MODIFY_DEFENSE = "MODIFY_DEFENSE",
  MODIFY_PIERCE = "MODIFY_PIERCE",
  MODIFY_RECOIL = "MODIFY_RECOIL",
  HEAL = "HEAL",
}

export interface ModifyAttackEvent extends StatModificationEvent {
  type: StatModificationEventType.MODIFY_ATTACK,
  data: number,
}
export interface ModifySpeedEvent extends StatModificationEvent {
  type: StatModificationEventType.MODIFY_SPEED,
  data: number,
}
export interface ModifyDefenseEvent extends StatModificationEvent {
  type: StatModificationEventType.MODIFY_DEFENSE,
  data: number,
}
export interface ModifyPierceEvent extends StatModificationEvent {
  type: StatModificationEventType.MODIFY_PIERCE,
  data: number,
}
export interface ModifyRecoilEvent extends StatModificationEvent {
  type: StatModificationEventType.MODIFY_RECOIL,
  data: number,
}
export interface HealEvent extends StatModificationEvent {
  type: StatModificationEventType.HEAL,
  data: number,
}

export type StatModificationEventData = 
  | ModifyAttackEvent
  | HealEvent
  | ModifyRecoilEvent
  | ModifySpeedEvent
  | ModifyPierceEvent
  | ModifyDefenseEvent;