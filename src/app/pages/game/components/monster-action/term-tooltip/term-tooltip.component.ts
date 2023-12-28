import { Component, Input } from '@angular/core';
import { Path } from '~/app/shared/types/dataTypes';

@Component({
  selector: 'sw-term-tooltip',
  templateUrl: './term-tooltip.component.html',
  styleUrls: ['./term-tooltip.component.scss']
})
export class TermTooltipComponent {
  @Input() title!: string;
  @Input() description!: string;
  @Input() elements!: Path[];
}
