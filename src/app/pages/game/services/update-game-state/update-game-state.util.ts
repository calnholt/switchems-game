import { GameState } from "../game-state/game-state.service";
import { GameStateUtil } from "../game-state/game-state.util";
import { ActionModifierType, Modifier, MonsterModifierType } from "../../logic/modifiers/modifier.model";
import { CardCompositeKey } from "~/app/shared/interfaces/ICompositeKey.interface";
import { ApplyStatusEffectCommandData, BasicCommandData, CurseCommand, DealDamageCommandData, DisableActionCommandData, DrainCommand, FatigueCommand, KnockedOutByAttackCommand, KnockedOutCommand, KnockedOutCommandData, MonsterActionCommand, MonsterActionCommandData, RecoilCheckCommand, RemoveStatusEffectsCommand, TakeRecoilDamageCommand, WeakCommand } from "../../logic/commands/monster-action-commands.model";
import { CrushCommandData, CrushPromptCommand, CrushPromptCommandData, GainRandomStatPipCommand, StatPipCommandData } from "../../logic/commands/stat-pip-commands.model";
import { HealCommand, HealCommandData, StatModificationCommand, StatModificationData } from "../../logic/commands/stat-modification-command.model";
import { HandCommandData } from "../../logic/commands/hand-commands.model";
import { CommandData, EventCommand } from "../../logic/commands/event-command.model";
import { FlinchedCommand } from "../../logic/commands/ongoing-turn-commands.model";
import { PlayerType } from "../../logic/player-type.mode";
import { ApplyBuffBelongsCommand, BuffCommandData } from "../../logic/commands/buff-command.model";
import { GainSwitchDefenseCommand, KnockedOutSwitchInPromptCommand, SwitchCommandData, SwitchInCommand, SwitchOutCommand, SwitchOutPromptCommand } from "../../logic/commands/switch-commands.model";
import { UpdateGameStateService } from "./update-game-state.service";
import { DescriptiveMessageCommand, WaitingForOpponentCommand } from "../../logic/commands/message-command.model";
import { DamageCalcUtil } from "../../logic/util/damage-calc.util";
import { CardByKeyUtil } from "../../logic/util/card-by-key.util";
import { ArrayUtil } from "~/app/shared/utils/array.util";
import { StatBoardSectionType } from "../../models/stat-board/stat-board.model";
import { GameOverPhaseCommand } from "../../logic/commands/game-phase-commands.model";
import { MonsterAction } from "../../models/monster/monster-action.model";
import { StandardActionCommandData } from "../../logic/commands/standard-action-command.model";
import { CommandUtil } from "./command.util";

export const UpdateGameStateUtil = {
  doMonsterAction,
  doStandardAction,
  applyBuff,
  applyFlinch,
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
  removeStatusEffects,
  weak,
  gainSwitchDefense,
  resistant,
  switchOut,
  switchIn,
  recoilCheck,
  switchRoutine,
  knockoutRoutine,
  crush,
  crushPrompt,
  disableMonsterAction,
  getMonsterModifier,
}

function skipActionAndDamage(gs: GameState, data: CommandData): boolean {
  const { activeMonster, selectedAction } = GameStateUtil.getPlayerState(gs, data.player);
  const isKOd = activeMonster.currentHp === 0;
  const wasKOdThisTurn = !!(selectedAction.action?.key() && ((selectedAction.action as MonsterAction)?.monsterName !== activeMonster.name));
  const isFlinched = activeMonster.modifiers.contains('FLINCHED');
  return isKOd || isFlinched || wasKOdThisTurn;
}

function doMonsterAction(gs: GameState, data: MonsterActionCommandData, rc: UpdateGameStateService) {
  if (skipActionAndDamage(gs, data,)) {
    new RecoilCheckCommand(rc, { ...data }).pushFront();
    return;
  }
  const action = GameStateUtil.getMonsterActionByPlayer(gs, data.player);
  if (action?.isStatus) {
    new RecoilCheckCommand(rc, { ...data }).pushFront();
    gs.battleAniService.update(gs.activePlayerType === data.player, 'USING_SPECIAL');
  }
  data.doMonsterAction();
}

