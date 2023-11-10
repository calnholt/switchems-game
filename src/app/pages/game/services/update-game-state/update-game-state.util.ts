import { GameState } from "../game-state/game-state.service";
import { GameStateUtil } from "../game-state/game-state.util";
import { ActionModifierType, Modifier, MonsterModifierType } from "../../logic/modifiers/modifier.model";
import { CardCompositeKey } from "~/app/shared/interfaces/ICompositeKey.interface";
import { ApplyStatusEffectCommandData, DealDamageCommandData, KnockedOutByAttackCommand } from "../../logic/commands/monster-action-commands.model";
import { GainRandomStatPipCommand, StatPipCommandData } from "../../logic/commands/stat-pip-commands.model";
import { StatModificationData } from "../../logic/commands/stat-modification-command.model";
import { HandCommandData } from "../../logic/commands/hand-commands.model";
import { EventCommandQueueService } from "../event-command-queue/event-command-queue.service";
import { EventCommand, CommandData } from "../../logic/commands/event-command.model";
import { FlinchedCommand } from "../../logic/commands/ongoing-turn-commands.model";
import { PlayerType } from "../../logic/player-type.mode";

export const UpdateGameStateUtil = {
  applyFlinch,
  applyStatusEffect,
  applyStatPips,
  dealDamage,
  draw,
  gainStatPip,
  heal,
  modifyStat,
  preventFlinch,
  preventRecoil,
  flinched,
  removeStatusEffect,
  gainRandomStatPip,
}

function getOpposite(playerType: PlayerType) { return playerType === 'P' ? 'O' : 'P' }
function getActionModifier(key: CardCompositeKey, type: ActionModifierType, value: number = 0, ongoing: boolean = false): Modifier<ActionModifierType> {
  return new Modifier<ActionModifierType>(key, type, value, ongoing);
}
function getMonsterModifier(key: CardCompositeKey, type: MonsterModifierType, value: number = 0, ongoing: boolean = false): Modifier<MonsterModifierType> {
  return new Modifier<MonsterModifierType>(key, type, value, ongoing);
}

function applyFlinch(gs: GameState, data: StatModificationData) {
  const action = GameStateUtil.getMonsterActionByPlayer(gs, data.player);
  action.modifiers.add(getActionModifier(action.key(), 'FLINCH'));
}
function applyStatusEffect(gs: GameState, data: ApplyStatusEffectCommandData) {
  const monster = GameStateUtil.getMonsterByPlayer(gs, data.player);
  monster.modifiers.add(getMonsterModifier(monster.key(), data.statusName, 0, true))
}
function applyStatPips(gs: GameState, data: StatPipCommandData) {
  if (data.statType === 'DEFENSE') {
    const monster = GameStateUtil.getMonsterByPlayer(gs, data.player);
    monster.modifiers.add(getMonsterModifier('pip', data.statType, data.amount, true))
  }
  else {
    const action = GameStateUtil.getMonsterActionByPlayer(gs, data.player);
    action.modifiers.add(getActionModifier('pip', data.statType, data.amount));
  }
}

// dealing damage can result in different events
function dealDamage(gs: GameState, data: DealDamageCommandData, ecqs: EventCommandQueueService): EventCommand<CommandData> | undefined {
  const monster = GameStateUtil.getMonsterByPlayer(gs, data.player);
  const action = GameStateUtil.getMonsterActionByPlayer(gs, data.player);
  monster.takeDamage(data.damageToDeal);
  if (monster.currentHp === 0) {
    const opposingMonster = GameStateUtil.getMonsterByPlayer(gs, getOpposite(data.player));
    return new KnockedOutByAttackCommand(ecqs, { key: monster.key(), player: data.player, monsterName: monster.name, opposingMonsterName: opposingMonster.name })
  }
  if (GameStateUtil.isFaster(gs, data.player) && action.modifiers.contains('FLINCH')) {
    return new FlinchedCommand(ecqs, { key: monster.key(), player: data.player });
  }
  return undefined;
}

function draw(gs: GameState, data: HandCommandData) {
  const pcm = GameStateUtil.getPlayerCardManagerByPlayer(gs, data.player);
  pcm.drawCard();
}

function gainStatPip(gs: GameState, data: StatPipCommandData) {
  const statBoard = GameStateUtil.getStatBoardByPlayer(gs, data.player);
  statBoard.gain(data.amount, data.statType);
}
function heal(gs: GameState, data: StatModificationData) {
  const monster = GameStateUtil.getMonsterByPlayer(gs, data.player);
  monster.heal(data.amount);
}
function knockedOutByAttack(gs: GameState, data: StatModificationData) {
  // determine if switch dialog is needed
  // auto switch if no option exists
  // player wins check
}
function modifyStat(gs: GameState, data: StatModificationData) {
  if (data.statType === 'DEFENSE') {
    const monster = GameStateUtil.getMonsterByPlayer(gs, data.player);
    monster.modifiers.add(getMonsterModifier('mod', data.statType, data.amount, true))
  }
  else {
    const action = GameStateUtil.getMonsterActionByPlayer(gs, data.player);
    action.modifiers.add(getActionModifier('mod', data.statType, data.amount));
  }
}
function preventFlinch(gs: GameState, data: StatModificationData) {
  const monster = GameStateUtil.getMonsterByPlayer(gs, data.player);
  monster.modifiers.add(getMonsterModifier('mod', 'PREVENT_FLINCH', data.amount, true))
}
function preventRecoil(gs: GameState, data: StatModificationData) {
  const monster = GameStateUtil.getMonsterByPlayer(gs, data.player);
  monster.modifiers.add(getMonsterModifier('mod', 'PREVENT_RECOIL', data.amount, true))
}
function flinched(gs: GameState, data: StatModificationData) {
  const monster = GameStateUtil.getMonsterByPlayer(gs, data.player);
  monster.modifiers.add(getMonsterModifier('mod', 'FLINCHED', data.amount, true))
}

function removeStatusEffect(gs: GameState, data: ApplyStatusEffectCommandData) {
  const monster = GameStateUtil.getMonsterByPlayer(gs, data.player);
  monster.modifiers.remove(data.statusName);
}
function weak(gs: GameState, data: CommandData, ecqs: EventCommandQueueService) {
  return new GainRandomStatPipCommand(ecqs, { key: 'pip', amount: 1 })
}
function gainRandomStatPip() {

}