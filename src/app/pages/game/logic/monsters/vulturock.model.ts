import { GameStateUtil } from "../../services/game-state/game-state.util";
import { TriggerUtil } from "../../services/update-game-state/trigger.util";
import { DescriptiveMessageCommand } from "../commands/message-command.model";
import { PreventRecoilCommand } from "../commands/ongoing-turn-commands.model";
import { HealCommand, StatModificationCommand } from "../commands/stat-modification-command.model";
import { GainRandomStatPipCommand, GainStatPipCommand } from "../commands/stat-pip-commands.model";
import { MonsterLogic } from "./monster-logic.model";

export class Vulturock extends MonsterLogic {

  override switchIn(isFront: boolean): void {
    new GainStatPipCommand(this.rc, {
      ...this.data,
      amount: 2,
      statType: 'SPEED',
      origin: 'switching in',
      display: true,
    }).pushFrontOrBack(isFront);
  }
  override addTriggers(): void {
    new HealCommand(this.rc, {
      ...this.data,
      key: 'VULTUROCK_A3',
      amount: 6,
      origin: "Scavenge",
      display: true,
      triggerCondition: TriggerUtil.checkMonsterActionTrigger,
    }).executeAsTrigger('KNOCKED_OUT');
  }
  override action1(): void {
    new GainRandomStatPipCommand(this.rc, {
      ...this.data,
      amount: 1,
      displayRandomPipGain: true,
      origin: 'Kraterkazee',
    }).pushFront();
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
    new DescriptiveMessageCommand(this.rc, { 
      ...this.data, 
      message: "Vulturock gained 3[DEF] Pips and +1[DEF] from Iron Defense!",
    }).pushFront();
    new StatModificationCommand(this.rc, {
      ...this.data,
      amount: 1, 
      statType: "DEFENSE",
      origin: 'Iron Defense',
    }).pushFront();
    new GainStatPipCommand(this.rc, {
      ...this.data, 
      amount: 3, 
      statType: "DEFENSE",
      origin: 'Iron Defense',
    }).pushFront();
  }
  override action4(): void {

  }
  override buff1(): void {
    new StatModificationCommand(this.rc, {
      ...this.data,
      amount: 2,
      statType: 'PIERCE',
      origin: 'Beak Drill',
      display: true,
    }).pushFront();
  }
  override buff2(): void {
    const { monsterAction } = GameStateUtil.getOpponentPlayerState(this.gs, this.player);
    if (monsterAction && monsterAction.attack > 0) {
      new StatModificationCommand(this.rc, {
        ...this.data,
        player: GameStateUtil.getOppositePlayer(this.player),
        amount: 2,
        statType: 'RECOIL',
        origin: 'Hard Headed',
      }).pushFront();
    }
  }
  override buff3(): void {
    new DescriptiveMessageCommand(this.rc, { 
      ...this.data, 
      message: `${this.monsterNames.monsterName} used Self Defense, healing 1[HP] and does not suffer from recoil damage this turn!`,
    }).pushFront();
    new HealCommand(this.rc, {
      ...this.data,
      amount: 1,
    }).pushFront();
    new PreventRecoilCommand(this.rc, {
      ...this.data,
    }).pushFront();
  }
  override buff4(): void {
    new DescriptiveMessageCommand(this.rc, { 
      ...this.data, 
      message: `${this.monsterNames.monsterName} gains +2[ATK] and recoil 1 from Bigger Rocs!`,
    }).pushFront();
    new StatModificationCommand(this.rc, {
      ...this.data,
      amount: 2,
      statType: 'ATTACK',
      origin: 'Bigger Rocs',
    }).pushFront();
    new StatModificationCommand(this.rc, {
      ...this.data,
      amount: 1,
      statType: 'RECOIL',
      origin: 'Bigger Rocs',
    }).pushFront();
  }
  
  

}