function doStandardAction(gs: GameState, data: StandardActionCommandData, rc: UpdateGameStateService) {
  gs.battleAniService.update(gs.activePlayerType === data.player, 'USING_SPECIAL');
  data.doStandardAction();
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
  if (data.key.includes(monster.key())) return;
  // buff belongs to monster, send belongs command
  rc.enqueue(
    new ApplyBuffBelongsCommand(rc, { key: data.key, player: data.player, gs,  buffName: data.buffName })
  );
}

function applyFlinch(gs: GameState, data: StatModificationData) {
  const monster = GameStateUtil.getMonsterByPlayer(gs, data.player);
  monster.modifiers.add(getMonsterModifier(monster.key(), 'FLINCH'));
}



function applyStatPips(gs: GameState, data: StatPipCommandData) {
  const { activeMonster, statBoard } = GameStateUtil.getPlayerState(gs, data.player);
  activeMonster.modifiers.add(getMonsterModifier('pip', data.statType, statBoard.getSectionFromType(data.statType).current))
  statBoard.getSectionFromType(data.statType).clear();
}

function dealAttackDamage(gs: GameState, data: DealDamageCommandData, rc: UpdateGameStateService) {
  const { player, key } = data;
  const monsterNames = GameStateUtil.getMonsterNames(gs, player);
  if (skipActionAndDamage(gs, data,)) {
    new RecoilCheckCommand(rc, { key, player, ...monsterNames, gs })
    return;
  }
  const attack = GameStateUtil.getMonsterActionByPlayer(gs, player);
  const damage = DamageCalcUtil.calculateDamage(gs, player);
  const opponentPlayer = GameStateUtil.getOppositePlayer(player);
  const { activeMonster: opposingMonster, selectedAction: opposingSelectedAction } = GameStateUtil.getPlayerState(gs, opponentPlayer);
  const action = GameStateUtil.getMonsterActionByPlayer(gs, player);
  const commands = [];
  const attackingMonster = GameStateUtil.getMonsterByPlayer(gs, player);
  if (damage > 0) {
    opposingMonster.takeDamage(damage);
    const message = `${monsterNames.monsterName} used ${attack.name}, which dealt ${damage} damage to ${monsterNames.opponentMonsterName}!`;
    commands.push(new DescriptiveMessageCommand(rc, { key: 'msg', player, message, gs }))
    gs.battleAniService.update(gs.activePlayerType === data.player, attack.attack ? 'ATTACKING' : 'USING_SPECIAL');
  }
  else {
    const message = `${monsterNames.opponentMonsterName} took no damage!`;
    commands.push(new DescriptiveMessageCommand(rc, { key: 'msg', player, message, gs }));
  }
  if (damage > 0 && opposingMonster.currentHp > 0 && GameStateUtil.isFaster(gs, data.player) && attackingMonster.modifiers.contains('FLINCH') && opposingSelectedAction.action.getSelectableActionType() === 'MONSTER') {
    commands.push(new FlinchedCommand(rc, { key: attackingMonster.key(), player: data.player, gs, display: true, ...monsterNames }));
  }
  if (opposingMonster.currentHp === 0) {
    commands.push(new KnockedOutByAttackCommand(rc, { key: action.key(), player, ...monsterNames, gs }));
    commands.push(new KnockedOutCommand(rc, { key: action.key(), player, ...monsterNames, gs, kodMonster: opposingMonster.name, kodPlayer: opponentPlayer, display: true }));
  }
  if (damage > 0 && GameStateUtil.isWeak(gs, data.player) && !action.isStatus) {
    commands.push(new WeakCommand(rc, { key, player: GameStateUtil.getOppositePlayer(player), gs }));
    commands.push(new GainRandomStatPipCommand(rc, {
      ...data,
      amount: 1,
      superEffective: true,
    }));
  }
  commands.push(new RecoilCheckCommand(rc, { key, player, ...monsterNames, gs }));
  commands.reverse().forEach(cmd => cmd.pushFront());
}

