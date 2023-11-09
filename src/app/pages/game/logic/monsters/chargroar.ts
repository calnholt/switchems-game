import { CardCompositeKey } from "~/app/shared/interfaces/ICompositeKey.interface";
import { PlayerType } from "../player-type.mode";
import { EventCommandQueueService } from "../../services/event-command-queue/event-command-queue.service";
import { StatModificationCommand } from "../commands/stat-modification-command.model";
import { GainRandomStatPipCommand, GainStatPipCommand } from "../commands/stat-pip-commands.model";
import { DisableActionPromptCommand } from "../commands/monster-action-commands.model";

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

function ChargroarMonster(key: CardCompositeKey, player: PlayerType, ecqs: EventCommandQueueService) {
  const cmd = new DisableActionPromptCommand(ecqs, { key, player });
  cmd.executeAsTrigger('SWITCH_IN');
}

function LightningFangAction(key: CardCompositeKey, player: PlayerType, ecqs: EventCommandQueueService, isFaster: boolean) {
  if (isFaster) {
    const cmd = new StatModificationCommand(ecqs, { key, player, amount: 3, statType: "attack" });
    cmd.execute();
  }
}

function LightsOutAction(key: CardCompositeKey, player: PlayerType, ecqs: EventCommandQueueService) {
  const cmd = new GainStatPipCommand(ecqs, { key, player, amount: 2, type: "SPEED" });
  cmd.executeAsTrigger('KNOCKED_OUT_BY_ATTACK');
}

function HyperChargeAction(key: CardCompositeKey, player: PlayerType, ecqs: EventCommandQueueService) {
  const cmdA = new GainStatPipCommand(ecqs, { key, player, amount: 3, type: "ATTACK", destroyOnTrigger: true });
  cmdA.execute();
  const cmdB = new StatModificationCommand(ecqs, { key, player, amount: 3, statType: 'attack' });
  cmdB.execute();
}

function BlazingRoarAction(key: CardCompositeKey, player: PlayerType, ecqs: EventCommandQueueService) {
  const cmdA = new GainRandomStatPipCommand(ecqs, { key, player, amount: 1, type: 'RANDOM' });
  cmdA.execute();
  const cmdB = new StatModificationCommand(ecqs, { key, player, amount: 1, statType: 'pierce' });
  cmdB.executeAsTrigger('APPLY_BUFF');
}

function ChargeBuff(key: CardCompositeKey, player: PlayerType, ecqs: EventCommandQueueService, opponentHasKnockedOutMonster: boolean) {
  const value = opponentHasKnockedOutMonster ? 2 : 1;
  const cmd = new StatModificationCommand(ecqs, { key, player, amount: value, statType: 'speed' });
  cmd.execute();
}

function RoarBuff(key: CardCompositeKey, player: PlayerType, ecqs: EventCommandQueueService, opponentHasKnockedOutMonster: boolean) {
  const value = opponentHasKnockedOutMonster ? 2 : 1;
  const cmd = new StatModificationCommand(ecqs, { key, player, amount: value, statType: 'attack' });
  cmd.execute();
}

function RevengeBuff(key: CardCompositeKey, player: PlayerType, ecqs: EventCommandQueueService, isEnemyResistant: boolean) {
  if (isEnemyResistant) {
    const cmd = new StatModificationCommand(ecqs, { key, player, amount: 1, statType: 'attack' });
    cmd.execute();
    const cmd2 = new StatModificationCommand(ecqs, { key, player, amount: 2, statType: 'speed' });
    cmd2.execute();
  }
  else {
    const cmd = new StatModificationCommand(ecqs, { key, player, amount: 1, statType: 'recoil' });
    cmd.execute();
  }
}

function PreyUponBuff(key: CardCompositeKey, player: PlayerType, ecqs: EventCommandQueueService, isEnemyWeak: boolean) {
  if (isEnemyWeak) {
    const cmd = new StatModificationCommand(ecqs, { key, player, amount: 1, statType: 'attack' });
    cmd.execute();
    const cmd2 = new StatModificationCommand(ecqs, { key, player, amount: 2, statType: 'speed' });
    cmd2.execute();
  }
  else {
    const cmd = new StatModificationCommand(ecqs, { key, player, amount: 1, statType: 'recoil' });
    cmd.execute();
  }
}
