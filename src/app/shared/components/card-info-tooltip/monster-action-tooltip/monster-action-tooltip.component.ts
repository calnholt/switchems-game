import { Component, Input, OnDestroy } from '@angular/core';
import { fadeInLeftOnEnterAnimation, fadeInOnEnterAnimation, fadeInRightOnEnterAnimation, fadeOutOnLeaveAnimation, slideInLeftOnEnterAnimation, slideInRightOnEnterAnimation } from 'angular-animations';
import { BehaviorSubject } from 'rxjs';
import { MonsterAction } from 'src/app/pages/game/models/monster/monster.model';
import { Term } from 'src/app/shared/types/data';
import { AnimationEvent } from '@angular/animations';

@Component({
  selector: 'sw-monster-action-tooltip',
  templateUrl: './monster-action-tooltip.component.html',
  styleUrls: ['./monster-action-tooltip.component.scss'],
  animations: [
    slideInRightOnEnterAnimation({ duration: 300, translate: '5%' }),
    slideInLeftOnEnterAnimation({ duration: 300, translate: '5%' }),
    fadeOutOnLeaveAnimation({ duration: 300 }),
  ]
})
export class MonsterActionTooltipComponent {
  @Input() action!: MonsterAction;

  terms!: Term[];
  advantages!: number[];

  top!: number;
  left!: number;
  right!: number;
  show: boolean = true;
  kill: BehaviorSubject<boolean> = new BehaviorSubject(false);

  ngOnInit() {
    this.terms = this.action.getTerms();
    this.advantages = this.action.getAdvantages();
  }

  aniDone(event: AnimationEvent) {
    if (event.totalTime > 0 && !this.show) {
      this.kill.next(true);
    }
  }

}