function dealDamage(gs: GameState, data: DealDamageCommandData, rc: UpdateGameStateService) {
  const monster = GameStateUtil.getMonsterByPlayer(gs, data.player);
  monster.takeDamage(data.damageToDeal);
  gs.battleAniService.update(gs.activePlayerType === data.player, 'TAKING_DAMAGE');
  if (monster.currentHp === 0) {
    const monsterNames = GameStateUtil.getMonsterNames(gs, data.player);
    new KnockedOutCommand(rc, { 
      key: monster.key(), 
      player: data.player, 
      gs,
      kodMonster: monster.name,
      kodPlayer: data.player,
      ...monsterNames, 
      display: true,
    }).pushFront();
  }
}

function draw(gs: GameState, data: HandCommandData) {
  const pcm = GameStateUtil.getPlayerCardManagerByPlayer(gs, data.player);
  for (let i = 0; i < (data?.amount as number) ?? 1; i++) {
    if (!pcm.hand.hasMaxHandSize()) {
      pcm.drawCard();
    }
  }
}

function gainStatPip(gs: GameState, data: StatPipCommandData) {
  const statBoard = GameStateUtil.getStatBoardByPlayer(gs, data.player);
  statBoard.gain(data.amount, data.statType);
}
function heal(gs: GameState, data: HealCommandData, rc: UpdateGameStateService) {
  const monster = GameStateUtil.getMonsterByPlayer(gs, data.player);
  monster.heal(data.amount);
  const hpDelta = monster.hp - monster.currentHp;
  let amountHealed = 0;
  if (hpDelta >= data.amount) {
    amountHealed = data.amount;
  }
  else if (hpDelta != 0) {
    amountHealed = hpDelta;
  }
  if (amountHealed > 0 && !data.skip) {
    new DescriptiveMessageCommand(rc, {
      ...data,
      message: `${monster.name} healed ${amountHealed}[HP]${data.origin ? ` from ${data.origin}` : ''}.`,
    }).pushFront();
  }
}
function modifyStat(gs: GameState, data: StatModificationData) {
  const monster = GameStateUtil.getMonsterByPlayer(gs, data.player);
  monster.modifiers.add(getMonsterModifier(data.key, data.statType, data.amount))
}
function preventFlinch(gs: GameState, data: StatModificationData) {
  const monster = GameStateUtil.getMonsterByPlayer(gs, data.player);
  monster.modifiers.add(getMonsterModifier(data.key, 'PREVENT_FLINCH', data.amount));
}
function preventRecoil(gs: GameState, data: StatModificationData) {
  const monster = GameStateUtil.getMonsterByPlayer(gs, data.player);
  monster.modifiers.add(getMonsterModifier(data.key, 'PREVENT_RECOIL', data.amount));
}
function flinched(gs: GameState, data: StatModificationData) {
  const monster = GameStateUtil.getMonsterByPlayer(gs, GameStateUtil.getOppositePlayer(data.player));
  monster.modifiers.add(getMonsterModifier(data.key, 'FLINCHED', data.amount));
}
function speedReversed(gs: GameState, data: StatModificationData) {
  const monster = GameStateUtil.getMonsterByPlayer(gs, data.player);
  monster.modifiers.add(getMonsterModifier(data.key, 'SPEED_REVERSED', data.amount));
}


function removeStatusEffect(gs: GameState, data: ApplyStatusEffectCommandData) {
  const monster = GameStateUtil.getMonsterByPlayer(gs, data.player);
  monster.modifiers.remove(data.statusName);
}

function removeStatusEffects(gs: GameState, data: BasicCommandData) {
  const monster = GameStateUtil.getMonsterByPlayer(gs, data.player);
  monster.modifiers.removeStatusEffects();
}

function weak(data: CommandData, rc: UpdateGameStateService) {
  // when a monster is weak, push random pip event for super effective
  return new GainRandomStatPipCommand(rc, { ...data, amount: 1 });
}

function gainSwitchDefense(gs: GameState, data: SwitchCommandData) {
  const monster = GameStateUtil.getMonsterByPlayer(gs, data.player);
  monster.modifiers.add(getMonsterModifier(data.key, 'DEFENSE', monster.getSwitchDefenseValue()))
}

