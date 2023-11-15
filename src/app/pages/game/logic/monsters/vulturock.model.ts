import { GameStateUtil } from "../../services/game-state/game-state.util";
import { CommandUtil } from "../../services/update-game-state/command.util";
import { DescriptiveMessageCommand } from "../commands/message-command.model";
import { PreventRecoilCommand } from "../commands/ongoing-turn-commands.model";
import { HealCommand, StatModificationCommand } from "../commands/stat-modification-command.model";
import { GainStatPipCommand } from "../commands/stat-pip-commands.model";
import { MonsterLogic } from "./monster-logic.model";

export class Vulturock extends MonsterLogic {

  override addTriggers(): void {
    new GainStatPipCommand(this.rc, {
      ...this.data,
      amount: 2,
      statType: 'SPEED',
      key: 'VULTUROCK',
      destroyOnTrigger: true,
      origin: 'Switch In'
    }).executeAsTrigger('SWITCH_IN');
  }
  override action1(): void {
    CommandUtil.gainRandomStatPip(this.gs, {
      ...this.data,
      amount: 1,
      origin: 'Kraterkazee',
      display: true,
    }, this.rc);
    new StatModificationCommand(this.rc, {
      ...this.data,
      amount: 2,
      statType: 'RECOIL',
      origin: 'Kraterkazee',
    }).pushFront();
  }
  override action2(): void {
    new StatModificationCommand(this.rc, {
      ...this.data,
      amount: 1,
      statType: 'RECOIL',
      origin: 'Roc Rock',
    }).pushFront();
  }
  override action3(): void {
    new GainStatPipCommand(this.rc, {
      ...this.data, 
      amount: 3, 
      statType: "DEFENSE",
      origin: 'Iron Defense',
    }).enqueue();
    new StatModificationCommand(this.rc, {
      ...this.data,
      amount: 1, 
      statType: "DEFENSE",
      origin: 'Iron Defense',
    }).enqueue();
    new DescriptiveMessageCommand(this.rc, { 
      ...this.data, 
      message: "Vulturock gained 3 defense pips and +1 defense from Iron Defense!",
    }).enqueue();
  }
  override action4(): void {
    const data = {
      ...this.data,
      amount: 6,
      origin: "Scavenge",
      display: true,
    };
    new HealCommand(this.rc, data).executeAsTrigger('KNOCKED_OUT');
  }
  override buff1(): void {
    new StatModificationCommand(this.rc, {
      ...this.data,
      amount: 2,
      statType: 'PIERCE',
      origin: 'Beak Drill',
      display: true,
    }).enqueue();
  }
  override buff2(): void {
    const { monsterAction } = GameStateUtil.getOpponentPlayerState(this.gs, this.player);
    if (monsterAction && monsterAction.attack > 0) {
      new StatModificationCommand(this.rc, {
        ...this.data,
        monsterName: this.monsterNames.opponentMonsterName,
        amount: 2,
        statType: 'RECOIL',
        origin: 'Hard Headed',
      }).enqueue();
    }
  }
  override buff3(): void {
    new HealCommand(this.rc, {
      ...this.data,
      amount: 1,
    }).enqueue();
    new PreventRecoilCommand(this.rc, {
      ...this.data,
    }).enqueue();
    new DescriptiveMessageCommand(this.rc, { 
      ...this.data, 
      message: `${this.monsterNames.monsterName} used Self Defense, healing 1HP and does not suffer from recoil damage this turn!`,
    }).enqueue();
  }
  override buff4(): void {
    new StatModificationCommand(this.rc, {
      ...this.data,
      amount: 2,
      statType: 'ATTACK',
      origin: 'Bigger Rocs',
    }).enqueue();
    new StatModificationCommand(this.rc, {
      ...this.data,
      amount: 1,
      statType: 'RECOIL',
      origin: 'Bigger Rocs',
    }).enqueue();
    new DescriptiveMessageCommand(this.rc, { 
      ...this.data, 
      message: `${this.monsterNames.monsterName} gains +2 attack and recoil 1 from Bigger Rocs!`,
    }).enqueue();
  }
  
  

}