import { HealCommand, StatModificationCommand } from "../commands/stat-modification-command.model";
import { GainStatPipCommand } from "../commands/stat-pip-commands.model";
import { MonsterLogic } from "./monster-logic.model";

export class Deusvolt extends MonsterLogic {

  override addTriggers(): void {
    new HealCommand(this.rc, {
      ...this.data,
      key: 'DEUSVOLT_A4',
      amount: 2,
      origin: 'Gnaw',
      monsterActionTrigger: true,
    }).executeAsTrigger('FASTER');
  }
  override switchIn(isFront: boolean): void {
    new GainStatPipCommand(this.rc,{
      ...this.data,
      amount: 2,
      statType: 'SPEED',
      origin: 'switching in',
      display: true,
    }).pushFrontOrBack(isFront);
  }
  override action1(): void {
  }
  override action2(): void {
    new GainStatPipCommand(this.rc,{
      ...this.data,
      amount: 2,
      statType: 'ATTACK',
      origin: 'Charge Up',
      display: true,
    }).pushFront();
  }
  override action3(): void {
  }
  override action4(): void {
  }
  override buff1(): void {
    new StatModificationCommand(this.rc, { 
      ...this.data, 
      amount: 1, 
      statType: 'ATTACK', 
      origin: 'Bless',
      display: true,
    }).pushFront();
  }
  override buff2(): void {
    new StatModificationCommand(this.rc, { 
      ...this.data, 
      amount: 1, 
      statType: 'ATTACK', 
      origin: 'Bless',
      display: true,
    }).pushFront();
  }
  override buff3(): void {
    new StatModificationCommand(this.rc, { 
      ...this.data, 
      amount: 1, 
      statType: 'DEFENSE', 
      origin: 'Shield of Faith',
      display: true,
    }).pushFront();
  }
  override buff4(): void {
    new StatModificationCommand(this.rc, { 
      ...this.data, 
      amount: 1, 
      statType: 'DEFENSE', 
      origin: 'Shield of Faith',
      display: true,
    }).pushFront();
  }


}