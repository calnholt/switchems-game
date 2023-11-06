import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ISelectableAction } from '~/app/shared/interfaces/ISelectableAction.interface';
import { Buff } from '../../models/monster/buff.model';
import { SelectedAction } from './selected-action.model';

@Injectable({
  providedIn: 'root'
})
export class SelectedActionService {

  //@ts-ignore
  private _selectedAction$: BehaviorSubject<SelectedAction> = new BehaviorSubject(new SelectedAction(null));

  public get selectedAction$() { return this._selectedAction$; } 
  public get selectedAction() { return this._selectedAction$.value; }
  public get action() { return this._selectedAction$.value.action; }

  public selectAction(newAction: ISelectableAction) {
    this._selectedAction$.next(new SelectedAction(newAction));
  };

  public handleBuff(buff: Buff) {
    if (this.selectedAction.isApplied(buff)) {
      if (this.selectedAction.isAppliedAsDiscard(buff)) {
        this.selectedAction.swap(buff);
      }
      else {
        this.selectedAction.unApply(buff);
      }
    }
    else {
      this.selectedAction.appliedBuffs.push(buff);
    }
    this._selectedAction$.next(this.getNewSelectedAction());
  }

  public handleDiscard(buff: Buff) {
    if (this.selectedAction.isApplied(buff)) {
      if (this.selectedAction.isAppliedAsBuff(buff)) {
        this.selectedAction.swap(buff);
      }
      else {
        this.selectedAction.unApply(buff);
      }
    }
    else {
      this.selectedAction.appliedDiscards.push(buff);
    }
    this._selectedAction$.next(this.getNewSelectedAction());
  }

  private getNewSelectedAction() {
    return new SelectedAction(
      this.selectedAction.action,
      this.selectedAction.appliedBuffs,
      this.selectedAction.appliedDiscards,
    ); 
  }

  
}
