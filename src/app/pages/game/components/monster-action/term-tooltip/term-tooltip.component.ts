import { Component, Input } from '@angular/core';

@Component({
  selector: 'sw-term-tooltip',
  templateUrl: './term-tooltip.component.html',
  styleUrls: ['./term-tooltip.component.scss']
})
export class TermTooltipComponent {
  @Input() title!: string;
  @Input() description!: string;
}