function resistant(gs: GameState, data: BasicCommandData, rc: UpdateGameStateService) {
  const action = GameStateUtil.getMonsterActionByPlayer(gs, getOpposite(data.player));
  const { activeMonster, selectedAction } = GameStateUtil.getPlayerState(gs, data.player);
  // determine if switch defense occurs
  if (activeMonster.resistances.includes(action.element) && selectedAction.action.getSelectableActionType() === 'SWITCH') {
    rc.enqueue(
      new GainSwitchDefenseCommand(rc, { key: data.key, player: data.player, gs })
    );
  }
}

// clean up triggers
// add new triggers
function switchOut(gs: GameState, data: SwitchCommandData, rc: UpdateGameStateService) {
  const { activeMonster } = GameStateUtil.getPlayerState(gs, data.player);
  const switchingToMonster = GameStateUtil.getSwitchingToMonster(gs, data.player);
  const commands = [];
  if (data.type === 'HEAL' && !activeMonster.isAtFullHP()) {
    commands.push(new HealCommand(rc, { ...data, amount: 2 }));
  }
  else if (data.type === 'REMOVE_STATUS') {
    commands.push(new RemoveStatusEffectsCommand(rc, { 
      ...data,
      targetMonster: activeMonster.key(),
      display: true
    }));
  }
  activeMonster.actions.forEach(a => { 
    a.setLocked(false);
    a.setDisabled(false);
  });
  commands.push(new SwitchInCommand(rc, { ...data, gs, player: data.player, display: true }));
  commands.reverse().forEach(cmd => cmd.pushFront());
}

function switchIn(gs: GameState, data: SwitchCommandData, rc: UpdateGameStateService) {
  const { activeMonster, player } = GameStateUtil.getPlayerState(gs, data.player);
  const { selectedAction: opponentAction, activeMonster: opponentActiveMonster } = GameStateUtil.getOpponentPlayerState(gs, data.player);
  if (gs.currentPhaseService.currentTurn === 0) {
    CardByKeyUtil.executeCardByKey(data.key, data.player, rc, gs);
  }
  else {
    gs.battleAniService.update(gs.activePlayerType === data.player, 'SWITCHING_OUT');
    // timeout syncs the animation...clunky
    setTimeout(() => {
      player.switch(data.key);
      CardByKeyUtil.executeCardByKey(data.key, data.player, rc, gs);
    }, 250);
    // gain switch in defense if opponent selected a monster action
    if (!data.isKo && opponentAction.action.getSelectableActionType() === 'MONSTER') {
      const switchingToMonster = GameStateUtil.getSwitchingToMonster(gs, data.player);
      const opponentAttack = GameStateUtil.getMonsterActionByPlayer(gs, GameStateUtil.getOppositePlayer(data.player));
      if (switchingToMonster.resistances.includes(opponentAttack.element)) {
        new StatModificationCommand(rc, { ...data, statType: 'SWITCH_IN_DEFENSE', amount: switchingToMonster.getSwitchDefenseValue(), display: false }).pushFront();
      }
    }
  }
}

function recoilCheck(gs: GameState, data: BasicCommandData, rc: UpdateGameStateService) {
  const monster = GameStateUtil.getMonsterByPlayer(gs, data.player);
  const recoil = monster.modifiers.sumByType('RECOIL');
  if (recoil > 0 && !monster.modifiers.getByType('PREVENT_RECOIL').length) {
    new TakeRecoilDamageCommand(rc, { ...data, display: true, damageToDeal: recoil }).pushFront();
  }
}

function switchRoutine(gs: GameState, data: BasicCommandData, rc: UpdateGameStateService) {
  const { activeMonster } = GameStateUtil.getPlayerState(gs, data.player);
  const cpuCommand = new SwitchOutCommand(rc, { 
    ...data, 
    type: activeMonster.modifiers.hasStatusEffect() ? 'REMOVE_STATUS' : 'HEAL',
  });
  const prompt = new SwitchOutPromptCommand(rc, { ...data });
  if (activeMonster.modifiers.hasStatusEffect()) {
    CommandUtil.handlePrompt(prompt, cpuCommand, gs, data.player, rc);
  }
  else {
    new SwitchOutCommand(rc, { ...data, type: 'HEAL', }).pushFront();
  }
}

