import { GameState } from "../game-state/game-state.service";
import { GameStateUtil } from "../game-state/game-state.util";
import { ActionModifierType, Modifier, MonsterModifierType } from "../../logic/modifiers/modifier.model";
import { CardCompositeKey } from "~/app/shared/interfaces/ICompositeKey.interface";
import { ApplyStatusEffectCommandData, BasicCommandData, DealDamageCommandData, KnockedOutByAttackCommand } from "../../logic/commands/monster-action-commands.model";
import { GainRandomStatPipCommand, GainRandomStatPipCommandData, GainStatPipCommand, StatPipCommandData } from "../../logic/commands/stat-pip-commands.model";
import { HealCommand, HealCommandData, StatModificationData } from "../../logic/commands/stat-modification-command.model";
import { HandCommandData } from "../../logic/commands/hand-commands.model";
import { CommandData } from "../../logic/commands/event-command.model";
import { FlinchedCommand } from "../../logic/commands/ongoing-turn-commands.model";
import { PlayerType } from "../../logic/player-type.mode";
import { ApplyBuffBelongsCommand, BuffCommandData } from "../../logic/commands/buff-command.model";
import { GainSwitchDefenseCommand, SwitchCommandData, SwitchInCommand } from "../../logic/commands/switch-commands.model";
import { UpdateGameStateService } from "./update-game-state.service";
import { DescriptiveMessageCommand } from "../../logic/commands/message-command.model";
import { Monster } from "../../models/monster/monster.model";

export const UpdateGameStateUtil = {
  applyBuff,
  applyFlinch,
  applyStatusEffect,
  applyStatPips,
  dealAttackDamage,
  dealDamage,
  draw,
  gainStatPip,
  heal,
  modifyStat,
  preventFlinch,
  preventRecoil,
  speedReversed,
  flinched,
  removeStatusEffect,
  weak,
  gainSwitchDefense,
  resistant,
  switchOut,
  switchIn,
}

function getOpposite(playerType: PlayerType) { return playerType === 'P' ? 'O' : 'P' }
function getActionModifier(key: CardCompositeKey, type: ActionModifierType, value: number = 0, ongoing: boolean = false): Modifier<ActionModifierType> {
  return new Modifier<ActionModifierType>(key, type, value, ongoing);
}
function getMonsterModifier(key: CardCompositeKey, type: MonsterModifierType, value: number = 0, ongoing: boolean = false): Modifier<MonsterModifierType> {
  return new Modifier<MonsterModifierType>(key, type, value, ongoing);
}

function applyBuff(gs: GameState, data: BuffCommandData, rc: UpdateGameStateService) {
  const monster = GameStateUtil.getMonsterByPlayer(gs, data.player);
  if (monster.name !== data.monsterName) return;
  // buff belongs to monster, send belongs command
  rc.enqueue(
    new ApplyBuffBelongsCommand(rc, { key: data.key, player: data.player, buffName: data.buffName, monsterName: data.monsterName })
  );
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
    monster.modifiers.add(getMonsterModifier('pip', data.statType, data.amount))
  }
  else {
    const action = GameStateUtil.getMonsterActionByPlayer(gs, data.player);
    action.modifiers.add(getActionModifier('pip', data.statType, data.amount));
  }
  const statBoard = GameStateUtil.getStatBoardByPlayer(gs, data.player);
  statBoard.getSectionFromType(data.statType).remove();
}

function dealAttackDamage(gs: GameState, data: DealDamageCommandData, rc: UpdateGameStateService) {
  const attackingMonster = GameStateUtil.getMonsterByPlayer(gs, data.player);
  const attack = GameStateUtil.getMonsterActionByPlayer(gs, data.player);
  const targetMonster = GameStateUtil.getMonsterByPlayer(gs, GameStateUtil.getOppositePlayer(data.player));
  targetMonster.takeDamage(data.damageToDeal);
  gs.battleAniService.update(data.player === 'P', attack.attack ? 'ATTACKING' : 'USING_SPECIAL');
  if (targetMonster.currentHp === 0) {
    const monsterNames = GameStateUtil.getMonsterNames(gs, data.player);
    new KnockedOutByAttackCommand(rc, { key: attackingMonster.key(), player: data.player, ...monsterNames, display: true }).enqueue();
  }
  if (GameStateUtil.isFaster(gs, data.player) && attack.modifiers.contains('FLINCH')) {
    new FlinchedCommand(rc, { key: attackingMonster.key(), player: data.player }).enqueue();
  }
}

