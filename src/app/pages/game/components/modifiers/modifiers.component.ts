import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Modifier, MonsterModifierType } from '../../logic/modifiers/modifier.model';
import { fadeInOnEnterAnimation, fadeOutOnLeaveAnimation } from 'angular-animations';
import { StringUtil } from '~/app/shared/utils/string.util';
import { SelectedAction } from '../../services/selected-action/selected-action.model';
import { ImageUtil } from '~/app/shared/utils/image.util';
import { MonsterAction } from '../../models/monster/monster-action.model';
import { CurrentPhaseService } from '../../services/current-phase/current-phase.service';
import { GamePhaseCommandType } from '../../logic/commands/game-phase-commands.model';
import { Buff } from '../../models/monster/buff.model';
import { SimpleTooltip } from '~/app/shared/components/simple-tooltip/simple-tooltip.component';

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
  @Input() hide = false;
  @Input() isOpponent = false;

  displayModifiers: string[] = [];

  attackIcon = ImageUtil.icons.attack;
  speedIcon = ImageUtil.icons.speed;
  defenseIcon = ImageUtil.icons.defense;

  attack: number = 0;
  speed: number = 0;
  defense: number = 0;

  displayBuffs = false;
  currentPhase!: GamePhaseCommandType;

  constructor(
    private currentPhaseService: CurrentPhaseService,
  ) {

  }

  ngOnInit() {
    this.setValues();
    this.currentPhaseService.currentPhase$.subscribe((value) => {
      this.currentPhase = value;
      if (value === 'SELECTION_PHASE' && this.isOpponent) {
        this.displayBuffs = false;
      }
    })
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['modifiers']) {
      this.setValues();
    }
    if (changes['selectedAction']) {
      this.setStatValues();
      this.setDisplayBuffs(this.currentPhase);
    }
  }

  setValues() {
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

  public getBuffTooltip(buff: Buff) {
    return new SimpleTooltip(buff.text, this.isOpponent ? 'LEFT' : 'RIGHT');
  }

  private setDisplayBuffs(phase: GamePhaseCommandType) {
    this.displayBuffs = this.selectedAction ? this.selectedAction?.appliedBuffs?.length > 0 : false;
  }

  private getSum(mods: Modifier<MonsterModifierType>[]): number {
    return mods.reduce((accumulator, mod) => accumulator + mod.value, 0);
  }

  getFontSize(textLength: number | undefined) {
    if (!textLength) {
      return '0rem';
    }
    const baseSize = 2; // Base font size in em/rem
    const scalingFactor = 0.15; // Adjust this to control the rate of scaling
    const minFontSize = 1.2; // Minimum font size in em/rem
    const maxFontSize = 2; // Maximum font size in em/rem
    const threshold = 13;

    if (textLength < threshold) {
      return `${maxFontSize}rem`;
    }
  
    // scale text

    let fontSize = baseSize - ((textLength - threshold) * scalingFactor);
    fontSize = Math.max(fontSize, minFontSize);
    fontSize = Math.min(fontSize, maxFontSize);
  
    return `${fontSize}rem`; // or use 'rem' depending on your preference
  };

}
