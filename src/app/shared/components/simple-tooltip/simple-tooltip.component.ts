import { AfterViewInit, Component, ElementRef, Input, ViewChild } from '@angular/core';
import { fadeOutOnLeaveAnimation, slideInDownOnEnterAnimation, slideInRightOnEnterAnimation } from 'angular-animations';
import { ITooltip } from '../../interfaces/ITooltip.interface';
import { IHaveTooltip } from '../../interfaces/IHaveTooltip.interface';
import { AnimationEvent } from '@angular/animations';

@Component({
  selector: 'sw-simple-tooltip',
  templateUrl: './simple-tooltip.component.html',
  styleUrls: ['./simple-tooltip.component.scss'],
  animations: [
    slideInDownOnEnterAnimation({ duration: 300, translate: '5%' }),
    fadeOutOnLeaveAnimation({ duration: 300 }),
  ]
})
export class SimpleTooltipComponent extends ITooltip implements AfterViewInit {
  @Input() tooltip!: SimpleTooltip;
  @ViewChild('ref') ref!: ElementRef<any>;
  
  ngAfterViewInit(): void {
    this.top = this.top - (this.ref.nativeElement as HTMLElement).offsetHeight - 5;
  }
  
  tooltipSetup = (tooltip: SimpleTooltip, nativeElement: HTMLElement) => {
    this.tooltip = tooltip;
    const height = nativeElement.offsetHeight;
    const width = nativeElement.offsetWidth;
    const { left, right, top, bottom } = nativeElement.getBoundingClientRect();
    switch (this.tooltip.position) {
      case 'RIGHT':
        this.left = left + width + 5;
        this.top = top + height;
        break;
      case 'ABOVE':
      default:
        this.left = left - 120 + (width / 2);
        this.top = top;
        break
    }
  }

    // animation callback
    aniDone(event: AnimationEvent) {
      if (event.totalTime > 0 && !this.show) {
        this.kill.next(true);
      }
    }
}

export class SimpleTooltip implements IHaveTooltip {
  innerHtml: string;
  position: TooltipPositionType = 'ABOVE';
  constructor(innerHtml: string, position?: TooltipPositionType) {
    this.innerHtml = innerHtml;
    if (position) {
      this.position = position
    }
  }
  hasTooltip(): boolean { return true; }
}

type TooltipPositionType = 'RIGHT' | 'LEFT' | 'ABOVE' | 'BELOW';
