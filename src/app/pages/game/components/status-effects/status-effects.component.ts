import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Modifier, MonsterModifierType } from '../../logic/modifiers/modifier.model';
import { ImageUtil } from '~/app/shared/utils/image.util';
import { Path, TERM_CODES } from '~/app/shared/types/dataTypes';
import { StringUtil } from '~/app/shared/utils/string.util';
import { IHaveTooltip } from '~/app/shared/interfaces/IHaveTooltip.interface';
import { Term } from '~/app/shared/types/data';

@Component({
  selector: 'sw-status-effects',
  templateUrl: './status-effects.component.html',
  styleUrls: ['./status-effects.component.scss']
})
export class StatusEffectsComponent implements OnChanges {
  @Input() modifiers!: Modifier<MonsterModifierType>[];

  displayStatuses: string[] = [];
  statusIcon: Path = ImageUtil.icons.statusEffect;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['modifiers']) {
      this.ngOnInit();
    }
  }

  ngOnInit() {
    this.displayStatuses = this.modifiers.filter(m => m.status()).map(m => StringUtil.getFirstLetterCapitalized(m.type));
    this.displayStatuses.push('Drain');
    this.displayStatuses.push('Fatigue');
    this.displayStatuses.push('Wound');
    this.displayStatuses.push('Curse');
  }

  getDescription(name: string): StatusEffect {
    return new StatusEffect((TERM_CODES.find(t => t.name === name) as Term));
  }

}

export class StatusEffect implements IHaveTooltip {
  term!: Term;
  constructor(term: Term) {
    this.term = term;
  }
  hasTooltip(): boolean { return true; }
}