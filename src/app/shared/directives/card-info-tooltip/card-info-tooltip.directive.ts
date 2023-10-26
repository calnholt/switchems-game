import { ComponentRef, Directive, ElementRef, EmbeddedViewRef, HostListener, Input, ViewContainerRef } from '@angular/core';
import { MonsterActionTooltipComponent } from '../../../pages/game/components/monster-action/monster-action-tooltip/monster-action-tooltip.component';
import { MonsterAction } from 'src/app/pages/game/models/monster/monster.model';
import { Subscription } from 'rxjs';
import { ICardInfoTooltip } from './card-info-tooltip.interface';

export type TooltipType = 'ACTION' | 'BUFF' | 'MONSTER';
type State = 
  'UNINITIALIZED' |
  'SHOWING' |
  'DESTROYING' | // may not be necessary but its descriptive :3
  'NOT_SHOWING';

@Directive({
  selector: '[cardInfoTooltip]'
})
export class CardInfoTooltipDirective {
  @Input() tooltipType: TooltipType = 'ACTION';
  @Input() action!: MonsterAction;

  private componentRef!: ComponentRef<ICardInfoTooltip & any>;

  state: State = 'UNINITIALIZED';
  subscription!: Subscription;

  constructor(
    private elementRef: ElementRef,
    private viewContainerRef: ViewContainerRef,
  ) {}

  @HostListener('mouseover')
  onMouseEnter(): void {
    if (!this.action.hasTooltip()) {
      return;
    }
    if (this.state === 'UNINITIALIZED') {
      switch (this.tooltipType) {
        case 'ACTION':
        default:
          this.componentRef = this.viewContainerRef.createComponent(MonsterActionTooltipComponent);
          this.setActionProperties();
        }
    }
    else if (this.state === 'NOT_SHOWING') {
      this.componentRef.instance.show = true;
    }
    this.state = 'SHOWING';
  }

  private setDOM() {
    const domElem = (this.componentRef.hostView as EmbeddedViewRef<any>).rootNodes[0] as HTMLElement;
    document.body.appendChild(domElem);
  }

  private setActionProperties() {
    this.setDOM();
    this.componentRef.instance.action = this.action;
    const { left, right, top, bottom } = this.elementRef.nativeElement.getBoundingClientRect();
    this.componentRef.instance.left = left + 25; // (300 - 250) / 2
    this.componentRef.instance.top = top;
    if (this.state === 'UNINITIALIZED') {
      // best approach? not sure
      this.subscription = this.componentRef.instance.kill.subscribe((val: boolean) => {
        if (val) {
          this.destroy();
        }
      });
    }
  }

  @HostListener('mouseleave')
  onMouseLeave(): void {
    if (this.state === 'UNINITIALIZED') {
      return;
    }
    if (this.state !== 'DESTROYING') {
      this.componentRef.instance.show = false;
      this.state = 'NOT_SHOWING';
    }
  }

  @HostListener('window:scroll')
  onScroll(): void {
    if (this.state !== 'UNINITIALIZED') {
      this.destroy();
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
