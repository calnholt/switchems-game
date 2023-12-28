import { ArrayUtil } from "~/app/shared/utils/array.util";
import { GameStateUtil } from "../../services/game-state/game-state.util";
import { CommandUtil } from "../../services/update-game-state/command.util";
import { DescriptiveMessageCommand } from "../commands/message-command.model";
import { DisableActionCommand, DisableActionPromptCommand } from "../commands/monster-action-commands.model";
import { StatModificationCommand } from "../commands/stat-modification-command.model";
import { GainStatPipCommand } from "../commands/stat-pip-commands.model";
import { MonsterLogic } from "./monster-logic.model";

export class Chargroar extends MonsterLogic {

  override switchIn(): void {
    const { activeMonster } = GameStateUtil.getOpponentPlayerState(this.gs, this.data.player);
    const options = activeMonster.actions
        .filter(a => !a.isDisabled && !a.isLocked)
        .map(a => { return { key: a.key(), name: a.name }});
    if (this.gs.cpu && this.player === 'O') {
      const selection = options[ArrayUtil.getRandomIndex(options.length, this.gs.rng)];
      new DisableActionCommand(this.rc, {
        ...this.data,
        destroyOnTrigger: true,
        display: true,
        selection,
      }).pushFront();
    }
    else {
      new DisableActionPromptCommand(this.rc, { ...this.data, destroyOnTrigger: true, options, display: true }).pushFront();
    }
  }

  override addTriggers(): void {
    // action triggers
    new GainStatPipCommand(this.rc, {
      ...this.data,
      key: 'CHARGROAR_A2',
      amount: 2,
      statType: "SPEED",
      monsterActionTrigger: true,
      display: true, 
      origin: 'Lights Out'
    }).executeAsTrigger('KNOCKED_OUT_BY_ATTACK');

    new StatModificationCommand(this.rc, {
      ...this.data,
      key: 'CHARGROAR_A1',
      amount: 3,
      statType: "ATTACK",
      origin: 'Lightning Fang',
      monsterActionTrigger: true,
    }).executeAsTrigger('FASTER');

    new StatModificationCommand(this.rc, { 
      ...this.data, 
      key: 'CHARGROAR_A3',
      amount: 1, 
      statType: 'PIERCE', 
      monsterActionTrigger: true,
      display: true,
      origin: 'Blazing Roar',
    }).executeAsTrigger('APPLY_BUFF');
  
  }
  override action1(): void {

  }

  override action2(): void {

  }

  override action3(): void {
    new GainStatPipCommand(this.rc, {
      ...this.data, 
      amount: 3, 
      statType: "ATTACK",
      origin: 'Hypercharge',
    }).pushFront();
    new StatModificationCommand(this.rc, {
      ...this.data,
      amount: 1, 
      statType: "DEFENSE",
      origin: 'Hypercharge',
    }).pushFront();
    new DescriptiveMessageCommand(this.rc, { 
      ...this.data, 
      message: "Chargoar gained 3 attack pips and +1 defense from Hypercharge!",
    }).pushFront();
  }

  override action4(): void {
    CommandUtil.gainRandomStatPip(this.gs, {
      ...this.data,
      amount: 1,
      display: true,
      origin: 'Blazing Roar'
    }, this.rc);
  }

  override buff1(): void {
    new StatModificationCommand(this.rc, {
      ...this.data, 
      amount: GameStateUtil.opponentHasKnockedOutMonster(this.gs, this.player) ? 2 : 1,
      statType: 'SPEED',
      origin: 'Charge',
      display: true,
    }).pushFront();
  }

  override buff2(): void {
    new StatModificationCommand(this.rc, {
      ...this.data, 
      amount: GameStateUtil.opponentHasKnockedOutMonster(this.gs, this.player) ? 2 : 1,
      statType: 'ATTACK',
      origin: 'Roar',
      display: true,
    }).pushFront();
  }

  override buff3(): void {
    if (GameStateUtil.isResistant(this.gs, this.player)) {
      new DescriptiveMessageCommand(this.rc, { ...this.data, message: `${this.monsterNames.monsterName} gained 1 attack and 2 speed from Revenge!` }).pushFront();
      new StatModificationCommand(this.rc, { ...this.data, amount: 1, statType: 'ATTACK' }).pushFront();
      new StatModificationCommand(this.rc, { ...this.data, amount: 2, statType: 'SPEED' }).pushFront();
    }
    else {
      new StatModificationCommand(this.rc, { ...this.data, amount: 1, statType: 'RECOIL', display: true, origin: 'Revenge' }).pushFront();
    }
  }

  override buff4(): void {
    if (GameStateUtil.isWeak(this.gs, this.player)) {
      new DescriptiveMessageCommand(this.rc, { ...this.data, message: `${this.monsterNames.monsterName} gained 1 attack and 2 speed from Revenge!` }).pushFront();
      new StatModificationCommand(this.rc, { ...this.data, amount: 1, statType: 'ATTACK' }).pushFront();
      new StatModificationCommand(this.rc, { ...this.data, amount: 2, statType: 'SPEED' }).pushFront();
    }
    else {
      new StatModificationCommand(this.rc, { ...this.data, amount: 1, statType: 'RECOIL', display: true, origin: 'Prey Upon' }).pushFront();
    }
  }
}