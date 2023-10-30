import { AfterViewInit, Component, ElementRef, Input, OnDestroy, ViewChild, signal } from '@angular/core';
import { fadeOutOnLeaveAnimation, slideInDownOnEnterAnimation, slideInLeftOnEnterAnimation, slideInRightOnEnterAnimation } from 'angular-animations';
import { BehaviorSubject } from 'rxjs';
import { MonsterAction } from 'src/app/pages/game/models/monster/monster.model';
import { Term } from 'src/app/shared/types/data';
import { AnimationEvent } from '@angular/animations';

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
export class MonsterActionTooltipComponent implements AfterViewInit {
  @Input() action!: MonsterAction;
  
  terms!: Term[];
  advantages!: number[];
  
  // TODO: figure out how to abstract this logic
  // issues: ngAfterViewInit no firing if class is extended in this class
  // ref is undefined in base class
  
  // props managed from tooltip directive
  @ViewChild('ref') ref!: ElementRef<any>;
  top!: number;
  left!: number;
  show: boolean = true;
  kill: BehaviorSubject<boolean> = new BehaviorSubject(false);

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

}
