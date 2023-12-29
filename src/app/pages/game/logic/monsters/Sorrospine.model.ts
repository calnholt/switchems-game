import { HealCommand, StatModificationCommand } from "../commands/stat-modification-command.model";
import { GainRandomStatPipCommand } from "../commands/stat-pip-commands.model";
import { MonsterLogic } from "./monster-logic.model";

export class Sorrospine extends MonsterLogic {

  override addTriggers(): void {

    new GainRandomStatPipCommand(this.rc, {
      ...this.data,
      amount: 1,
      origin: `Sorrowspine's passive ability`,
      monsterActionTrigger: true,
      displayRandomPipGain: true,
    }).executeAsTrigger('END_PHASE');

    new HealCommand(this.rc, {
      ...this.data,
      amount: 2,
      monsterActionTrigger: true,
      origin: 'Super Poke',
      display: true,
    }).executeAsTrigger('FASTER');

  }
  override switchIn(): void {
  }
  override action1(): void {
    new StatModificationCommand(this.rc, {
      ...this.data,
      amount: 3, 
      statType: "DEFENSE",
      origin: 'Wallow',
      display: true,
    }).pushFront();
  }
  override action2(): void {
    new HealCommand(this.rc, {
      ...this.data,
      amount: 1,
      origin: 'Nap',
      display: true,
    }).pushFront();
  }
  override action3(): void {
  }
  override action4(): void {
  }
  override buff1(): void {
    new HealCommand(this.rc, {
      ...this.data,
      amount: 2,
      origin: 'Rest',
      display: true,
    }).pushFront();
  }
  override buff2(): void {
    new StatModificationCommand(this.rc, {
      ...this.data,
      amount: 1, 
      statType: "SPEED",
      origin: 'Surprise',
      display: true,
    }).pushFront();
  }
  override buff3(): void {
    new StatModificationCommand(this.rc, {
      ...this.data,
      amount: 1, 
      statType: "DEFENSE",
      origin: 'Pout',
      display: true,
    }).pushFront();
  }
  override buff4(): void {
    new GainRandomStatPipCommand(this.rc, {
      ...this.data,
      amount: 2,
      origin: `Stumble`,
      displayRandomPipGain: true,
    }).pushFront();
  }
  
}