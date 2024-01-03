import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { SelectedActionService } from './selected-action/selected-action.service';
import { SelectedAction } from './selected-action/selected-action.model';
import { CardCompositeKey } from '~/app/shared/interfaces/ICompositeKey.interface';
import { SelectedActionType } from '~/app/shared/interfaces/ISelectableAction.interface';
import { StatBoardSection } from '../models/stat-board/stat-board.model';
import { MonsterDataService } from '~/app/shared/services/monster-data.service';
import { MonsterAction } from '../models/monster/monster-action.model';
import { StandardAction } from '../models/standard-action/standard-action.model';
import { Buff } from '../models/monster/buff.model';
import { PeerJsService } from '~/app/shared/services/peer-js.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class OnlineBattleService {

    // denotes if online opponent has submitted their action
    private _confirmed$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    private _oConfirmed$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

    public get confirmed$() { return this._confirmed$; }
    public get confirmed() { return this.confirmed$.value; }
    public get oConfirmed$() { return this._oConfirmed$; }
    public get oConfirmed() { return this._oConfirmed$.value; }
    public get isOnline() { return this.router.url.includes('online') }

  constructor(
    private selectedActionService: SelectedActionService,
    private monsterDataService: MonsterDataService,
    private peerJsService: PeerJsService,
    private router: Router,

  ) { 
    this.confirmed$.subscribe((value) => {
      if (!value) return;
      if (this.oConfirmed) {
        this.peerJsService.sendData('SEND_SELECTED_ACTION', this.getActionData());
      }
    })
    this.oConfirmed$.subscribe((value) => {
      if (!value) return;
      if (this.confirmed) {
        this.peerJsService.sendData('SEND_SELECTED_ACTION', this.getActionData());
      }
    })
  }

  getActionData(): OnlineSelectedAction {
    const selectedAction = this.selectedActionService.selectedAction;
    return {
      key: selectedAction.action.key(),
      type: selectedAction.action.getSelectableActionType(),
      pipSection: selectedAction.statBoardSection,
      buffs: selectedAction.appliedBuffs.map(m => m.key()),
      discards: selectedAction.appliedDiscards.map(m => m.key()),
    }
  }

  setOpponentSelectedAction(action: OnlineSelectedAction) {
    const monsters = this.monsterDataService.getAllMonsters();
    let allBuffs: Buff[] = [];
    monsters.forEach(m => allBuffs = allBuffs.concat(m.buffs));
    let iAction: any = null;
    if (action.type === 'MONSTER') {
      let monsterActions: MonsterAction[] = [];
      monsters.forEach(m => monsterActions = monsterActions.concat(m.actions));
      iAction = monsterActions.find(a => a.key() === action.key);
    }
    else if (action.type === 'SWITCH') {
      iAction = monsters.find(m => m.key() === action.key);
    }
    // TODO: standard actions are messy
    else {
      if (action.key.includes('PREPARE')) {
        iAction = new StandardAction('Prepare', '[+] <div>{\"stat\": \"?\", \"num\": 3}</div>');
      }
      else {
        iAction = new StandardAction('Rest', '[+] [+] [HP]');
      }
    }
    const selectedAction = new SelectedAction(
      iAction, 
      allBuffs.filter(b => action.buffs.includes(b.key())),  
      allBuffs.filter(b => action.discards.includes(b.key())), 
      action.pipSection,
    );
    this.selectedActionService.oSelectedAction$.next(selectedAction);
    // this.confirmed$.next(false);
    // this.oConfirmed$.next(false);
  }

}

export interface OnlineSelectedAction {
  key: CardCompositeKey,
  type: SelectedActionType,
  pipSection: StatBoardSection | undefined,
  buffs: CardCompositeKey[],
  discards: CardCompositeKey[],
}