import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { SelectedAction } from '../selected-action/selected-action.model';
import { PlayerService } from '../player/player.service';
import { SelectedActionType } from '~/app/shared/interfaces/ISelectableAction.interface';
import { MonsterAction } from '../../models/monster/monster-action.model';
import { PlayerType } from '../../logic/player-type.mode';

@Injectable({
  providedIn: 'root'
})
export class ResolveActionsService {

  private _isResolving$ = new BehaviorSubject<boolean>(false);

  public get isResolving$() { return this._isResolving$; }
  public get isResolving() { return this._isResolving$.value; }



  constructor(
    private playerService: PlayerService,
  ) { }

  async resolve(selectedAction: SelectedAction, opponentAction: SelectedAction) {
    if (!selectedAction.action || !opponentAction.action) return;
    const monster = this.playerService.activeMonster;
    const oMonster = this.playerService.activeMonster; // TODO: get opponents monster
    const initiative = monster.initiative;
    const oInitiative = oMonster.initiative;
    const type = selectedAction.action.getSelectableActionType();
    const oType = selectedAction.action.getSelectableActionType();
    const key = selectedAction.action.key();
    const oKey = opponentAction.action.key();
    const speed = (monster.actions.find(a => a.key() === key) as MonsterAction)?.speed;
    const oSpeed = (oMonster.actions.find(a => a.key() === oKey) as MonsterAction)?.speed;
    const firstPlayer = this.getFirstPlayer(initiative, type, speed, oInitiative, oType, oSpeed);
    // send out faster event
    await new Promise(resolve => setTimeout(resolve, 100));
    // apply stat cubes
    if (selectedAction.statBoardSection) {

    }
    if (opponentAction.statBoardSection) {

    }
    // apply buffs


    // determine monster action order


    // end of turn effects


    // decrement team auras


    // CLEANUP
    // clear applied buffs and discards
    // reset state variables that need to be reset


    // draw
  }

  // this doesnt take into account effects like "reverse speed order" - RETHINK
  getFirstPlayer(initiative: number, type: SelectedActionType, speed: number, oInitiative: number, oType: SelectedActionType, oSpeed: number): PlayerType {
    if (type !== oType) {
      if (type === 'SWITCH') return 'P';
      if (oType === 'SWITCH') return 'O';
      if (type === 'MONSTER') return 'P';
      if (oType === 'MONSTER') return 'O';
      if (type === 'STANDARD') return 'O';
      return 'P';
    }
    else {
      if (type === 'SWITCH' || type === 'STANDARD') {
        return initiative > oInitiative ? 'P' : 'O';
      }
      if (speed !== oSpeed) {
        return speed > oSpeed ? 'P' : 'O';
      }
      return initiative > oInitiative ? 'P' : 'O'; 
    }
  }

}
