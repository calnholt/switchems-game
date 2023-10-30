import { ComponentRef, Directive, ElementRef, EmbeddedViewRef, HostListener, Input, ViewContainerRef } from '@angular/core';
import { MonsterActionTooltipComponent } from '../../../pages/game/components/monster-action/monster-action-tooltip/monster-action-tooltip.component';
import { Monster, MonsterAction } from 'src/app/pages/game/models/monster/monster.model';
import { Subscription } from 'rxjs';
import { ICardInfoTooltip } from './card-info-tooltip.interface';
import { MonsterTooltipComponent } from 'src/app/pages/game/components/monster-active/monster-tooltip/monster-tooltip.component';

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
  @Input() object!: MonsterAction | Monster;

  private componentRef!: ComponentRef<ICardInfoTooltip & any>;

  state: State = 'UNINITIALIZED';
  subscription!: Subscription;

  constructor(
    private elementRef: ElementRef,
    private viewContainerRef: ViewContainerRef,
  ) {}

  @HostListener('mouseover')
  onMouseEnter(): void {
    if ((this.object instanceof MonsterAction)) {
      if (!this.object.hasTooltip()) return;
    }
    if (this.state === 'UNINITIALIZED') {
      switch (this.tooltipType) {
        case 'MONSTER':
          this.setMonsterProperties();
          break;
        case 'ACTION':
        default:
          this.setActionProperties();
          break;
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
    if (this.state === 'UNINITIALIZED') {
      // best approach? not sure
      this.subscription = this.componentRef.instance.kill.subscribe((val: boolean) => {
        if (val) {
          this.destroy();
        }
      });
    }
  }

  private setMonsterProperties() {
    this.componentRef = this.viewContainerRef.createComponent(MonsterTooltipComponent);
    this.setDOM();
    this.componentRef.instance.monster = this.object;
    const { left, right, top, bottom } = this.elementRef.nativeElement.getBoundingClientRect();
    this.componentRef.instance.left = right + 5;
    this.componentRef.instance.top = top;
  }

  private setActionProperties() {
    this.componentRef = this.viewContainerRef.createComponent(MonsterActionTooltipComponent);
    this.setDOM();
    this.componentRef.instance.action = this.object;
    const { left, right, top, bottom } = this.elementRef.nativeElement.getBoundingClientRect();
    this.componentRef.instance.left = left + 25; // (300 - 250) / 2
    this.componentRef.instance.top = top - 25; // adjust for scaling when hovering
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
