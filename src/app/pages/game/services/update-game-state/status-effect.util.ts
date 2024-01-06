import { EventCommand, CommandData } from "../../logic/commands/event-command.model";
import { BasicCommandData, CurseCommand, DrainCommand, KnockedOutCommand, MonsterActionCommandData, StatusEffectCommandData } from "../../logic/commands/monster-action-commands.model";
import { StatModificationCommand } from "../../logic/commands/stat-modification-command.model";
import { ConditionalTriggerCommand } from "../../logic/commands/trigger-command.model";
import { GameState } from "../game-state/game-state.service";
import { GameStateUtil } from "../game-state/game-state.util";
import { TriggerUtil } from "./trigger.util";
import { UpdateGameStateService } from "./update-game-state.service";
import { UpdateGameStateUtil } from "./update-game-state.util";

export const StatusEffectUtil = {
  applyStatusCurse,
  addCurseTrigger,
  applyStatusDrain,
  addDrainTrigger,
  applyStatusFatigue,
  addFatigueTrigger,
  drain,
}

function applyStatusCurse(gs: GameState, data: StatusEffectCommandData, rc: UpdateGameStateService) {
  const { activeMonster } = GameStateUtil.getPlayerState(gs, data.player);
  activeMonster.modifiers.add(UpdateGameStateUtil.getMonsterModifier(activeMonster.key(), 'CURSE', 0, true));
  addCurseTrigger(gs, data, rc)
}

function addCurseTrigger(gs: GameState, data: StatusEffectCommandData, rc: UpdateGameStateService) {
  new CurseCommand(rc, {
    ...data,
    display: true,
    isStatusEffect: true,
    targetMonster: GameStateUtil.getMonsterByPlayer(gs, data.player).key(),
    triggerCondition: (command: EventCommand<CommandData>, trigger: EventCommand<CommandData>): boolean => {
      const rngCurse = gs.rng.randomFloat();
      const condition = TriggerUtil.checkEndOfTurnStatusEffectTrigger(gs, data.player, command, trigger);
      return rngCurse <= 0.33 && condition;
    },
    removeCondition: (): boolean => {
      const { activeMonster } = GameStateUtil.getPlayerState(gs, data.player);
      return !activeMonster.modifiers.contains('CURSE') || activeMonster.isKod();
    },
  }).executeAsTrigger('END_PHASE');
}

function applyStatusDrain(gs: GameState, data: StatusEffectCommandData, rc: UpdateGameStateService) {
  const { activeMonster } = GameStateUtil.getPlayerState(gs, data.player);
  activeMonster.modifiers.add(UpdateGameStateUtil.getMonsterModifier(activeMonster.key(), 'DRAIN', 0, true));
  addDrainTrigger(gs, data, rc);
}

function addDrainTrigger(gs: GameState, data: StatusEffectCommandData, rc: UpdateGameStateService) {
  new DrainCommand(rc, {
    ...data,
    display: true,
    isStatusEffect: true,
    targetMonster: GameStateUtil.getMonsterByPlayer(gs, data.player).key(),
    triggerCondition: (command: EventCommand<CommandData>, trigger: EventCommand<CommandData>): boolean => {
      const rng = gs.rng.randomFloat();
      const condition = TriggerUtil.checkEndOfTurnStatusEffectTrigger(gs, data.player, command, trigger);
      return rng <= 0.5 && condition;
    },
    removeCondition: (): boolean => {
      const { activeMonster } = GameStateUtil.getPlayerState(gs, data.player);
      return !activeMonster.modifiers.contains('CURSE') || activeMonster.isKod();
    },
  }).executeAsTrigger('END_PHASE');
}

function applyStatusFatigue(gs: GameState, data: StatusEffectCommandData, rc: UpdateGameStateService) {
  const { activeMonster } = GameStateUtil.getPlayerState(gs, data.player);
  activeMonster.modifiers.add(UpdateGameStateUtil.getMonsterModifier(activeMonster.key(), 'FATIGUE', 0, true));
  addFatigueTrigger(gs, data, rc);
}

function addFatigueTrigger(gs: GameState, data: StatusEffectCommandData, rc: UpdateGameStateService) {
  new ConditionalTriggerCommand(rc, {
    ...data,
    getConditionalTrigger: (command: MonsterActionCommandData) => {
      const { activeMonster } = GameStateUtil.getPlayerState(gs, command.player);
      const buffSlotsUsed = command.selectedAction.appliedBuffs.reduce((acc, val) => val.buffSlots + acc, 0);
      return new StatModificationCommand(rc, {
        player: data.player,
        key: 'fatigue',
        gs,
        amount: buffSlotsUsed,
        statType: 'RECOIL',
        isStatusEffect: true,
        origin: 'fatigue [STATUS]',
        display: true,
      });
    },
    triggerCondition: (command: EventCommand<MonsterActionCommandData>, trigger: EventCommand<MonsterActionCommandData>): boolean => {
      const buffSlotsUsed = command.data.selectedAction.appliedBuffs.reduce((acc, val) => val.buffSlots + acc, 0);
      return !!(command.data.player === trigger.data.player && buffSlotsUsed > 0);
    },
    removeCondition: (): boolean => {
      const { activeMonster } = GameStateUtil.getPlayerState(gs, data.player);
      return !activeMonster.modifiers.contains('FATIGUE') || activeMonster.isKod();
    },
  }).executeAsTrigger('MONSTER_ACTION');
}

function drain(gs: GameState, data: BasicCommandData, rc: UpdateGameStateService) {
  const { activeMonster } = GameStateUtil.getPlayerState(gs, data.player);
  const { activeMonster: opposingMonster } = GameStateUtil.getOpponentPlayerState(gs, data.player);
  activeMonster.heal(1);
  opposingMonster.takeDamage(1);
  if (opposingMonster.currentHp === 0) {
    // TODO: check if this is the correct player
    new KnockedOutCommand(rc, {
      ...data,
      kodMonster: opposingMonster.name,
      kodPlayer: GameStateUtil.getOppositePlayer(data.player),
    }).pushFront();
  }
}