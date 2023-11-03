import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ISelectableAction } from '~/app/shared/interfaces/ISelectableAction.interface';

export interface SelectedAction {
  buff: number,
  discard: number,
  action: ISelectableAction,
}

@Injectable({
  providedIn: 'root'
})
export class SelectedActionService {

  //@ts-ignore
  private _selectedAction$: BehaviorSubject<SelectedAction> = new BehaviorSubject({buff: 0, discard: 0, action: null});

  public get selectedAction$() { return this._selectedAction$; } 
  public get selectedAction() { return this._selectedAction$.value; }

  public set(action: ISelectableAction, buff: number, discard: number) {
    this._selectedAction$.next({
      action: action,
      buff: buff,
      discard: discard,
    })
  }
  
  public update(buff: number, discard: number) {
    this._selectedAction$.next({
      ...this.selectedAction,
      buff: buff,
      discard: discard,
    })
  }

}
