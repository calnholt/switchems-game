import { Injectable } from '@angular/core';
import { CommandData, EventCommand, EventCommandType } from '../../logic/commands/event-command.model';
import { GameStateService } from '../game-state/game-state.service';
import { UpdateGameStateUtil } from './update-game-state.util';
import { EventCommandQueueService } from '../event-command-queue/event-command-queue.service';
import { GamePhaseUtil } from './game-phase.util';
import { CommandUtil } from './command.util';
import { KnockedOutCommand } from '../../logic/commands/monster-action-commands.model';
import { GameStateUtil } from '../game-state/game-state.util';

@Injectable({
  providedIn: 'root'
})
export class UpdateGameStateService {

  constructor(
    private gameStateService: GameStateService,
    private ecqs: EventCommandQueueService,
  ) { }

  // functions that take EventCommandQueueService as param can potentially add new commands to the queue
  public execute(ec: EventCommand<CommandData>) {
    const gs = this.gameStateService.getGameState();
    // TODO: kinda bad
    const data = ec.data as any;
    switch(ec.type) {
      case 'APPLY_BUFF':
        UpdateGameStateUtil.applyBuff(gs, data, this);
        break;
      case 'APPLY_BUFF_BELONGS': // trigger
        break;
      case 'APPLY_FLINCH': 
        UpdateGameStateUtil.applyFlinch(gs, data);
        break;
      case 'APPLY_STATUS_EFFECT':
        UpdateGameStateUtil.applyStatusEffect(gs, data);
        break;
      case 'APPLY_STAT_PIPS':
        UpdateGameStateUtil.applyStatPips(gs, data);
        break;
      case 'BUFF':
        data.doBuff();
        break;
      case 'CRUSH':
        UpdateGameStateUtil.crush(gs, data, this);
        break;
      case 'DEAL_ATTACK_DAMAGE':
        UpdateGameStateUtil.dealAttackDamage(gs, data, this);
        break;
      // TODO: requires decision
      case 'DISABLE_ACTION_PROMPT':
        break;
      // TODO: requires decision
      case 'DISCARD':
        break;
      // TODO: requires decision
      case 'DISCARD_PIPS':
        break;
      case 'DRAW':
      case 'DRAW_FROM_ICON':
        UpdateGameStateUtil.draw(gs, data);
        break;
      case 'FASTER': // trigger
        break;
      case 'FLINCHED':
        UpdateGameStateUtil.flinched(gs, data);
        break;
      case 'FLIP_BELONGS':
        break;
      case 'GAIN_SWITCH_DEFENSE':
        UpdateGameStateUtil.gainSwitchDefense(gs, data);
        break;
      case 'GAIN_RANDOM_STAT_PIP':
        CommandUtil.gainRandomStatPip(gs, data, this);
        break;
      case 'GAIN_STAT_PIP':
        UpdateGameStateUtil.gainStatPip(gs, data);
        break;
      case 'HEAL':
        UpdateGameStateUtil.heal(gs, data);
        break;
      case 'KNOCKED_OUT':
        UpdateGameStateUtil.knockoutRoutine(gs, data, this);
        break;
      case 'KNOCKED_OUT_BY_ATTACK':
        new KnockedOutCommand(this, { ...data, display: false }).enqueue();
        break;
      case 'MODIFY_STAT':
        UpdateGameStateUtil.modifyStat(gs, data);
        break;
      case 'MONSTER_ACTION':
        UpdateGameStateUtil.doMonsterAction(gs, data, this);
        break;
      case 'PREVENT_FLINCH':
        UpdateGameStateUtil.preventFlinch(gs, data);
        break;
      case 'PREVENT_RECOIL':
        UpdateGameStateUtil.preventRecoil(gs, data);
        break;
      case 'RANDOM_DISCARD':
        break;
      case 'RECOIL_CHECK':
        UpdateGameStateUtil.recoilCheck(gs, data, this);
        break;
      case 'REMOVE_STATUS_EFFECT':
        UpdateGameStateUtil.removeStatusEffect(gs, data);
        break;
      case 'RESISTANT':
        UpdateGameStateUtil.resistant(gs, data, this);
        break;
      case 'SLOWER':
        break;
      case 'SPEED_REVERSED':
        UpdateGameStateUtil.speedReversed(gs, data);
        break;
      case 'SWITCH_ROUTINE':
        UpdateGameStateUtil.switchRoutine(gs, data, this);
        break;
      case 'SWITCH_IN':
        UpdateGameStateUtil.switchIn(gs, data, this)
        break;
      case 'SWITCH_OUT':
        UpdateGameStateUtil.switchOut(gs, data, this)
        break;
      case 'SWITCH_OUT_PROMPT':
        break;
      case 'TAKE_RECOIL_DAMAGE':
      case 'TRUE_DAMAGE':
        UpdateGameStateUtil.dealDamage(gs, data, this);
        break;
      case 'WEAK':
        // UpdateGameStateUtil.weak(data, this);
        break;

      // phases
      case 'START_PHASE':
        GamePhaseUtil.executeStartGamePhase(gs, this);
        break;
      case 'SELECTION_PHASE':
        break;
      case 'REVEAL_PHASE':
        GamePhaseUtil.executeRevealPhase(gs, this);
        break;
      case 'APPLY_PIPS_PHASE':
        GamePhaseUtil.executeApplyPipsPhase(gs, this);
        break;
      case 'APPLY_BUFFS_PHASE':
        GamePhaseUtil.executeApplyBuffs(gs, this);
        break;
      case 'SWITCH_ACTIONS_PHASE':
        GamePhaseUtil.executeSwitchActionsPhase(gs, this);
        break;
      case 'MONSTER_ACTIONS_PHASE':
        GamePhaseUtil.executeMonsterActionsPhase(gs, this);
        break;
      case 'STANDARD_ACTIONS_PHASE':
        GamePhaseUtil.executeStandardActionsPhase(gs, this);
        break;
      case 'END_PHASE':
        GamePhaseUtil.executeEndPhase(gs, this);
        break;

    }
  }

  // TODO: i think this is really sloppy
  // alternative is a mediator class with observables that push data to queue
  // which tbh isn't that different and might lead to more complexity
  public enqueue(event: EventCommand<CommandData>) {
    this.ecqs.enqueue(event);
  }

  public enqueueDecision(event: EventCommand<CommandData>) {
    this.ecqs.enqueueDecision(event);
  }

  public pushFrontDecision(event: EventCommand<CommandData>) {
    this.ecqs.pushFrontDecision(event);
  }

  public pushFront(event: EventCommand<CommandData>) {
    this.ecqs.pushFront(event);
  }
  
  public registerTrigger(type: EventCommandType, command: EventCommand<CommandData>) {
    this.ecqs.registerTrigger(type, command);
  }

}
