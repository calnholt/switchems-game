import { StatBoardSectionType } from "../../models/stat-board/stat-board.model";
import { GameStateUtil } from "../../services/game-state/game-state.util";
import { CommandUtil } from "../../services/update-game-state/command.util";
import { UpdateGameStateUtil } from "../../services/update-game-state/update-game-state.util";
import { DescriptiveMessageCommand } from "../commands/message-command.model";
import { ApplyFatigueStatus } from "../commands/monster-action-commands.model";
import {  StatModificationCommand } from "../commands/stat-modification-command.model";
import { CrushCommand, CrushCommandData, GainRandomStatPipCommand, GainStatPipCommand } from "../commands/stat-pip-commands.model";
import { ConditionalTriggerCommand } from "../commands/trigger-command.model";
import { MonsterLogic } from "./monster-logic.model";

export class Drownigator extends MonsterLogic {

  override addTriggers(): void {
    new GainStatPipCommand(this.rc, {
      ...this.data,
      key: 'DROWNIGATOR_A4',
      amount: 1,
      statType: "ATTACK",
      monsterActionTrigger: true,
      display: true, 
      origin: 'Surge'
    }).executeAsTrigger('FASTER');
  }
  override switchIn(isFront: boolean): void {
    CommandUtil.draw(this.gs, {
      ...this.data,
      amount: 1,
      origin: 'Drownigator switching in',
      display: true,
    }, this.rc);
  }
  override action1(): void {
    new GainStatPipCommand(this.rc,{
      ...this.data,
      amount: 1,
      statType: 'DEFENSE',
      origin: 'From  the Depths',
      display: true,
    }).pushFront();
    new ApplyFatigueStatus(this.rc, {
      ...this.data,
      origin: 'From  the Depths',
      display: true,
    }).pushFront();
  }
  override action2(): void {
    const { activeMonster } = GameStateUtil.getPlayerState(this.gs, this.gs.opponentPlayerType);
    if (activeMonster.modifiers.hasStatusEffect()) {
      new GainRandomStatPipCommand(this.rc, {
        ...this.data,
        amount: 2,
        origin: `Expunge`,
        displayRandomPipGain: true,
      }).pushFront();
    }
  }
  override action3(): void {
    const randomPips = CommandUtil.gainRandomStatPip(this.gs, {
      ...this.data,
      monsterName: '',
      amount: 1,
      display: false,
      origin: 'Swamped'
    }, this.rc);
    new DescriptiveMessageCommand(this.rc, { 
      ...this.data, 
      message: `Drownigator ${randomPips.message} and 2[SPD] Pips from Swamped!`,
    }).pushFront();
    new GainStatPipCommand(this.rc,{
      ...this.data,
      amount: 1,
      statType: 'SPEED',
      origin: 'Swamped',
      display: false,
    }).pushFront();
  }
  override action4(): void {

  }
  override buff1(): void {
    UpdateGameStateUtil.crushPrompt(this.gs, {  
      ...this.data,
      total: 1,
      origin: 'Abrupt Weakness',
      display: true,
    }, this.rc);

    new ConditionalTriggerCommand(this.rc, {
      ...this.data,
      triggerCondition: (command: CrushCommand) => { return command.data.selections.reduce((acc, value) => acc + value.amount, 0) >= 1 },
      getConditionalTrigger: (command: CrushCommandData) => {
        return new GainStatPipCommand(this.rc, {
          ...this.data,
          amount: command.selections.find(s => s.amount)?.amount ?? 1,
          statType: command.selections.find(s => s.amount)?.statType as StatBoardSectionType,
          origin: 'Abrupt Weakness',
          display: true,
          destroyOnTrigger: true,
          removeEotTrigger: true,
        }); 
      },
    }).executeAsTrigger('CRUSH');
  }
  override buff2(): void {
    // TODO:
  }
  override buff3(): void {
    UpdateGameStateUtil.crushPrompt(this.gs, {  
      ...this.data,
      total: 4,
      origin: 'Cripple',
      display: true,
    }, this.rc);
  }
  override buff4(): void {
    new DescriptiveMessageCommand(this.rc, { 
      ...this.data, 
      message: "Drownigator gained 1 recoil, 2[ATK] Pips and 2[DEF] Pips from Tremble!",
    }).pushFront();
    new StatModificationCommand(this.rc, {
      ...this.data,
      amount: 1,
      statType: 'RECOIL',
      display: false,
      origin: 'Tremble',
    }).pushFront();
    new GainStatPipCommand(this.rc,{
      ...this.data,
      amount: 2,
      statType: 'SPEED',
      origin: 'Tremble',
      display: false,
    }).pushFront();
    new GainStatPipCommand(this.rc,{
      ...this.data,
      amount: 2,
      statType: 'ATTACK',
      origin: 'Tremble',
      display: false,
    }).pushFront();
  }


  
}