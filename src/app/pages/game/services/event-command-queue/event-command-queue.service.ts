import { Injectable } from '@angular/core';
import { Dequeue } from '~/app/shared/classes/queue.model';
import { CardCompositeKey } from '~/app/shared/interfaces/ICompositeKey.interface';
import { EventCommand, CommandData, EventCommandType } from '../../logic/commands/event-command.model';
import { BehaviorSubject } from 'rxjs';
import { CurrentPhaseService } from '../current-phase/current-phase.service';
import { PlayerType } from '../../logic/player-type.mode';
import { GameOverService } from '../game-over/game-over.service';
import { GameStateService } from '../game-state/game-state.service';

@Injectable({
  providedIn: 'root'
})
export class EventCommandQueueService {

  private _queue = new Dequeue<EventCommand<CommandData>>();
  private _triggers = new Map<EventCommandType, EventCommand<CommandData>[]>();
  private _isProcessing = false;
  private _isAwaitingAcknowledgement = false;
  private _isAwaitingDecision = false;

  private _event$ = new BehaviorSubject<EventCommand<CommandData> | undefined>(undefined);

  public get event$() { return this._event$; }
  public get isProcessing(): boolean { return this._isProcessing; }

  constructor(
    private currentPhaseService: CurrentPhaseService,
    private gameOverService: GameOverService,
    private gameStateService: GameStateService,
  ) { 
    this.gameOverService.winner$.subscribe((value) => {
      if (!value) {
        this.cleanup();
      }
    })
  }

  cleanup() {
    this._queue.empty();
    this._triggers = new Map<EventCommandType, EventCommand<CommandData>[]>();
    this._event$.next(undefined);
    this._isProcessing = false;
    this._isAwaitingDecision = false;
    this._isAwaitingAcknowledgement = false;
  }

  public enqueue(event: EventCommand<CommandData>, force: boolean = false) {
    this._queue.enqueue(event);
    console.log('enqueue', event);
    this.preProcess(event, force);
  }

  public pushFront(event: EventCommand<CommandData>, force: boolean = false) {
    this._queue.pushFront(event);
    console.log('pushFront', event);
    this.preProcess(event, force);
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

  public pushFrontDecision(event: EventCommand<CommandData>) {
    this._isAwaitingAcknowledgement = false;
    this._isAwaitingDecision = false;
    this.pushFront(event, true);
  }

  public dequeue(): EventCommand<CommandData> | undefined {
    const command = this._queue.dequeue();
    if (command?.data.display) {
      this._event$.next(command);
    }
    return command;
  }

  // handles the processing of game events. all state changes result from event commands.
  // all state changes result from the data of an event command. these events drive all game logic.
  // some events require the player to make inputs, which effectively pauses the queue

  public processQueue() {
    if (this._isProcessing && !this._queue.isEmpty()) {
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
      // The command requires a player decision to proceed
      if (command?.requiresDecision()) {
        const gs = this.gameStateService.getGameState();
        // active player is making a decision
        if (gs.activePlayerType === command.data.activePlayerType) {
          this._isAwaitingDecision = true;
        }
        console.log('currentQueue', this._queue);
        break; // Exit the loop and wait for the decision
      } else {
        console.log('execute', command);
        command?.execute();
        this._isAwaitingAcknowledgement = !!command.data.display;
        if (this._isAwaitingAcknowledgement) {
          console.log('currentQueue', this._queue);
        }
        this.fireTriggers(command);
        if (command?.data.destroyOnTrigger && command.data.parent) {
          this.unregisterTrigger(command.data.parent, command.data.key);
        }
        // if (command?.data.removeFromOtherTriggers) {
        //   this.unregisterFromOtherTriggers(command.data.player, command.data.key);
        // }
      }
    }

    if (this._queue.isEmpty() && !this._isAwaitingDecision && !this._isAwaitingAcknowledgement) {
      this._isProcessing = false;
      if (command?.type !== 'SELECTION_PHASE') {
        if (this.currentPhaseService.currentPhase === 'END_PHASE') {
          // not great but this was being called fast in quick succession when 
          // going from END_PHASE to SELECTION_PHASE that the observables were
          // getting sent in wrong order
          setTimeout(() => { this.currentPhaseService.goToNextPhase(); }, 100);
        }
        else {
          this.currentPhaseService.goToNextPhase();
        }
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
  public fireTriggers(command: EventCommand<CommandData>) {
    const triggers = this._triggers.get(command.type);
    if (triggers) {
      triggers.forEach(trigger => {
        const isMonsterActionTrigger = trigger.data.monsterActionTrigger;
        const isKeyMatch = command.data.key === trigger.data.key;
        const isPlayerMatch = trigger.data.player === command.data.player;
        const isConditionMet = !trigger.data.triggerCondition || trigger.data.triggerCondition?.(command);
        const isEndPhase = command.type === 'END_PHASE';
        // if monster action trigger, need key to match
        if (isMonsterActionTrigger && isKeyMatch && isPlayerMatch && isConditionMet) {
          console.log('enqueue trigger', trigger)
          this.pushFront(trigger);
        }
        // end phase trigger
        else if (isConditionMet && isEndPhase) {
          console.log('enqueue trigger', trigger)
          this.pushFront(trigger);
        }
        // otherwise this is a basic trigger match
        else if (!isMonsterActionTrigger && isPlayerMatch && isConditionMet) {
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
    console.log('triggers before switch', this._triggers);
    const keys = [...this._triggers.keys()];
    keys.forEach((key) => {
      const filteredTriggers = (this._triggers.get(key) as EventCommand<CommandData>[])
      .filter(cmd => cmd.data.monsterActionTrigger && cmd.data.player !== playerType);
      this._triggers.set(key, filteredTriggers);
    });
    console.log('triggers after switch', this._triggers);
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
