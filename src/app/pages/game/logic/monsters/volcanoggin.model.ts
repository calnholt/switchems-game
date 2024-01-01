import { CommandUtil } from "../../services/update-game-state/command.util";
import { DescriptiveMessageCommand } from "../commands/message-command.model";
import { StatModificationCommand } from "../commands/stat-modification-command.model";
import { GainStatPipCommand } from "../commands/stat-pip-commands.model";
import { MonsterLogic } from "./monster-logic.model";

export class Volcanoggin extends MonsterLogic {

  override addTriggers(): void {
    new StatModificationCommand(this.rc, {
      ...this.data,
      key: 'VOLCANOGGIN_A2',
      amount: 2,
      statType: "ATTACK",
      origin: 'Headbutt',
      monsterActionTrigger: true,
      display: true,
    }).executeAsTrigger('SLOWER');
    new StatModificationCommand(this.rc, {
      ...this.data,
      key: 'VOLCANOGGIN_A4',
      amount: 2,
      statType: "RECOIL",
      origin: 'Explode',
      monsterActionTrigger: true,
      display: true,
    }).executeAsTrigger('SLOWER');
  }
  override switchIn(): void {
    new GainStatPipCommand(this.rc,{
      ...this.data,
      amount: 1,
      statType: 'DEFENSE',
      origin: 'switching in',
      display: true,
    }).enqueue();
  }
  override action1(): void {
  }
  override action2(): void {
  }
  override action3(): void {
    const randomPips = CommandUtil.gainRandomStatPip(this.gs, {
      ...this.data,
      monsterName: '',
      amount: 3,
      display: false,
      origin: 'Enrage'
    }, this.rc);
    new DescriptiveMessageCommand(this.rc, { 
      ...this.data, 
      message: `Volcanoggin ${randomPips.message} and +1 defense from Enrage!`,
    }).pushFront();
    new StatModificationCommand(this.rc, {
      ...this.data,
      amount: 1, 
      statType: "DEFENSE",
      origin: 'Enrage',
    }).pushFront();
  }
  override action4(): void {
  }
  override buff1(): void {
    new StatModificationCommand(this.rc, { 
      ...this.data, 
      amount: 1, 
      statType: 'SPEED', 
      origin: 'Agility',
      display: true,
    }).pushFront();
  }
  override buff2(): void {
    new GainStatPipCommand(this.rc, {
      ...this.data, 
      amount: 2, 
      statType: "SPEED",
      origin: 'Ramp Up',
      display: true,
    }).pushFront();
  }
  override buff3(): void {
    new StatModificationCommand(this.rc, { 
      ...this.data, 
      amount: 1, 
      statType: 'DEFENSE', 
      origin: 'Harden',
      display: true,
    }).pushFront();
  }
  override buff4(): void {
    new GainStatPipCommand(this.rc, {
      ...this.data, 
      amount: 2, 
      statType: "DEFENSE",
      origin: 'Endurance',
      display: true,
    }).pushFront();
  }
  
}