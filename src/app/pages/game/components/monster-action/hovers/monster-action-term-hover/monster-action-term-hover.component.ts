import { Component, Input } from '@angular/core';
import { Term } from 'src/app/shared/types/data';

@Component({
  selector: 'sw-monster-action-term-hover',
  templateUrl: './monster-action-term-hover.component.html',
  styleUrls: ['./monster-action-term-hover.component.scss']
})
export class MonsterActionTermHoverComponent {
  @Input({ required: true }) term: Term = new Term("", "~AURA~", "");
}
