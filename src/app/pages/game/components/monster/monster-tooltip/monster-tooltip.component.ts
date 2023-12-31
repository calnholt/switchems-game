import { AfterViewInit, Component, ElementRef, Input, ViewChild } from '@angular/core';
import { Monster } from '../../../models/monster/monster.model';
import { fadeOutOnLeaveAnimation, slideInRightOnEnterAnimation } from 'angular-animations';
import { AnimationEvent } from '@angular/animations';
import { ITooltip } from '~/app/shared/interfaces/ITooltip.interface';
import { Term } from '~/app/shared/types/data';

@Component({
  selector: 'sw-monster-tooltip',
  templateUrl: './monster-tooltip.component.html',
  styleUrls: ['./monster-tooltip.component.scss'],
  animations: [
    slideInRightOnEnterAnimation({ duration: 300, translate: '5%' }),
    fadeOutOnLeaveAnimation({ duration: 300 }),
  ]
})
export class MonsterTooltipComponent extends ITooltip implements AfterViewInit {
  @Input() monster!: Monster;
  isActive = false;
  terms!: Term[];

  @ViewChild('ref') ref!: ElementRef<any>;

  ngOnInit() {
    this.terms = this.monster.getTerms();
  }

  ngAfterViewInit() {
    const offsetHeight = (this.ref.nativeElement as HTMLElement).offsetHeight;
    this.top = this.top + (Math.abs(offsetHeight - (this.bottom - this.top)) / 2);
  }

  // animation callback
  aniDone(event: AnimationEvent) {
    if (event.totalTime > 0 && !this.show) {
      this.kill.next(true);
    }
  }

  tooltipSetup = (monster: Monster, nativeElement: HTMLElement) => {
    this.monster = monster;
    const { right, top, bottom } = nativeElement.getBoundingClientRect();
    this.left = right + 5;
    this.top = top;
    this.bottom = bottom;
  }

}
