import { PlayerType } from "../../components/game/logic/condition.model";
import { EventManagerService } from "../event-manager/event-manager.service";
import { StatModificationEventType } from "./stat-modification.model";

export const StatModificationUtil = {
  modifySpeed,
  modifyDefense,
  modifyAttack,
  modifyPierce,
  modifyRecoil,
}

function modifySpeed(s: EventManagerService, value: number, playerType: PlayerType) {
  s.sendEvent({ type: StatModificationEventType.MODIFY_SPEED, data: value, player: playerType });
}
function modifyDefense(s: EventManagerService, value: number, playerType: PlayerType) {
  s.sendEvent({ type: StatModificationEventType.MODIFY_DEFENSE, data: value, player: playerType });
}
function modifyAttack(s: EventManagerService, value: number, playerType: PlayerType) {
  s.sendEvent({ type: StatModificationEventType.MODIFY_ATTACK, data: value, player: playerType });
}
function modifyPierce(s: EventManagerService, value: number, playerType: PlayerType) {
  s.sendEvent({ type: StatModificationEventType.MODIFY_PIERCE, data: value, player: playerType });
}
function modifyRecoil(s: EventManagerService, value: number, playerType: PlayerType) {
  s.sendEvent({ type: StatModificationEventType.MODIFY_RECOIL, data: value, player: playerType });
}