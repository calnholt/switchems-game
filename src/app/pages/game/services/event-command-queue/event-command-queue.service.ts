import { Injectable } from '@angular/core';
import { Queue } from '~/app/shared/classes/queue.model';
import { CardCompositeKey } from '~/app/shared/interfaces/ICompositeKey.interface';
import { EventCommand, CommandData, EventCommandType } from '../../logic/commands/event-command.model';

@Injectable({
  providedIn: 'root'
})
export class EventCommandQueueService {

  private _queue = new Queue<EventCommand<CommandData>>();
  private _triggers = new Map<EventCommandType, EventCommand<CommandData>[]>();
  private _isProcessing = false;
  private _isAwaitingDecision = false;

  constructor() { }

  public enqueue(event: EventCommand<CommandData>) {
    this._queue.enqueue(event);
    this.processQueue(); // Start processing if not already doing so
  }

  public dequeue(): EventCommand<CommandData> | undefined {
    return this._queue.dequeue();
  }

  public processQueue() {
    if (this._isProcessing) {
      return;
    }
    this._isProcessing = true;

    while (!this._queue.isEmpty() && !this._isAwaitingDecision) {
      const command = this._queue.dequeue();
      if (!command) break;
      if (command?.requiresDecision()) {
        // The command requires a player decision to proceed
        this._isAwaitingDecision = true;
        this.awaitPlayerDecision(command);
        break; // Exit the loop and wait for the decision
      } else {
        command?.execute();
        if (command?.data.destroyOnTrigger) {
          this.unregisterTrigger(command.type, command.data.key);
        }
      }
    }

    this._isProcessing = false;
  }

  public get isProcessing(): boolean {
    return this._isProcessing;
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