function knockoutRoutine(gs: GameState, data: KnockedOutCommandData, rc: UpdateGameStateService) {
  const kodPlayer = data.kodPlayer;
  if (isGameOver(gs, kodPlayer)) {
    new GameOverPhaseCommand(rc, {
      ...data,
      winner: GameStateUtil.getOppositePlayer(kodPlayer),
    }).pushFront();
    return;
  }
  const { inactiveMonsters } = GameStateUtil.getPlayerState(gs, kodPlayer);
  const availableMonsters = inactiveMonsters.filter(m => m.currentHp !== 0);
   // switch to only other option without prompt
  const monsterToSwitchTo = availableMonsters[0];
  const noOptionCommand = new SwitchInCommand(rc, { 
    ...data, 
    gs,
    player: kodPlayer, 
    key: monsterToSwitchTo.key(), 
    isKo: true, 
    display: true,
  });
  const cpuCommand = new SwitchInCommand(rc, { 
    ...data, 
    gs,
    player: kodPlayer, 
    key: monsterToSwitchTo.key(), 
    isKo: true, 
    display: true,
  });
  const prompt = new KnockedOutSwitchInPromptCommand(rc, { 
    ...data, 
    player: kodPlayer, 
    options: inactiveMonsters.map(m => { return { name: m.name, key: m.key() }}),
  });
  if (availableMonsters.length === 1) {
    noOptionCommand.pushFront();
  }
  else {
    CommandUtil.handlePrompt(prompt, cpuCommand, gs, kodPlayer, rc);
  }
}

function crushPrompt(gs: GameState, data: CrushPromptCommandData, rc: UpdateGameStateService) {
  const { statBoard } = GameStateUtil.getPlayerState(gs, data.playerToCrush);
  if (data.player !== gs.activePlayerType && gs.cpu) {
    const total = statBoard.totalPips() >= data.total ? data.total : statBoard.totalPips();
    const options = ArrayUtil.randomizeOrder(
      [...Array(statBoard.attack).keys()].map(v => 'ATTACK')
        .concat([...Array(statBoard.attack).keys()].map(v => 'DEFENSE'))
        .concat([...Array(statBoard.attack).keys()].map(v => 'SPEED')),
      gs.rng,
    );
    const decisions = [ ...Array(total).keys() ].map(o => options.pop());
    const selections: { amount: number, statType: StatBoardSectionType }[] = [
      { amount: decisions.filter(d => d === 'ATTACK').length, statType: 'ATTACK' },
      { amount: decisions.filter(d => d === 'DEFENSE').length, statType: 'DEFENSE' },
      { amount: decisions.filter(d => d === 'SPEED').length, statType: 'SPEED' },
    ];
    crush(gs, { ...data, selections }, rc);
  }
  else if (statBoard.hasPips()) {
    if (gs.activePlayerType === data.player) {
      new CrushPromptCommand(rc, data).pushFront();
    }
    else {
      new WaitingForOpponentCommand(rc, data).pushFront();
    }
  }
}

function crush(gs: GameState, data: CrushCommandData, rc: UpdateGameStateService) {
  const { statBoard } = GameStateUtil.getPlayerState(gs, GameStateUtil.getOppositePlayer(data.player));
  data.selections.forEach(s => statBoard.remove(s.amount, s.statType));
}



function disableMonsterAction(gs: GameState, data: DisableActionCommandData, rc: UpdateGameStateService) {
  if (data.selection.key === 'NONE') return;

  const { activeMonster } = GameStateUtil.getOpponentPlayerState(gs, data.player);
  activeMonster.actions.find(a => a.key() === data.selection.key)?.setDisabled(true);
}

function isGameOver(gs: GameState, player: PlayerType) {
  const playerState = GameStateUtil.getPlayerState(gs, player);
  const monsters = [playerState.activeMonster].concat(playerState.inactiveMonsters);
  return monsters.reduce((accumulator, value) => accumulator + value.currentHp, 0) === 0;
}
