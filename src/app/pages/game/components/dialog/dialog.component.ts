import { Component, HostListener, Input } from '@angular/core';
import { EventCommandQueueService } from '../../services/event-command-queue/event-command-queue.service';
import { fadeInOnEnterAnimation, fadeOutOnLeaveAnimation } from 'angular-animations';
import { CurrentPhaseService } from '../../services/current-phase/current-phase.service';
import { BattleAnimationService } from '../../services/battle-animation/battle-animation.service';
import { OnlineBattleService } from '../../services/online-battle.service';
import { EventCommand, CommandData } from '../../logic/commands/event-command.model';

@Component({
  selector: 'sw-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
  animations: [
    fadeInOnEnterAnimation({ duration: 200 }),
    fadeOutOnLeaveAnimation({ duration: 200 }),
  ]
})
export class DialogComponent {
  @Input() hide: boolean = false;

  message: string = '';
  show: boolean = false;
  allowNext = true;
  hideNext = false;
  isIntroGraphicEnded = false;
  command!: EventCommand<CommandData>;
  flashyGraphic!: Element | null;

  constructor(
    private ecqs: EventCommandQueueService,
    private currentPhaseService: CurrentPhaseService,
    private battleAniService: BattleAnimationService,
    private onlineBattleService: OnlineBattleService,
  ) {
  }

  ngAfterViewInit() {
    // TODO: consider handling in service
    this.flashyGraphic = document.querySelector('#flashy-graphic');
    if (this.flashyGraphic) {
      this.flashyGraphic.addEventListener('animationstart', () => {
        this.show = false;
        this.isIntroGraphicEnded = false;
      }, { once: false });
      this.flashyGraphic.addEventListener('animationend', () => {
        this.show = !this.command.type.includes('PROMPT') ;
        this.isIntroGraphicEnded = true;
      }, { once: false });
    }
  }

  ngOnInit() {
    // this.hideNext = this.onlineBattleService.isOnline;
    this.ecqs.event$.subscribe((command) => {
      if (!command || !command.data.display) return;
      this.command = command;
      this.show = !command.type.includes('PROMPT') && this.isIntroGraphicEnded;
      this.hideNext = command.type === 'WAITING_FOR_OPPONENT';
      setTimeout(() =>{
        this.message = command.getDisplayMessage();
      }, 300);
    });
    this.currentPhaseService.currentPhase$.subscribe((value) => {
      if (['SELECTION_PHASE'].includes(value)) {
        this.show = false;
        this.message = '';
      }
    });
    this.battleAniService.battleAniState$.subscribe((state) => {
      this.allowNext = !state.isAnimating();
    });
  }
  @HostListener('window:keydown.Space')
  @HostListener('window:keydown.Enter')
  onKeypress() {
    this.next();
  }

  next() {
    if (this.allowNext) {
      if (this.onlineBattleService.isOnline) {
        this.onlineBattleService.status$.next('ACKNOWLEDGE_DIALOG');
        this.message = 'Waiting for opponent to acknowledge...';
        this.hideNext = true;
      }
      else {
        this.message = '';
        this.ecqs.acknowledge();
      }
    }
  }

}
