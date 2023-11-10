import { Injectable } from '@angular/core';
import { CommandData, EventCommand } from '../../logic/commands/event-command.model';
import { GameStateService } from '../game-state/game-state.service';
import { UpdateGameStateUtil } from './update-game-state.util';
import { ApplyStatusEffectCommandData } from '../../logic/commands/monster-action-commands.model';
import { EventCommandQueueService } from '../event-command-queue/event-command-queue.service';

@Injectable({
  providedIn: 'root'
})
export class UpdateGameStateService {

  constructor(
    private gameStateService: GameStateService,
    private eventCommandQueueService: EventCommandQueueService
  ) { }

  public update(ec: EventCommand<CommandData>): EventCommand<CommandData> | undefined {
    const gs = this.gameStateService.getGameState();
    switch(ec.type) {
      case 'APPLY_BUFF':
        break;
      case 'APPLY_BUFF_BELONGS':
        break;
      case 'APPLY_FLINCH':
        UpdateGameStateUtil.applyFlinch(gs, ec.data as any);
        break;
      case 'APPLY_STATUS_EFFECT':
        UpdateGameStateUtil.applyStatusEffect(gs, ec.data as any);
        break;
      case 'APPLY_STAT_PIPS':
        UpdateGameStateUtil.applyStatPips(gs, ec.data as any);
        break;
      // TODO: requires decision
      case 'CRUSH_STAT_PIP':
        break;
      case 'DEAL_DAMAGE':
        return UpdateGameStateUtil.dealDamage(gs, ec.data as any, this.eventCommandQueueService);
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
        UpdateGameStateUtil.draw(gs, ec.data as any);
        break;
      case 'DRAW_FROM_ICON':
        UpdateGameStateUtil.draw(gs, ec.data as any);
        
        break;
      case 'FASTER':
        break;
      case 'FLINCHED':
        UpdateGameStateUtil.flinched(gs, ec.data as any);
        break;
      case 'FLIP_BELONGS':
        break;
      case 'GAIN_RANDOM_STAT_PIP':
        break;
      case 'GAIN_STAT_PIP':
        UpdateGameStateUtil.gainStatPip(gs, ec.data as any);
        break;
      case 'HEAL':
        UpdateGameStateUtil.heal(gs, ec.data as any);
        break;
      case 'KNOCKED_OUT_BY_ATTACK':
        break;
      case 'MODIFY_STAT':
        UpdateGameStateUtil.modifyStat(gs, ec.data as any);
        break;
      case 'PREVENT_FLINCH':
        UpdateGameStateUtil.preventFlinch(gs, ec.data as any);
        break;
      case 'PREVENT_RECOIL':
        UpdateGameStateUtil.preventRecoil(gs, ec.data as any);
        break;
      case 'RANDOM_DISCARD':
        break;
      case 'REMOVE_STATUS_EFFECT':
        UpdateGameStateUtil.removeStatusEffect(gs, ec.data as any);
        break;
      case 'RESISTANT':
        break;
      case 'SLOWER':
        break;
      case 'SPEED_REVERSED':
        break;
      // TODO: requires decision (ish)
      case 'SWITCH_IN':
        break;
      case 'SWITCH_OUT':
        break;
      case 'TAKE_RECOIL_DAMAGE':
        break;
      case 'TRUE_DAMAGE':
        break;
      case 'WEAK':
        break;
    }
    return undefined;
  }
}
