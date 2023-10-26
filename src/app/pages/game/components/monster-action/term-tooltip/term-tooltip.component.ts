import { Component, Input } from '@angular/core';
import { Term } from 'src/app/shared/types/data';

@Component({
  selector: 'sw-term-tooltip',
  templateUrl: './term-tooltip.component.html',
  styleUrls: ['./term-tooltip.component.scss']
})
export class TermTooltipComponent {
  @Input() term: Term = new Term('', '~AURA~', '');
}
