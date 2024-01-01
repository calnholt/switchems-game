import { ComponentRef, Directive, ElementRef, EmbeddedViewRef, HostListener, Input, ViewContainerRef } from '@angular/core';
import { MonsterActionTooltipComponent } from '../../../pages/game/components/monster-action/monster-action-tooltip/monster-action-tooltip.component';
import { Subscription } from 'rxjs';
import { MonsterTooltipComponent } from 'src/app/pages/game/components/monster/monster-tooltip/monster-tooltip.component';
import { BuffTooltipComponent } from '~/app/pages/game/components/buff/buff-tooltip/buff-tooltip.component';
import { IHaveTooltip } from '../../interfaces/IHaveTooltip.interface';
import { ITooltip } from '../../interfaces/ITooltip.interface';
import { TermTooltipComponent } from '~/app/pages/game/components/monster-action/term-tooltip/term-tooltip.component';
import { StatusEffectTooltipComponent } from '~/app/pages/game/components/monster/status-effect-tooltip/status-effect-tooltip.component';
import { SimpleTooltipComponent } from '../../components/simple-tooltip/simple-tooltip.component';

export type TooltipType = 
  | 'ACTION' 
  | 'BUFF' 
  | 'MONSTER' 
  | 'STATUS_EFFECT'
  | 'SIMPLE'

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
  @Input() object!: IHaveTooltip;

  private componentRef!: ComponentRef<ITooltip & any>;

  state: State = 'UNINITIALIZED';
  subscription!: Subscription;

  constructor(
    private elementRef: ElementRef,
    private viewContainerRef: ViewContainerRef,
  ) {}

  @HostListener('mouseover')
  onMouseEnter(): void {
    if (!this.object.hasTooltip()) return;
    if (this.state === 'UNINITIALIZED') {
      switch (this.tooltipType) {
        case 'MONSTER':
          this.componentRef = this.viewContainerRef.createComponent(MonsterTooltipComponent);
          break;
        case 'BUFF':
          this.componentRef  = this.viewContainerRef.createComponent(BuffTooltipComponent);
          break;
        case 'STATUS_EFFECT':
          this.componentRef  = this.viewContainerRef.createComponent(StatusEffectTooltipComponent);
          break;
        case 'SIMPLE':
          this.componentRef  = this.viewContainerRef.createComponent(SimpleTooltipComponent);
          break;
        case 'ACTION':
        default:
          this.componentRef = this.viewContainerRef.createComponent(MonsterActionTooltipComponent);
          break;
        }
        this.setup();
    }
    else if (this.state === 'NOT_SHOWING') {
      this.componentRef.instance.show = true;
    }
    this.state = 'SHOWING';
  }

  private setup() {
    const domElem = (this.componentRef.hostView as EmbeddedViewRef<any>).rootNodes[0] as HTMLElement;
    document.body.appendChild(domElem);
    this.componentRef.instance.tooltipSetup(this.object, this.elementRef.nativeElement);
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

  @HostListener('click')
  onClick(): void {
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
