import { CardCompositeKey } from "~/app/shared/interfaces/ICompositeKey.interface";
import { PlayerType } from "../player-type.mode";
import { StatModificationCommand } from "../commands/stat-modification-command.model";
import { GainRandomStatPipCommand, GainStatPipCommand } from "../commands/stat-pip-commands.model";
import { DisableActionPromptCommand } from "../commands/monster-action-commands.model";
import { GameState } from "../../services/game-state/game-state.service";
import { GameStateUtil } from "../../services/game-state/game-state.util";
import { EventUpdateMediatorService } from "../../services/event-update-mediator.service";

export const Chargroar = {
  ChargroarMonster,
  LightningFangAction,
  LightsOutAction,
  HyperChargeAction,
  BlazingRoarAction,
  ChargeBuff,
  RoarBuff,
  RevengeBuff,
  PreyUponBuff
}

function ChargroarMonster(key: CardCompositeKey, player: PlayerType, receiver: EventUpdateMediatorService) {
  const cmd = new DisableActionPromptCommand({ key, player });
  receiver.registerTrigger('SWITCH_IN', cmd);
}

function LightningFangAction(key: CardCompositeKey, player: PlayerType, receiver: EventUpdateMediatorService, gs: GameState) {
  if (GameStateUtil.isFaster(gs, player)) {
    const cmd = new StatModificationCommand({ key, player, amount: 3, statType: "ATTACK" });
    receiver.enqueue(cmd);
  }
}

function LightsOutAction(key: CardCompositeKey, player: PlayerType, receiver: EventUpdateMediatorService) {
  const cmd = new GainStatPipCommand({ key, player, amount: 2, statType: "SPEED" });
  receiver.registerTrigger('KNOCKED_OUT_BY_ATTACK', cmd);
}

function HyperChargeAction(key: CardCompositeKey, player: PlayerType, receiver: EventUpdateMediatorService) {
  receiver.enqueue(new GainStatPipCommand({ key, player, amount: 3, statType: "ATTACK", destroyOnTrigger: true }));
  receiver.enqueue(new StatModificationCommand({ key, player, amount: 3, statType: 'ATTACK' }));
}

function BlazingRoarAction(key: CardCompositeKey, player: PlayerType, receiver: EventUpdateMediatorService) {
  receiver.enqueue(new GainRandomStatPipCommand({ key, player, amount: 1 }));
  const cmdB = new StatModificationCommand({ key, player, amount: 1, statType: 'PIERCE', ongoing: true });
  receiver.registerTrigger('APPLY_BUFF', cmdB);
}

function ChargeBuff(key: CardCompositeKey, player: PlayerType, receiver: EventUpdateMediatorService, gs: GameState) {
  const value = GameStateUtil.opponentHasKnockedOutMonster(gs, player) ? 2 : 1;
  receiver.enqueue(new StatModificationCommand({ key, player, amount: value, statType: 'SPEED' }));
}

function RoarBuff(key: CardCompositeKey, player: PlayerType, receiver: EventUpdateMediatorService, gs: GameState) {
  const value = GameStateUtil.opponentHasKnockedOutMonster(gs, player) ? 2 : 1;
  receiver.enqueue(new StatModificationCommand({ key, player, amount: value, statType: 'ATTACK' }));
}

function RevengeBuff(key: CardCompositeKey, player: PlayerType, receiver: EventUpdateMediatorService, gs: GameState) {
  if (GameStateUtil.isResistant(gs, player)) {
    receiver.enqueue(new StatModificationCommand({ key, player, amount: 1, statType: 'ATTACK' }));
    receiver.enqueue(new StatModificationCommand({ key, player, amount: 2, statType: 'SPEED' }));
  }
  else {
    receiver.enqueue(new StatModificationCommand({ key, player, amount: 1, statType: 'RECOIL' }));
  }
}

function PreyUponBuff(key: CardCompositeKey, player: PlayerType, receiver: EventUpdateMediatorService, gs: GameState) {
  if (GameStateUtil.isWeak(gs, player)) {
    receiver.enqueue(new StatModificationCommand({ key, player, amount: 1, statType: 'ATTACK' }));
    receiver.enqueue(new StatModificationCommand({ key, player, amount: 2, statType: 'SPEED' }));
  }
  else {
    receiver.enqueue(new StatModificationCommand({ key, player, amount: 1, statType: 'RECOIL' }));
  }
}

