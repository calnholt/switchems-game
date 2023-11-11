import { Injectable } from '@angular/core';
import { Dequeue } from '~/app/shared/classes/queue.model';
import { CardCompositeKey } from '~/app/shared/interfaces/ICompositeKey.interface';
import { EventCommand, CommandData, EventCommandType } from '../../logic/commands/event-command.model';
import { BehaviorSubject } from 'rxjs';
import { UpdateGameStateService } from '../update-game-state/update-game-state.service';
import { EventUpdateMediatorService } from '../event-update-mediator.service';

@Injectable({
  providedIn: 'root'
})
export class EventCommandQueueService {

  private _queue = new Dequeue<EventCommand<CommandData>>();
  private _triggers = new Map<EventCommandType, EventCommand<CommandData>[]>();
  private _isProcessing = false;
  private _isAwaitingDecision = false;
  private _isAwaitingAcknowledgement = false;

  private _event$ = new BehaviorSubject<EventCommand<CommandData> | undefined>(undefined);

  public get event$() { return this._event$; }
  public get isProcessing(): boolean { return this._isProcessing; }

  constructor(
    private mediator: EventUpdateMediatorService,
  ) { 
    this.mediator.receiveTrigger$.subscribe((value) => {
      if (value) {
        this.registerTrigger(value?.type, value?.event)
      }
    });
    this.mediator.enqueueEvent$.subscribe((value) => {
      if (value) {
        this.enqueue(value);
      }
    });
    this.mediator.pushFrontEvent$.subscribe((value) => {
      if (value) {
        this.pushFront(value);
      }
    });
  }

  public enqueue(event: EventCommand<CommandData>) {
    console.log("enqueue", event);
    this._queue.enqueue(event);
    this.processQueue(); // Start processing if not already doing so
  }

  public pushFront(event: EventCommand<CommandData>) {
    console.log("pushFront", event);
    this._queue.pushFront(event);
    this.processQueue(); // Start processing if not already doing so
  }

  public dequeue(): EventCommand<CommandData> | undefined {
    const command = this._queue.dequeue();
    this._event$.next(command);
    return command;
  }

  public processQueue() {
    if (this._isProcessing) {
      return;
    }
    this._isProcessing = true;

    while (!this._queue.isEmpty()) {
      if (this._isAwaitingAcknowledgement || this._isAwaitingDecision) {
        break;
      }
      const command = this.dequeue();
      if (!command) break;
      if (command?.requiresDecision()) {
        // The command requires a player decision to proceed
        this._isAwaitingDecision = true;
        this.awaitPlayerDecision(command);
        break; // Exit the loop and wait for the decision
      } else {
        this.mediator.execute(command);
        this.fireTriggers(command.type);
        this._isAwaitingAcknowledgement = !command.skipMessage();
        if (command?.data.destroyOnTrigger) {
          this.unregisterTrigger(command.type, command.data.key);
        }
      }
    }

    this._isProcessing = false;
  }

  public acknowledge() {
    this._isAwaitingAcknowledgement = false;
    this.processQueue();
  }

  private awaitPlayerDecision(command: EventCommand<CommandData> | undefined) {
    // This method should be connected to your UI logic to prompt for player input
    // and should ultimately call `resolvePlayerDecision` with the player's decision.
  }

  public resolvePlayerDecision(decision: any) {
    // Process the decision here
    // ...

    // After processing the decision, resume queue processing
    this._isAwaitingDecision = false;
    this.processQueue();
  }

  // Register a trigger for a specific event
  public registerTrigger(eventType: EventCommandType, command: EventCommand<CommandData>) {
    const triggersForEvent = this._triggers.get(eventType) || [];
    triggersForEvent.push(command);
    this._triggers.set(eventType, triggersForEvent);
  }

  // Execute triggers for a specific event
  public fireTriggers(eventType: EventCommandType) {
    const triggers = this._triggers.get(eventType);
    if (triggers) {
      triggers.forEach(trigger => this.enqueue(trigger));
    }
  }

  public unregisterTrigger(eventType: EventCommandType, key: CardCompositeKey) {
    const triggersForEvent = this._triggers.get(eventType);
    if (triggersForEvent) {
      this._triggers.set(eventType, triggersForEvent.filter(trig => trig.data.key !== key));
    }
  }

}
