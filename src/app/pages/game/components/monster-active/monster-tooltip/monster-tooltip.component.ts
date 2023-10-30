import { AfterViewInit, Component, ElementRef, Input, ViewChild } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Monster } from '../../../models/monster/monster.model';
import { fadeOutOnLeaveAnimation, slideInRightOnEnterAnimation } from 'angular-animations';
import { AnimationEvent } from '@angular/animations';

@Component({
  selector: 'sw-monster-tooltip',
  templateUrl: './monster-tooltip.component.html',
  styleUrls: ['./monster-tooltip.component.scss'],
  animations: [
    slideInRightOnEnterAnimation({ duration: 300, translate: '5%' }),
    fadeOutOnLeaveAnimation({ duration: 300 }),
  ]
})
export class MonsterTooltipComponent implements AfterViewInit {
  @Input() monster!: Monster;

  @ViewChild('ref') ref!: ElementRef<any>;
  top!: number;
  left!: number;
  show: boolean = true;
  kill: BehaviorSubject<boolean> = new BehaviorSubject(false);

  ngAfterViewInit() {
    const offsetHeight = (this.ref.nativeElement as HTMLElement).offsetHeight;
    this.top = this.top + (Math.abs(offsetHeight - 250) / 2);
  }

  // animation callback
  aniDone(event: AnimationEvent) {
    if (event.totalTime > 0 && !this.show) {
      this.kill.next(true);
    }
  }
}
