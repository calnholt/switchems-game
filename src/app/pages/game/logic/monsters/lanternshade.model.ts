import { GameStateUtil } from "../../services/game-state/game-state.util";
import { ApplyCurseStatus } from "../commands/monster-action-commands.model";
import { HealCommand, StatModificationCommand } from "../commands/stat-modification-command.model";
import { GainRandomStatPipCommand, GainStatPipCommand } from "../commands/stat-pip-commands.model";
import { MonsterLogic } from "./monster-logic.model";

export class Lanternshade extends MonsterLogic {

  override addTriggers(): void {
  }
  override switchIn(isFront: boolean): void {
    new ApplyCurseStatus(this.rc, {
      ...this.data,
      origin: `Lanternshade's switch in ability`,
      display: true,
    }).pushFrontOrBack(isFront);
  }
  override action1(): void {
    const { activeMonster } = GameStateUtil.getOpponentPlayerState(this.gs, this.player);
    if (activeMonster.modifiers.hasStatusEffect()) {
      new GainRandomStatPipCommand(this.rc, {
        ...this.data,
        amount: 1,
        displayRandomPipGain: true,
        origin: 'Flicker',
      }).pushFront();
    }
  }
  override action2(): void {
    const { activeMonster } = GameStateUtil.getOpponentPlayerState(this.gs, this.player);
    if (activeMonster.modifiers.hasStatusEffect()) {
      new StatModificationCommand(this.rc, {
        ...this.data,
        amount: activeMonster.modifiers.modifiers.filter(m => m.status()).length,
        statType: 'ATTACK',
        origin: 'Ignite',
        display: true,
      }).pushFront();
    }
  }
  override action3(): void {
    const { activeMonster } = GameStateUtil.getOpponentPlayerState(this.gs, this.player);
    if (activeMonster.modifiers.hasStatusEffect()) {
      new StatModificationCommand(this.rc, {
        ...this.data,
        amount: activeMonster.modifiers.modifiers.filter(m => m.status()).length,
        statType: 'ATTACK',
        origin: 'Expose Weakness',
        display: true,
      }).pushFront();
    }
  }
  override action4(): void {
    const { selectedAction } = GameStateUtil.getOpponentPlayerState(this.gs, this.player);
    if (selectedAction.action.getSelectableActionType() === 'SWITCH') {
      new ApplyCurseStatus(this.rc, {
        ...this.data,
        origin: `Spreading Curse`,
        display: true,
      }).pushFront();
    }
    new GainStatPipCommand(this.rc, {
      ...this.data,
      amount: 1,
      statType: 'DEFENSE',
      display: true,
    }).pushFront();
  }
  override buff1(): void {
    const { selectedAction } = GameStateUtil.getPlayerState(this.gs, this.player);
    if (selectedAction.appliedBuffs.length > 1) {
      new ApplyCurseStatus(this.rc, {
        ...this.data,
        origin: `Infusion`,
        display: true,
      }).pushFront();
    }
  }
  override buff2(): void {
    new HealCommand(this.rc, {
      ...this.data,
      amount: 1,
      origin: 'Shade',
      display: true,
    }).pushFront();
  }
  override buff3(): void {
    new StatModificationCommand(this.rc, {
      ...this.data,
      amount: 2,
      statType: 'SPEED',
      origin: 'Chase',
      display: true,
    }).pushFront();
  }
  override buff4(): void {
    new GainStatPipCommand(this.rc, {
      ...this.data,
      amount: 1,
      statType: 'ATTACK',
      origin: 'Fuel Up',
      display: true,
    }).pushFront();
  }
  
}