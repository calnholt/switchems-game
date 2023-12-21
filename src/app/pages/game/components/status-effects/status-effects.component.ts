import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Modifier, MonsterModifierType } from '../../logic/modifiers/modifier.model';
import { ImageUtil } from '~/app/shared/utils/image.util';
import { Path } from '~/app/shared/types/dataTypes';
import { StringUtil } from '~/app/shared/utils/string.util';

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
    // this.displayStatuses.push('Drain');
    // this.displayStatuses.push('Fatigue');
    // this.displayStatuses.push('Wound');
  }

}
