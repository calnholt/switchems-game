import { Directive, HostListener } from "@angular/core";

@Directive()
export class IHover {
  isHovering: boolean = false;

  @HostListener('mouseover')
  onMouseEnter(): void {
    this.isHovering = true;
  }

  @HostListener('mouseleave')
  onMouseLeave(): void {
    this.isHovering = false;
  }

}