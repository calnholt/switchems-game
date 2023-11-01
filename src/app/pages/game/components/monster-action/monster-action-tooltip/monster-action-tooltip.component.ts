import { AfterViewInit, Component, ElementRef, Input, OnDestroy, ViewChild, signal } from '@angular/core';
import { fadeOutOnLeaveAnimation, slideInDownOnEnterAnimation, slideInLeftOnEnterAnimation, slideInRightOnEnterAnimation } from 'angular-animations';
import { BehaviorSubject } from 'rxjs';
import { MonsterAction } from 'src/app/pages/game/models/monster/monster.model';
import { Term } from 'src/app/shared/types/data';
import { AnimationEvent } from '@angular/animations';
import { ITooltip } from '~/app/shared/interfaces/ITooltip.interface';

@Component({
  selector: 'sw-monster-action-tooltip',
  templateUrl: './monster-action-tooltip.component.html',
  styleUrls: ['./monster-action-tooltip.component.scss'],
  animations: [
    slideInDownOnEnterAnimation({ delay: 100, duration: 300, translate: '5%' }),
    // slideInLeftOnEnterAnimation({ duration: 300, translate: '5%' }),
    fadeOutOnLeaveAnimation({ duration: 300 }),
  ]
})
export class MonsterActionTooltipComponent extends ITooltip implements AfterViewInit {
  @Input() action!: MonsterAction;
  
  terms!: Term[];
  advantages!: number[];
  
  // props managed from tooltip directive
  @ViewChild('ref') ref!: ElementRef<any>;

  ngOnInit() {
    this.terms = this.action.getTerms();
    this.advantages = this.action.getAdvantages();
  }

  ngAfterViewInit() {
    this.top = this.top - (this.ref.nativeElement as HTMLElement).offsetHeight - 5;
  }

  // animation callback
  aniDone(event: AnimationEvent) {
    if (event.totalTime > 0 && !this.show) {
      this.kill.next(true);
    }
  }

  tooltipSetup = (action: MonsterAction, nativeElement: HTMLElement) => {
    this.action = action;
    const { left, right, top, bottom } = nativeElement.getBoundingClientRect();
    this.left = left + 25; // (300 - 250) / 2
    this.top = top - 10; // adjust for scaling when hovering
  }

}
