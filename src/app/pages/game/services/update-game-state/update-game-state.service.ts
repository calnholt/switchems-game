import { Injectable } from '@angular/core';
import { CommandData, EventCommand, EventCommandType } from '../../logic/commands/event-command.model';
import { GameStateService } from '../game-state/game-state.service';
import { UpdateGameStateUtil } from './update-game-state.util';
import { EventCommandQueueService } from '../event-command-queue/event-command-queue.service';

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
      // TODO: requires decision
      case 'CRUSH_STAT_PIP':
        break;
      case 'DEAL_DAMAGE':
        UpdateGameStateUtil.dealDamage(gs, data, this);
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
        UpdateGameStateUtil.gainRandomStatPip(gs, data, this);
        break;
      case 'GAIN_STAT_PIP':
        UpdateGameStateUtil.gainStatPip(gs, data);
        break;
      case 'HEAL':
        UpdateGameStateUtil.heal(gs, data);
        break;
      case 'KNOCKED_OUT_BY_ATTACK':
        break;
      case 'MODIFY_STAT':
        UpdateGameStateUtil.modifyStat(gs, data);
        break;
      case 'PREVENT_FLINCH':
        UpdateGameStateUtil.preventFlinch(gs, data);
        break;
      case 'PREVENT_RECOIL':
        UpdateGameStateUtil.preventRecoil(gs, data);
        break;
      case 'RANDOM_DISCARD':
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
      // TODO: requires decision (ish)
      case 'SWITCH_IN':
        break;
      case 'SWITCH_OUT':
        break;
      case 'TAKE_RECOIL_DAMAGE':
      case 'TRUE_DAMAGE':
        UpdateGameStateUtil.dealDamage(gs, data, this);
        break;
      case 'WEAK':
        UpdateGameStateUtil.weak(data, this);
        break;

      // phases
      case 'START_PHASE':
      case 'SELECTION_PHASE':
      case 'REVEAL_PHASE':
      case 'APPLY_PIPS_PHASE':
      case 'APPLY_BUFFS_PHASE':
      case 'SWITCH_ACTIONS_PHASE':
      case 'MONSTER_ACTIONS_PHASE':
      case 'STANDARD_ACTIONS_PHASE':
      case 'END_PHASE':
        UpdateGameStateUtil.setPhase(ec.type, this);
        break;

    }
    this.ecqs.fireTriggers(data.type);
  }

  // TODO: i think this is really sloppy
  public enqueue(event: EventCommand<CommandData>) {
    this.ecqs.enqueue(event);
  }
  public registerTrigger(type: EventCommandType, command: EventCommand<CommandData>) {
    this.ecqs.registerTrigger(type, command);
  }

}
