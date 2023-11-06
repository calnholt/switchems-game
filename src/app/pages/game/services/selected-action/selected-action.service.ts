import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ISelectableAction } from '~/app/shared/interfaces/ISelectableAction.interface';

export interface SelectedAction {
  action: ISelectableAction,
}

@Injectable({
  providedIn: 'root'
})
export class SelectedActionService {

  //@ts-ignore
  private _selectedAction$: BehaviorSubject<SelectedAction> = new BehaviorSubject({action: null});

  public get selectedAction$() { return this._selectedAction$; } 
  public get selectedAction() { return this._selectedAction$.value; }

  public set(action: ISelectableAction) {
    this._selectedAction$.next({
      action: action,
    })
  };

  
  
}
