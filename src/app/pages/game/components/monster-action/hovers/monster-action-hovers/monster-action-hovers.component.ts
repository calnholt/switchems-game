import { Component, Input } from '@angular/core';
import { Term } from 'src/app/shared/types/data';
import { AbilityTextUtil } from 'src/app/shared/utils/ability-text.util';

@Component({
  selector: 'sw-monster-action-hovers',
  templateUrl: './monster-action-hovers.component.html',
  styleUrls: ['./monster-action-hovers.component.scss']
})
export class MonsterActionHoversComponent {
  @Input({ required: true }) text: string = "";

  terms: Term[] = [];

  ngOnInit() {
    this.terms = AbilityTextUtil.getTermsFromText(this.text);
  }
}
