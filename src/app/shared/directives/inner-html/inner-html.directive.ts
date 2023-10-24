import { Directive, ElementRef, Renderer2 } from '@angular/core';

@Directive({
  selector: '[innerHtmlDirect]'
})
export class InnerHtmlDirective {
  constructor(private el: ElementRef, private renderer: Renderer2) {
    this.renderer.setProperty(this.el.nativeElement, 'innerHTML', this.el.nativeElement.textContent);
  }
}
