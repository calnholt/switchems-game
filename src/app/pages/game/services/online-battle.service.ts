import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { SelectedActionService } from './selected-action/selected-action.service';
import { SelectedAction } from './selected-action/selected-action.model';
import { CardCompositeKey } from '~/app/shared/interfaces/ICompositeKey.interface';
import { SelectedActionType } from '~/app/shared/interfaces/ISelectableAction.interface';
import { StatBoardSection, StatBoardSectionType } from '../models/stat-board/stat-board.model';
import { MonsterDataService } from '~/app/shared/services/monster-data.service';
import { MonsterAction } from '../models/monster/monster-action.model';
import { StandardAction } from '../models/standard-action/standard-action.model';
import { Buff } from '../models/monster/buff.model';
import { PeerJsService } from '~/app/shared/services/peer-js.service';
import { Router } from '@angular/router';
import { EventCommandQueueService } from './event-command-queue/event-command-queue.service';

export type OnlineBattleStatusType = 
  | 'SELECTING_ACTION' 
  | 'CONFIRMED_ACTION' 
  | 'RESOLVING_TURN' 
  | 'ACKNOWLEDGE_DIALOG' 

@Injectable({
  providedIn: 'root'
})
export class OnlineBattleService {

    // denotes if online opponent has submitted their action
    private _status$: BehaviorSubject<OnlineBattleStatusType> = new BehaviorSubject<OnlineBattleStatusType>('RESOLVING_TURN');
    private _oStatus$: BehaviorSubject<OnlineBattleStatusType> = new BehaviorSubject<OnlineBattleStatusType>('RESOLVING_TURN');
    private acknowledgeCount = 0;
    private oAcknowledgeCount = 0;
    
    
    public get status$() { return this._status$;   }
    public get status() { return this.status$.value; }
    public get oStatus$() { return this._oStatus$; }
    public get oStatus() { return this._oStatus$.value; }
    public get isOnline() { return this.router.url.includes('online') }

  constructor(
    private selectedActionService: SelectedActionService,
    private monsterDataService: MonsterDataService,
    private peerJsService: PeerJsService,
    private ecqs: EventCommandQueueService,
    private router: Router,

  ) { 
    this.status$.subscribe((value) => {
      if (value === 'ACKNOWLEDGE_DIALOG') {
        this.peerJsService.sendData('ACKNOWLEDGE_DIALOG', { count: ++this.acknowledgeCount });
      }
      this.executeSynchronizedActionFromStatuses(value, this.oStatus);
    })
    this.oStatus$.subscribe((value) => {
      this.executeSynchronizedActionFromStatuses(this.status, value);
    })
  }

  // drives online logic
  executeSynchronizedActionFromStatuses(status: OnlineBattleStatusType, oStatus: OnlineBattleStatusType) {
    function isBothStatusEqual(statusType: OnlineBattleStatusType) {
      return status === statusType && oStatus === statusType;
    }
    if (isBothStatusEqual('CONFIRMED_ACTION')) {
      this.peerJsService.sendData('SEND_SELECTED_ACTION', this.getActionData());
    }
    if (isBothStatusEqual('ACKNOWLEDGE_DIALOG')) {
      if (this.acknowledgeCount !== this.oAcknowledgeCount) {
        console.error("PLAYERS OUT OF SYNC", { playerCount: this.acknowledgeCount, opponentCount: this.oAcknowledgeCount });
      }
      this.status$.next('RESOLVING_TURN');
      this.oStatus$.next('RESOLVING_TURN');
      setTimeout(() => {
        this.ecqs.acknowledge();
      }, 100);
    }
  }

  handleOpponentAcknowledge(count: number) {
    this.oStatus$.next('ACKNOWLEDGE_DIALOG');
    this.oAcknowledgeCount = count;
  }

  getActionData(): OnlineSelectedAction {
    const selectedAction = this.selectedActionService.selectedAction;
    const statBoardSection = selectedAction.statBoardSection;
    return {
      key: selectedAction.action.key(),
      type: selectedAction.action.getSelectableActionType(),
      pipSection: statBoardSection?.type ? { 
        type: statBoardSection?.type, 
        max: statBoardSection?.max, 
        current: statBoardSection?.current 
      } : undefined,
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
      action.pipSection?.type ? new StatBoardSection(action.pipSection.max, action.pipSection.current, action.pipSection.type) : undefined,
    );
    this.selectedActionService.oSelectedAction$.next(selectedAction);
    // this.confirmed$.next(false);
    // this.oConfirmed$.next(false);
  }

}

export interface OnlineSelectedAction {
  key: CardCompositeKey,
  type: SelectedActionType,
  pipSection: undefined | { type: StatBoardSectionType, current: number, max: number },
  buffs: CardCompositeKey[],
  discards: CardCompositeKey[],
}