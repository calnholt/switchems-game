import { GameStateUtil } from "../../services/game-state/game-state.util";
import { CommandUtil } from "../../services/update-game-state/command.util";
import { UpdateGameStateUtil } from "../../services/update-game-state/update-game-state.util";
import { DescriptiveMessageCommand } from "../commands/message-command.model";
import { ApplyFlinchCommand, HealCommand, StatModificationCommand } from "../commands/stat-modification-command.model";
import { CrushCommand, GainStatPipCommand } from "../commands/stat-pip-commands.model";
import { MonsterLogic } from "./monster-logic.model";

export class Stalagrowth extends MonsterLogic {
  override addTriggers(): void {
    new GainStatPipCommand(this.rc,{
      ...this.data,
      amount: 1,
      statType: 'DEFENSE',
      origin: 'switching in',
      display: true,
    }).pushFront();
  }
  override action1(): void {
    // throw new Error("Method not implemented.");
  }
  override action2(): void {
    // throw new Error("Method not implemented.");
  }
  override action3(): void {
    new ApplyFlinchCommand(this.rc, {
      ...this.data,
      display: true,
    }).pushFront();
  }
  override action4(): void {
    const { message } = CommandUtil.gainRandomStatPip(this.gs, {
      ...this.data,
      amount: 2,
      origin: 'Skewer'
    }, this.rc);
    new DescriptiveMessageCommand(this.rc, {
      ...this.data,
      message: `${this.monsterNames.monsterName} used Skewer, ${message}.`,
      display: true 
    }).pushFront();
  }
  override buff1(): void {
    new HealCommand(this.rc, {
      ...this.data,
      amount: GameStateUtil.getMonsterByPlayer(this.gs, GameStateUtil.getOppositePlayer(this.player)).modifiers.hasStatusEffect() ? 2 : 1,
      origin: 'Regrowth',
      display: true,
    }).pushFront();
  }
  override buff2(): void {
    new StatModificationCommand(this.rc, {
      ...this.data,
      amount: 3,
      statType: 'DEFENSE',
      display: true,
      origin: 'Mossy Overgrowth',
    }).pushFront();
  }
  override buff3(): void {
    new GainStatPipCommand(this.rc,{
      ...this.data,
      amount: 2,
      statType: 'DEFENSE',
      origin: 'Rock Polish',
      display: true,
    }).pushFront();
  }
  override buff4(): void {
    UpdateGameStateUtil.crushPrompt(this.gs, {  
      ...this.data,
      total: 2,
      origin: 'Life Siphon',
      display: true,
    }, this.rc);
    new HealCommand(this.rc, {
      ...this.data,
      triggerCondition: (command: CrushCommand) => { return command.data.selections.reduce((acc, value) => acc + value.amount, 0) >= 2 },
      amount: 1,
      origin: 'Life Siphon',
      display: true,
      destroyOnTrigger: true,
      removeEotTrigger: true,
    }).executeAsTrigger('CRUSH');
  }

  

}