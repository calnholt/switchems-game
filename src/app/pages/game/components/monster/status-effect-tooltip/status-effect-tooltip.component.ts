import { AfterViewInit, Component, ElementRef, Input, ViewChild } from '@angular/core';
import { slideInRightOnEnterAnimation, fadeOutOnLeaveAnimation } from 'angular-animations';
import { ITooltip } from '~/app/shared/interfaces/ITooltip.interface';
import { AnimationEvent } from '@angular/animations';
import { StatusEffect } from '../../status-effects/status-effects.component';

@Component({
  selector: 'sw-status-effect-tooltip',
  templateUrl: './status-effect-tooltip.component.html',
  styleUrls: ['./status-effect-tooltip.component.scss'],
  animations: [
    slideInRightOnEnterAnimation({ duration: 300, translate: '5%' }),
    fadeOutOnLeaveAnimation({ duration: 300 }),
  ]
})
export class StatusEffectTooltipComponent extends ITooltip implements AfterViewInit {
  @Input() statusEffect!: StatusEffect;
  @ViewChild('ref') ref!: ElementRef<any>;

  ngAfterViewInit(): void {
    const offsetHeight = (this.ref.nativeElement as HTMLElement).offsetHeight;
    // this.top = this.top + (Math.abs(offsetHeight - (this.bottom - this.top)) / 2);
  }

  // animation callback
  aniDone(event: AnimationEvent) {
    if (event.totalTime > 0 && !this.show) {
      this.kill.next(true);
    }
  }
  
  tooltipSetup = (statusEffect: StatusEffect, nativeElement: HTMLElement) => {
    this.statusEffect = statusEffect;
    const { right, top, bottom, left } = nativeElement.getBoundingClientRect();
    this.left = left - 300;
    this.top = top;
    this.bottom = bottom;
  }
}
