import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Modifier, MonsterModifierType } from '../../logic/modifiers/modifier.model';
import { fadeInOnEnterAnimation, fadeOutOnLeaveAnimation } from 'angular-animations';
import { StringUtil } from '~/app/shared/utils/string.util';
import { SelectedAction } from '../../services/selected-action/selected-action.model';
import { ImageUtil } from '~/app/shared/utils/image.util';
import { MonsterAction } from '../../models/monster/monster-action.model';

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
  @Input() selectedAction!: SelectedAction | null;

  displayModifiers: string[] = [];

  attackIcon = ImageUtil.icons.attack;
  speedIcon = ImageUtil.icons.speed;
  defenseIcon = ImageUtil.icons.defense;

  attack: number = 0;
  speed: number = 0;
  defense: number = 0;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['modifiers']) {
      this.ngOnInit();
    }
    if (changes['selectedAction']) {
      this.setStatValues();
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
    this.setStatValues();
  }

  private setStatValues() {
    if (!this.selectedAction) {
      this.attack = 0;
      this.speed = 0;
      this.defense = 0;
    }
    else if (this.selectedAction.action.getSelectableActionType() === 'MONSTER') {
      const monsterAction = this.selectedAction.action as MonsterAction;
      this.attack = monsterAction.attack + this.getSum(this.modifiers.filter(m => m.type === 'ATTACK'));
      this.speed = monsterAction.speed + this.getSum(this.modifiers.filter(m => m.type === 'SPEED'));
      this.defense = this.getSum(this.modifiers.filter(m => m.type === 'DEFENSE'));
    }
    else {
      this.attack = this.getSum(this.modifiers.filter(m => m.type === 'ATTACK'));
      this.speed = this.getSum(this.modifiers.filter(m => m.type === 'SPEED'));
      this.defense = this.getSum(this.modifiers.filter(m => m.type === 'DEFENSE'));
    }
  }

  private getSum(mods: Modifier<MonsterModifierType>[]): number {
    return mods.reduce((accumulator, mod) => accumulator + mod.value, 0);
  }

}
