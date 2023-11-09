import { CardCompositeKey } from "~/app/shared/interfaces/ICompositeKey.interface";
import { GameStateService } from "../../services/game-state/game-state.service";
import { PlayerType } from "../player-type.mode";
import { GameStateUtil } from "../../services/game-state/game-state.util";
import { EventCommandQueueService } from "../../services/event-command-queue/event-command-queue.service";
import { StatModificationCommand } from "../commands/stat-modification-command.model";
import { GainRandomStatPipCommand, GainStatPipCommand } from "../commands/stat-pip-commands.model";

export const Chargroar = {
  LightningFangAction,
  LightsOutAction,
  HyperChargeAction,
  BlazingRoar,
}

function LightningFangAction(key: CardCompositeKey, player: PlayerType, ecqs: EventCommandQueueService, gss: GameStateService) {
  if (GameStateUtil.isFaster(gss.getGameState(), player)) {
    const cmd = new StatModificationCommand(ecqs, { key, player, amount: 3, statType: "attack" });
    cmd.execute();
  }
}

function LightsOutAction(key: CardCompositeKey, player: PlayerType, ecqs: EventCommandQueueService, gss: GameStateService) {
  const cmd = new GainStatPipCommand(ecqs, { key, player, amount: 2, type: "SPEED" });
  cmd.executeAsTrigger('KNOCKED_OUT_BY_ATTACK');
}

function HyperChargeAction(key: CardCompositeKey, player: PlayerType, ecqs: EventCommandQueueService, gss: GameStateService) {
  const cmdA = new GainStatPipCommand(ecqs, { key, player, amount: 3, type: "ATTACK", destroyOnTrigger: true });
  cmdA.execute();
  const cmdB = new StatModificationCommand(ecqs, { key, player, amount: 3, statType: 'attack' });
  cmdB.execute();
}

function BlazingRoar(key: CardCompositeKey, player: PlayerType, ecqs: EventCommandQueueService, gss: GameStateService) {
  const cmdA = new GainRandomStatPipCommand(ecqs, { key, player, amount: 1, type: 'RANDOM' });
  cmdA.execute();
  const cmdB = new StatModificationCommand(ecqs, { key, player, amount: 1, statType: 'pierce' });
  cmdB.executeAsTrigger('APPLY_BUFF');
}