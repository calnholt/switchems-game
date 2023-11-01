import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { fadeOutOnLeaveAnimation, slideInDownOnEnterAnimation } from 'angular-animations';
import { ITooltip } from '~/app/shared/interfaces/ITooltip.interface';
import { AnimationEvent } from '@angular/animations';
import { Buff } from '../../../models/monster/buff.model';

@Component({
  selector: 'sw-buff-tooltip',
  templateUrl: './buff-tooltip.component.html',
  styleUrls: ['./buff-tooltip.component.scss'],
  animations: [
    slideInDownOnEnterAnimation({ delay: 100, duration: 300, translate: '5%' }),
    fadeOutOnLeaveAnimation({ duration: 300 }),
  ]
})
export class BuffTooltipComponent extends ITooltip {
  @ViewChild('ref') ref!: ElementRef<any>;
  @Input() buff!: Buff;
  
  ngAfterViewInit() {
    this.top = this.top - (this.ref.nativeElement as HTMLElement).offsetHeight - 5;
  }
  
  // animation callback
  aniDone(event: AnimationEvent) {
    if (event.totalTime > 0 && !this.show) {
      this.kill.next(true);
    }
  }

  tooltipSetup = (buff: Buff, nativeElement: HTMLElement) => {
    this.buff = buff;
    const { left, top } = nativeElement.getBoundingClientRect();
    this.left = left;
    this.top = top - 10; // adjust for scaling when hovering
  }
  
}
