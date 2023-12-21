import { Component, Input } from '@angular/core';
import { EventCommandQueueService } from '../../services/event-command-queue/event-command-queue.service';
import { fadeInOnEnterAnimation, fadeOutOnLeaveAnimation } from 'angular-animations';
import { CurrentPhaseService } from '../../services/current-phase/current-phase.service';
import { BattleAnimationService } from '../../services/battle-animation/battle-animation.service';
import { GameOverService, WinnerType } from '../../services/game-over/game-over.service';

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
  show: boolean = true;
  allowNext = true;

  constructor(
    private ecqs: EventCommandQueueService,
    private currentPhaseService: CurrentPhaseService,
    private battleAniService: BattleAnimationService,
  ) {

  }

  ngOnInit() {
    this.ecqs.event$.subscribe((command) => {
      if (!command) return;
      this.show = !command.type.includes('PROMPT');
      setTimeout(() =>{
        this.message = command.getDisplayMessage();
      }, 300);
    });
    this.currentPhaseService.currentPhase$.subscribe((value) => {
      if (['SELECTION_PHASE', 'GAME_OVER'].includes(value)) {
        this.show = false;
        this.message = '';
      }
    });
    this.battleAniService.battleAniState$.subscribe((state) => {
      this.allowNext = !state.isAnimating();
    })
  }

  next() {
    if (this.allowNext) {
      this.message = '';
      this.ecqs.acknowledge();
    }
  }

}
