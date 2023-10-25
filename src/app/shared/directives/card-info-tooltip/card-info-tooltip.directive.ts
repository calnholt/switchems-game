import { ComponentRef, Directive, ElementRef, EmbeddedViewRef, HostListener, Input, ViewContainerRef } from '@angular/core';
import { MonsterActionTooltipComponent } from '../../components/card-info-tooltip/monster-action-tooltip/monster-action-tooltip.component';
import { MonsterAction } from 'src/app/pages/game/models/monster/monster.model';

export type TooltipType = 'ACTION' | 'BUFF' | 'MONSTER';

@Directive({
  selector: '[cardInfoTooltip]'
})
export class CardInfoTooltipDirective {
  @Input() tooltipType: TooltipType = 'ACTION';
  @Input() action!: MonsterAction;

  private componentRef!: ComponentRef<MonsterActionTooltipComponent>;

  start!: number;
  end!: number;

  constructor(
    private elementRef: ElementRef,
    private viewContainerRef: ViewContainerRef,
  ) {}

  @HostListener('mouseenter')
  onMouseEnter(): void {
    if (this.componentRef?.instance?.show) {
      this.setTooltipComponentProperties();
      return;
    }
    switch (this.tooltipType) {
      case 'ACTION':
      default:
        this.componentRef = this.viewContainerRef.createComponent(MonsterActionTooltipComponent);
    }
    this.setTooltipComponentProperties();
  }

  private setTooltipComponentProperties() {
    const domElem =(this.componentRef.hostView as EmbeddedViewRef<any>).rootNodes[0] as HTMLElement;
    document.body.appendChild(domElem);
    this.componentRef.instance.action = this.action;
    this.componentRef.instance.show = true;
    this.componentRef.instance.fadingOut = false;
    const { right, top } = this.elementRef.nativeElement.getBoundingClientRect();
    this.componentRef.instance.left = right + 5;
    this.componentRef.instance.top = top;
  }

  @HostListener('mouseleave')
  onMouseLeave(): void {
    this.componentRef.instance.fadingOut = true;
    this.timeoutDestory();
  }

  // fadeout animation requires element to still exist in DOM
  // so we have extra handling for that
  timeoutDestory() {
    this.start = new Date().getMilliseconds();
    setTimeout(() => {
      this.end = new Date().getMilliseconds();
      if (this.end - this.start >= 180 && this.componentRef.instance.fadingOut) {
        this.componentRef.instance.show = false;
        this.destroy();
      }
    }, 1200);
  }

  ngOnDestroy(): void {
    this.destroy();
  }

  destroy(): void {
    if (this.componentRef != null) {
      this.componentRef.destroy();
    }
  }


}
