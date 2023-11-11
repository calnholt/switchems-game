import { CardCompositeKey } from "~/app/shared/interfaces/ICompositeKey.interface";
import { PlayerType } from "../player-type.mode";
import { StatModificationCommand } from "../commands/stat-modification-command.model";
import { GainRandomStatPipCommand, GainStatPipCommand } from "../commands/stat-pip-commands.model";
import { DisableActionPromptCommand } from "../commands/monster-action-commands.model";
import { UpdateGameStateService } from "../../services/update-game-state/update-game-state.service";
import { GameState } from "../../services/game-state/game-state.service";
import { GameStateUtil } from "../../services/game-state/game-state.util";

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

function ChargroarMonster(key: CardCompositeKey, player: PlayerType, receiver: UpdateGameStateService) {
  const cmd = new DisableActionPromptCommand(receiver, { key, player });
  cmd.executeAsTrigger('SWITCH_IN');
}

function LightningFangAction(key: CardCompositeKey, player: PlayerType, receiver: UpdateGameStateService, gs: GameState) {
  if (GameStateUtil.isFaster(gs, player)) {
    const cmd = new StatModificationCommand(receiver, { key, player, amount: 3, statType: "ATTACK" });
    cmd.execute();
  }
}

function LightsOutAction(key: CardCompositeKey, player: PlayerType, receiver: UpdateGameStateService) {
  const cmd = new GainStatPipCommand(receiver, { key, player, amount: 2, statType: "SPEED" });
  cmd.executeAsTrigger('KNOCKED_OUT_BY_ATTACK');
}

function HyperChargeAction(key: CardCompositeKey, player: PlayerType, receiver: UpdateGameStateService) {
  receiver.pushFront(new GainStatPipCommand(receiver, { key, player, amount: 3, statType: "ATTACK", destroyOnTrigger: true }));
  receiver.pushFront(new StatModificationCommand(receiver, { key, player, amount: 3, statType: 'ATTACK' }));
}

function BlazingRoarAction(key: CardCompositeKey, player: PlayerType, receiver: UpdateGameStateService) {
  const cmdA = new GainRandomStatPipCommand(receiver, { key, player, amount: 1 });
  cmdA.execute();
  const cmdB = new StatModificationCommand(receiver, { key, player, amount: 1, statType: 'PIERCE', ongoing: true });
  cmdB.executeAsTrigger('APPLY_BUFF');
}

function ChargeBuff(key: CardCompositeKey, player: PlayerType, receiver: UpdateGameStateService, gs: GameState) {
  const value = GameStateUtil.opponentHasKnockedOutMonster(gs, player) ? 2 : 1;
  const cmd = new StatModificationCommand(receiver, { key, player, amount: value, statType: 'SPEED' });
  cmd.execute();
}

function RoarBuff(key: CardCompositeKey, player: PlayerType, receiver: UpdateGameStateService, gs: GameState) {
  const value = GameStateUtil.opponentHasKnockedOutMonster(gs, player) ? 2 : 1;
  const cmd = new StatModificationCommand(receiver, { key, player, amount: value, statType: 'ATTACK' });
  cmd.execute();
}

function RevengeBuff(key: CardCompositeKey, player: PlayerType, receiver: UpdateGameStateService, gs: GameState) {
  if (GameStateUtil.isResistant(gs, player)) {
    const cmd = new StatModificationCommand(receiver, { key, player, amount: 1, statType: 'ATTACK' });
    cmd.execute();
    const cmd2 = new StatModificationCommand(receiver, { key, player, amount: 2, statType: 'SPEED' });
    cmd2.execute();
  }
  else {
    const cmd = new StatModificationCommand(receiver, { key, player, amount: 1, statType: 'RECOIL' });
    cmd.execute();
  }
}

function PreyUponBuff(key: CardCompositeKey, player: PlayerType, receiver: UpdateGameStateService, gs: GameState) {
  if (GameStateUtil.isWeak(gs, player)) {
    const cmd = new StatModificationCommand(receiver, { key, player, amount: 1, statType: 'ATTACK' });
    cmd.execute();
    const cmd2 = new StatModificationCommand(receiver, { key, player, amount: 2, statType: 'SPEED' });
    cmd2.execute();
  }
  else {
    const cmd = new StatModificationCommand(receiver, { key, player, amount: 1, statType: 'RECOIL' });
    cmd.execute();
  }
}

