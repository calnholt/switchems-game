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
    this.displayStatuses = [];
    // this.modifiers = [
    //   new Modifier<MonsterModifierType>('CURSE', 'CURSE'),
    //   new Modifier<MonsterModifierType>('CURSE', 'CURSE'),
    //   new Modifier<MonsterModifierType>('CURSE', 'CURSE'),
    //   new Modifier<MonsterModifierType>('CURSE', 'CURSE'),
    //   new Modifier<MonsterModifierType>('DRAIN', 'DRAIN'),
    //   new Modifier<MonsterModifierType>('DRAIN', 'DRAIN'),
    //   new Modifier<MonsterModifierType>('DRAIN', 'DRAIN'),
    //   new Modifier<MonsterModifierType>('DRAIN', 'DRAIN'),
    //   new Modifier<MonsterModifierType>('CURSE', 'CURSE'),
    //   new Modifier<MonsterModifierType>('CURSE', 'CURSE'),
    //   new Modifier<MonsterModifierType>('CURSE', 'CURSE'),
    //   new Modifier<MonsterModifierType>('WOUND', 'WOUND'),
    //   new Modifier<MonsterModifierType>('WOUND', 'WOUND'),
    // ];
    const statusCollection: Map<MonsterModifierType, number> = new Map();
    this.modifiers
      .filter(m => m.status())
      .forEach(m => {
        if (!statusCollection.has(m.type)) {
          statusCollection.set(m.type, 0);
        }
        //@ts-ignore
        statusCollection.set(m.type, statusCollection.get(m.type) + 1);
    });
    [...statusCollection.keys()].forEach(key => {
      //@ts-ignore
      const amount: number = statusCollection.get(key);
      this.displayStatuses.push(`${StringUtil.getFirstLetterCapitalized(key)}${amount > 1 ? ` x${amount}` : ''}`);
    });
  }

  getDescription(name: string): StatusEffect {
    let termName = name;
    const regex = /x\d+/;
    if (name.match(regex)) {
      termName = name.substring(0, name.search(regex) - 1);
    }
    return new StatusEffect((TERM_CODES.find(t => t.name === termName) as Term));
  }

}

export class StatusEffect implements IHaveTooltip {
  term!: Term;
  constructor(term: Term) {
    this.term = term;
  }
  hasTooltip(): boolean { return true; }
}