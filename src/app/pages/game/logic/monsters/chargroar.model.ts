import { GameStateUtil } from "../../services/game-state/game-state.util";
import { CommandUtil } from "../../services/update-game-state/command.util";
import { DescriptiveMessageCommand } from "../commands/message-command.model";
import { DisableActionPromptCommand } from "../commands/monster-action-commands.model";
import { StatModificationCommand, StatModificationData } from "../commands/stat-modification-command.model";
import { GainStatPipCommand, StatPipCommandData } from "../commands/stat-pip-commands.model";
import { MonsterLogic } from "./monster-logic.model";

export class Chargroar extends MonsterLogic {

  override addTriggers(): void {
    // switch in
    new DisableActionPromptCommand(this.rc, this.data).executeAsTrigger('SWITCH_IN');
    new StatModificationCommand(this.rc, { 
      ...this.data, 
      amount: 1, 
      statType: 'PIERCE', 
      ongoing: true, 
      display: true,
      origin: 'Blazing Roar',
    }).executeAsTrigger('APPLY_BUFF');
  }
  override action1(): void {
    if (GameStateUtil.isFaster(this.gs, this.player)) {
      const data: StatModificationData = {
        ...this.data,
        amount: 3,
        statType: "ATTACK",
        origin: 'Lightning Fang',
      };
      new StatModificationCommand(this.rc, data).enqueue();
    }
  }

  override action2(): void {
    const data: StatPipCommandData = {
      ...this.data,
      amount: 2,
      statType: "SPEED",
      destroyOnTrigger: true, 
      display: true, 
      origin: 'Lights Out'
    };
    new GainStatPipCommand(this.rc, data).executeAsTrigger('KNOCKED_OUT_BY_ATTACK');
  }

  override action3(): void {
    const data1: StatPipCommandData = {
      ...this.data, 
      amount: 3, 
      statType: "ATTACK",
      origin: 'Hypercharge',
    };
    new GainStatPipCommand(this.rc, data1).enqueue();
    const data2: StatModificationData = {
      ...this.data,
      amount: 1, 
      statType: "DEFENSE",
      origin: 'Hypercharge',
    }
    new StatModificationCommand(this.rc, data2).enqueue();
    const msgData = { 
      ...this.data, 
      message: "Chargoar gained 3 attack pips and +1 defense from Hypercharge!",
    }
    new DescriptiveMessageCommand(this.rc, msgData).enqueue();
  }

  override action4(): void {
    const data = {
      ...this.data,
      amount: 1,
      display: true,
      origin: 'Blazing Roar'
    }
    CommandUtil.gainRandomStatPip(this.gs, data, this.rc);
  }

  override buff1(): void {
    const value = GameStateUtil.opponentHasKnockedOutMonster(this.gs, this.player) ? 2 : 1;
    const data: StatModificationData = {
      ...this.data, 
      amount: value,
      statType: 'SPEED',
      origin: 'Charge',
      display: true,
    }
    new StatModificationCommand(this.rc, data).enqueue();
  }

  override buff2(): void {
    const value = GameStateUtil.opponentHasKnockedOutMonster(this.gs, this.player) ? 2 : 1;
    const data: StatModificationData = {
      ...this.data, 
      amount: value,
      statType: 'ATTACK',
      origin: 'Roar',
      display: true,
    }
    new StatModificationCommand(this.rc, data).enqueue();
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