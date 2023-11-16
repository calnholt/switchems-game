import { Injectable } from '@angular/core';
import { Dequeue } from '~/app/shared/classes/queue.model';
import { CardCompositeKey } from '~/app/shared/interfaces/ICompositeKey.interface';
import { EventCommand, CommandData, EventCommandType } from '../../logic/commands/event-command.model';
import { BehaviorSubject } from 'rxjs';
import { CurrentPhaseService } from '../current-phase/current-phase.service';
import { PlayerType } from '../../logic/player-type.mode';

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
    private currentPhaseService: CurrentPhaseService,
  ) { }

  public enqueue(event: EventCommand<CommandData>, force: boolean = false) {
    this._queue.enqueue(event);
    console.log('enqueue', event);
    this.preProcess(event, force);
  }

  public pushFront(event: EventCommand<CommandData>) {
    this._queue.pushFront(event);
    console.log('pushFront', event);
    this.preProcess(event);
  }
  
  public preProcess(event: EventCommand<CommandData>, force: boolean = false) {
    if (event.data.updateMonsterPlayerTriggers) {
      console.log('cleanup triggers');
      this.unregisterRemoveOnSwitchTriggers(event.data.player);
    }
    if (event.data.display || event.data.key === 'phase' || force) {
      this.processQueue(); // Start processing if not already doing so
    }
  }

  public enqueueDecision(event: EventCommand<CommandData>) {
    this._isAwaitingAcknowledgement = false;
    this._isAwaitingDecision = false;
    this.enqueue(event, true);
  }

  public dequeue(): EventCommand<CommandData> | undefined {
    const command = this._queue.dequeue();
    this._event$.next(command);
    return command;
  }

  // handles the processing of game events. all state changes result from event commands.
  // all state changes result from the data of an event command. these events drive all game logic.
  // some events require the player to make inputs, which effectively pauses the queue

  public processQueue() {
    if (this._isProcessing) {
      return;
    }
    this._isProcessing = true;

    let command;
    while (!this._queue.isEmpty()) {
      if (this._isAwaitingAcknowledgement || this._isAwaitingDecision) {
        break;
      }
      command = this.dequeue();
      if (!command) break;
      if (command?.requiresDecision()) {
        // The command requires a player decision to proceed
        this._isAwaitingDecision = true;
        console.log('currentQueue', this._queue);
        break; // Exit the loop and wait for the decision
      } else {
        console.log('execute', command);
        command?.execute();
        this._isAwaitingAcknowledgement = !!command.data.display;
        if (this._isAwaitingAcknowledgement) {
          console.log('currentQueue', this._queue);
        }
        this.fireTriggers(command.type, command.data.player);
        if (command?.data.destroyOnTrigger && command.data.parent) {
          this.unregisterTrigger(command.data.parent, command.data.key);
        }
        // if (command?.data.removeFromOtherTriggers) {
        //   this.unregisterFromOtherTriggers(command.data.player, command.data.key);
        // }
      }
    }

    if (this._queue.isEmpty() && !this._isAwaitingDecision) {
      this._isProcessing = false;
      if (command?.type !== 'SELECTION_PHASE') {
        this.currentPhaseService.goToNextPhase();
      }
      else {
        this.unregisterEotTriggers();
      }
      this._isAwaitingAcknowledgement = false;
      this._isAwaitingDecision = false;
    }

    this._isProcessing = false;
  }

  public acknowledge() {
    this._isAwaitingAcknowledgement = false;
    if (this.currentPhaseService.currentPhase !== 'SELECTION_PHASE') {
      this.processQueue();
    }
  }

  // Register a trigger for a specific event
  public registerTrigger(eventType: EventCommandType, command: EventCommand<CommandData>) {
    const triggersForEvent = this._triggers.get(eventType) || [];
    triggersForEvent.push(command);
    console.log('trigger added', command);
    this._triggers.set(eventType, triggersForEvent);
  }

  // Execute triggers for a specific event
  public fireTriggers(eventType: EventCommandType, player: PlayerType) {
    const triggers = this._triggers.get(eventType);
    if (triggers) {
      triggers.forEach(trigger => {
        if (trigger.data.player === player) {
          console.log('enqueue trigger', trigger)
          this.pushFront(trigger);
        }
      });
    }
  }

  public unregisterTrigger(eventType: EventCommandType, key: CardCompositeKey) {
    const triggersForEvent = this._triggers.get(eventType);
    if (triggersForEvent) {
      this._triggers.set(eventType, triggersForEvent.filter(trig => trig.data.key !== key));
    }
    if (!this._triggers.get(eventType)?.length) {
      this._triggers.delete(eventType);
    }
  }

  private unregisterRemoveOnSwitchTriggers(playerType: PlayerType) {
    const keys = [...this._triggers.keys()];
    keys.forEach((key) => {
      this._triggers.set(key, (this._triggers.get(key) as EventCommand<CommandData>[])
          .filter(cmd => cmd.data.removeOnSwitchTrigger && cmd.data.player === playerType));
    });
  }

  private unregisterEotTriggers() {
    const keys = [...this._triggers.keys()];
    keys.forEach((key) => {
      this._triggers.set(key, (this._triggers.get(key) as EventCommand<CommandData>[])
          .filter(cmd => !cmd.data.removeEotTrigger));
    });
  }
  private unregisterFromOtherTriggers(playerType: PlayerType, key: CardCompositeKey) {
    const keys = [...this._triggers.keys()];
    keys.forEach((key) => {
      this._triggers.set(key, (this._triggers.get(key) as EventCommand<CommandData>[])
          .filter(cmd => cmd.data.removeFromOtherTriggers && cmd.data.player === playerType && cmd.data.key === key));
    });
  }
  

}
