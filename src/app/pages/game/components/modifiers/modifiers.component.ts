import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Modifier, MonsterModifierType } from '../../logic/modifiers/modifier.model';
import { fadeInOnEnterAnimation, fadeOutOnLeaveAnimation } from 'angular-animations';
import { StringUtil } from '~/app/shared/utils/string.util';

@Component({
  selector: 'sw-modifiers',
  templateUrl: './modifiers.component.html',
  styleUrls: ['./modifiers.component.scss'],
  animations: [
    fadeInOnEnterAnimation({ duration: 500 }),
    fadeOutOnLeaveAnimation({ duration: 500 }),
  ]
})
export class ModifiersComponent implements OnChanges {
  @Input() modifiers!: Modifier<MonsterModifierType>[];

  displayModifiers: string[] = [];

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['modifiers']) {
      this.ngOnInit();
    }
  }

  ngOnInit() {
    this.displayModifiers = [];
    const groupedMods = new Map<MonsterModifierType, Modifier<MonsterModifierType>[]>();
    this.modifiers
      .filter(m => !m.status())
      .forEach(mod => {
        if (!groupedMods.has(mod.type)) {
          groupedMods.set(mod.type, []);
        }
        //@ts-ignore
        groupedMods.set(mod.type, groupedMods.get(mod.type)?.concat(mod));
      });
    [...groupedMods.keys()].forEach(type => {
      const mods = groupedMods.get(type);
      //@ts-ignore
      const mod = mods[0];
      const name = mod.type.replaceAll('_', ' ');
      if (mods?.[0].summable()) {
        const value = mods.reduce((accumulator, mod) => accumulator + mod.value, 0);
        this.displayModifiers.push(`+${value} ${StringUtil.getFirstLetterCapitalized(name)}`);
      }
      else {
        this.displayModifiers.push(name);
      }
    });
    // this.displayModifiers.push('+3 Attack');
    // this.displayModifiers.push('+3 Speed');
    // this.displayModifiers.push('+3 Defense');
  }

}
