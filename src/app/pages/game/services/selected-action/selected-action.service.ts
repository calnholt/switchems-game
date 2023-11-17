import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ISelectableAction } from '~/app/shared/interfaces/ISelectableAction.interface';
import { Buff } from '../../models/monster/buff.model';
import { SelectedAction } from './selected-action.model';
import { StatBoardSection } from '../../models/stat-board/stat-board.model';
import { StandardAction } from '../../models/standard-action/standard-action.model';

@Injectable({
  providedIn: 'root'
})
export class SelectedActionService {

  private _selectedAction$: BehaviorSubject<SelectedAction> = new BehaviorSubject(new SelectedAction());
  private _oSelectedAction = new SelectedAction();

  public get selectedAction$() { return this._selectedAction$; } 
  public get selectedAction() { return this._selectedAction$.value; }
  public get action() { return this._selectedAction$.value.action; }
  public get oSelectedAction() { return this._oSelectedAction; }

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
    this.updateAction();
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
    this.updateAction();
  }

  public handleStatBoardSection(statBoardSection: StatBoardSection) {
    this.selectedAction.handleStatBoardSection(statBoardSection);
    this.updateAction();
  }

  public setOpponentAction(action: SelectedAction) {
    this._oSelectedAction = action;
  }

  private updateAction() {
    this._selectedAction$.next(this.getNewSelectedAction());
  }

  private getNewSelectedAction() {
    return new SelectedAction(
      this.selectedAction.action,
      this.selectedAction.appliedBuffs,
      this.selectedAction.appliedDiscards,
      this.selectedAction.statBoardSection,
    ); 
  }

}