function dealDamage(gs: GameState, data: DealDamageCommandData, rc: UpdateGameStateService) {
  const monster = GameStateUtil.getMonsterByPlayer(gs, data.player);
  monster.takeDamage(data.damageToDeal);
  gs.battleAniService.update(data.player === 'P', 'TAKING_DAMAGE');
  if (monster.currentHp === 0) {
    const monsterNames = GameStateUtil.getMonsterNames(gs, data.player);
    new KnockedOutByAttackCommand(rc, { key: monster.key(), player: data.player, ...monsterNames, display: true }).enqueue();
  }
}

function draw(gs: GameState, data: HandCommandData) {
  const pcm = GameStateUtil.getPlayerCardManagerByPlayer(gs, data.player);
  for (let i = 0; i < (data?.amount as number) ?? 1; i++) {
    pcm.drawCard();
  }
}

function gainStatPip(gs: GameState, data: StatPipCommandData) {
  const statBoard = GameStateUtil.getStatBoardByPlayer(gs, data.player);
  statBoard.gain(data.amount, data.statType);
}
function heal(gs: GameState, data: HealCommandData) {
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
    monster.modifiers.add(getMonsterModifier('mod', data.statType, data.amount))
  }
  else {
    const action = GameStateUtil.getMonsterActionByPlayer(gs, data.player);
    action.modifiers.add(getActionModifier('mod', data.statType, data.amount));
  }
}
function preventFlinch(gs: GameState, data: StatModificationData) {
  const monster = GameStateUtil.getMonsterByPlayer(gs, data.player);
  monster.modifiers.add(getMonsterModifier('mod', 'PREVENT_FLINCH', data.amount, true));
}
function preventRecoil(gs: GameState, data: StatModificationData) {
  const monster = GameStateUtil.getMonsterByPlayer(gs, data.player);
  monster.modifiers.add(getMonsterModifier('mod', 'PREVENT_RECOIL', data.amount, true));
}
function flinched(gs: GameState, data: StatModificationData) {
  const monster = GameStateUtil.getMonsterByPlayer(gs, data.player);
  monster.modifiers.add(getMonsterModifier('mod', 'FLINCHED', data.amount, true));
}
function speedReversed(gs: GameState, data: StatModificationData) {
  const monster = GameStateUtil.getMonsterByPlayer(gs, data.player);
  monster.modifiers.add(getMonsterModifier('mod', 'SPEED_REVERSED', data.amount, true));
}


function removeStatusEffect(gs: GameState, data: ApplyStatusEffectCommandData) {
  const monster = GameStateUtil.getMonsterByPlayer(gs, data.player);
  monster.modifiers.remove(data.statusName);
}
function weak(data: CommandData, rc: UpdateGameStateService) {
  // when a monster is weak, push random pip event for super effective
  return new GainRandomStatPipCommand(rc, { key: 'pip', player: data.player, amount: 1 });
}

function gainSwitchDefense(gs: GameState, data: SwitchCommandData) {
  const monster = GameStateUtil.getMonsterByPlayer(gs, data.player);
  monster.modifiers.add(getMonsterModifier('mod', 'DEFENSE', monster.getSwitchDefenseValue(), true))
}

function resistant(gs: GameState, data: BasicCommandData, rc: UpdateGameStateService) {
  const action = GameStateUtil.getMonsterActionByPlayer(gs, getOpposite(data.player));
  const { activeMonster, selectedAction } = GameStateUtil.getPlayerState(gs, data.player);
  // determine if switch defense occurs
  if (activeMonster.resistances.includes(action.element) && selectedAction.action?.getSelectableActionType() === 'SWITCH') {
    rc.enqueue(
      new GainSwitchDefenseCommand(rc, { key: data.key, player: data.player })
    );
  }
}

// clean up triggers
// add new triggers
function switchOut(gs: GameState, data: SwitchCommandData, rc: UpdateGameStateService) {
  let switchingToMonster = GameStateUtil.getSwitchingToMonster(gs, data.player);
  if (data.type === 'HEAL') {
    new HealCommand(rc, { ...data, amount: 2, origin: 'Switch Out', display: true}).enqueue();
  }
  new SwitchInCommand(rc, { ...data, player: data.player, monsterName: switchingToMonster.name, display: true }).enqueue();
}

function switchIn(gs: GameState, data: SwitchCommandData, rc: UpdateGameStateService) {
  gs.battleAniService.update(data.player === 'P', 'SWITCHING_OUT');
  setTimeout(() => GameStateUtil.getPlayerState(gs, data.player).player.switch(data.key), 290);
}