import { ComponentRef, Directive, ElementRef, EmbeddedViewRef, HostListener, Input, ViewContainerRef } from '@angular/core';
import { MonsterActionTooltipComponent } from '../../components/card-info-tooltip/monster-action-tooltip/monster-action-tooltip.component';
import { MonsterAction } from 'src/app/pages/game/models/monster/monster.model';
import { Subscription } from 'rxjs';

export type TooltipType = 'ACTION' | 'BUFF' | 'MONSTER';
type State = 
  'UNINITIALIZED' |
  'SHOWING' |
  'DESTROYING' | // may not be necessary but its descriptive :3
  'NOT_SHOWING';

const TOOLTIP_WIDTH = 250;

@Directive({
  selector: '[cardInfoTooltip]'
})
export class CardInfoTooltipDirective {
  @Input() tooltipType: TooltipType = 'ACTION';
  @Input() action!: MonsterAction;

  private componentRef!: ComponentRef<MonsterActionTooltipComponent>;

  state: State = 'UNINITIALIZED';
  subscription!: Subscription;

  constructor(
    private elementRef: ElementRef,
    private viewContainerRef: ViewContainerRef,
  ) {}

  @HostListener('mouseenter')
  onMouseEnter(): void {
    if (!this.action.hasTooltip()) {
      return;
    }
    if (this.state === 'UNINITIALIZED') {
      switch (this.tooltipType) {
        case 'ACTION':
        default:
          this.componentRef = this.viewContainerRef.createComponent(MonsterActionTooltipComponent);
        }
      this.setTooltipComponentProperties();
    }
    else if (this.state === 'NOT_SHOWING') {
      this.componentRef.instance.show = true;
    }
    this.state = 'SHOWING';
  }

  private setTooltipComponentProperties() {
    const domElem =(this.componentRef.hostView as EmbeddedViewRef<any>).rootNodes[0] as HTMLElement;
    document.body.appendChild(domElem);
    this.componentRef.instance.action = this.action;
    const { left, right, top } = this.elementRef.nativeElement.getBoundingClientRect();
    this.componentRef.instance.left = this.action.index % 2 == 0 ? left - 5 - TOOLTIP_WIDTH : right + 5;
    this.componentRef.instance.top = top;
    if (this.state === 'UNINITIALIZED') {
      // best approach? not sure
      this.subscription = this.componentRef.instance.kill.subscribe((val) => {
        if (val) {
          this.destroy();
        }
      });
    }
  }

  @HostListener('mouseleave')
  onMouseLeave(): void {
    if (this.state !== 'DESTROYING') {
      this.componentRef.instance.show = false;
      this.state = 'NOT_SHOWING';
    }
  }

  ngOnDestroy(): void {
    this.destroy();
  }

  destroy(): void {
    this.state = 'DESTROYING';
    if (this.componentRef != null) {
      this.componentRef.destroy();
      this.subscription.unsubscribe();
      this.subscription = new Subscription();
      this.state = 'UNINITIALIZED';
    }
  }


}
