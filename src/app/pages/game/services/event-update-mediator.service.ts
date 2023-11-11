import { Injectable } from '@angular/core';
import { CommandData, EventCommand, EventCommandType } from '../logic/commands/event-command.model';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EventUpdateMediatorService {

  private _enqueueEvent$ = new BehaviorSubject<EventCommand<CommandData> | undefined>(undefined);
  private _pushFrontEvent$ = new BehaviorSubject<EventCommand<CommandData> | undefined>(undefined);
  private _executeEvent$ = new BehaviorSubject<EventCommand<CommandData> | undefined>(undefined);
  private _receiveTrigger$ = new BehaviorSubject<{type: EventCommandType, event: EventCommand<CommandData>} | undefined>(undefined);

  public get enqueueEvent$() { return this._enqueueEvent$; }
  public get pushFrontEvent$() { return this._pushFrontEvent$; }
  public get receiveTrigger$() { return this._receiveTrigger$; }
  public get executeEvent$() { return this._executeEvent$; }

  constructor(
  ) { }

  public execute(ec: EventCommand<CommandData>) {
    this._executeEvent$.next(ec);
  }

  public enqueue(event: EventCommand<CommandData>) {
    this._enqueueEvent$.next(event);
  }

  public pushFront(event: EventCommand<CommandData>) {
    this._pushFrontEvent$.next(event);
  }

  public registerTrigger(type: EventCommandType, event: EventCommand<CommandData>) {
    this._receiveTrigger$.next({ type, event })
  }

}
