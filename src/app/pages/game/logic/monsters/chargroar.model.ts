import { GameStateUtil } from "../../services/game-state/game-state.util";
import { CommandUtil } from "../../services/update-game-state/command.util";
import { DescriptiveMessageCommand } from "../commands/message-command.model";
import { DisableActionPromptCommand } from "../commands/monster-action-commands.model";
import { StatModificationCommand } from "../commands/stat-modification-command.model";
import { GainStatPipCommand } from "../commands/stat-pip-commands.model";
import { MonsterLogic } from "./monster-logic.model";

export class Chargroar extends MonsterLogic {

  override addTriggers(): void {
    // TODO:
    // switch in
    new DisableActionPromptCommand(this.rc, { ...this.data, destroyOnTrigger: true }).executeAsTrigger('SWITCH_IN');
  }
  override action1(): void {
    new StatModificationCommand(this.rc, {
      ...this.data,
      key: 'CHARGROAR_A0',
      amount: 3,
      statType: "ATTACK",
      origin: 'Lightning Fang',
      destroyOnTrigger: true, 
      removeEotTrigger: true,
    }).executeAsTrigger('FASTER');
  }

  override action2(): void {
    new GainStatPipCommand(this.rc, {
      ...this.data,
      key: 'CHARGROAR_A1',
      amount: 2,
      statType: "SPEED",
      destroyOnTrigger: true, 
      removeEotTrigger: true,
      display: true, 
      origin: 'Lights Out'
    }).executeAsTrigger('KNOCKED_OUT_BY_ATTACK');
  }

  override action3(): void {
    new GainStatPipCommand(this.rc, {
      ...this.data, 
      amount: 3, 
      statType: "ATTACK",
      origin: 'Hypercharge',
    }).enqueue();
    new StatModificationCommand(this.rc, {
      ...this.data,
      amount: 1, 
      statType: "DEFENSE",
      origin: 'Hypercharge',
    }).enqueue();
    new DescriptiveMessageCommand(this.rc, { 
      ...this.data, 
      message: "Chargoar gained 3 attack pips and +1 defense from Hypercharge!",
    }).enqueue();
  }

  override action4(): void {
    // trigger
    new StatModificationCommand(this.rc, { 
      ...this.data, 
      key: 'CHARGROAR_A3',
      amount: 1, 
      statType: 'PIERCE', 
      removeOnSwitchTrigger: true,
      removeEotTrigger: true,
      display: true,
      origin: 'Blazing Roar',
    }).executeAsTrigger('APPLY_BUFF');
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
    }).enqueue();
  }

  override buff2(): void {
    new StatModificationCommand(this.rc, {
      ...this.data, 
      amount: GameStateUtil.opponentHasKnockedOutMonster(this.gs, this.player) ? 2 : 1,
      statType: 'ATTACK',
      origin: 'Roar',
      display: true,
    }).enqueue();
  }

  override buff3(): void {
    if (GameStateUtil.isResistant(this.gs, this.player)) {
      new StatModificationCommand(this.rc, { ...this.data, amount: 1, statType: 'ATTACK' }).enqueue();
      new StatModificationCommand(this.rc, { ...this.data, amount: 2, statType: 'SPEED' }).enqueue();
      new DescriptiveMessageCommand(this.rc, { ...this.data, message: `${this.monsterNames.monsterName} gained 1 attack and 2 speed from Revenge!` }).enqueue();
    }
    else {
      new StatModificationCommand(this.rc, { ...this.data, amount: 1, statType: 'RECOIL', display: true, origin: 'Revenge' }).enqueue();
    }
  }

  override buff4(): void {
    if (GameStateUtil.isWeak(this.gs, this.player)) {
      new StatModificationCommand(this.rc, { ...this.data, amount: 1, statType: 'ATTACK' }).enqueue();
      new StatModificationCommand(this.rc, { ...this.data, amount: 2, statType: 'SPEED' }).enqueue();
      new DescriptiveMessageCommand(this.rc, { ...this.data, message: `${this.monsterNames.monsterName} gained 1 attack and 2 speed from Revenge!` }).enqueue();
    }
    else {
      new StatModificationCommand(this.rc, { ...this.data, amount: 1, statType: 'RECOIL', display: true, origin: 'Prey Upon' }).enqueue();
    }
  }
}