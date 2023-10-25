import { Component, HostListener, Input, signal } from '@angular/core';
import { MonsterAction } from '../../models/monster/monster.model';
import { ImageUtil } from 'src/app/shared/utils/image.util';
import { Path } from 'src/app/shared/types/dataTypes';
import { Term } from 'src/app/shared/types/data';
import { AbilityTextUtil } from 'src/app/shared/utils/ability-text.util';

@Component({
  selector: 'sw-monster-action',
  templateUrl: './monster-action.component.html',
  styleUrls: ['./monster-action.component.scss']
})
export class MonsterActionComponent {
  @Input({ required: true }) action!: MonsterAction;

  terms: Term[] = [];

  isHovering = false;

  elementImg: Path = "";
  attackImg: Path = "";
  speedImg: Path = "";

  ngOnInit() {
    if (this.action?.element) {
      this.elementImg = ImageUtil.getElementsPath(this.action?.element);
    }
    this.attackImg = ImageUtil.getSymbolsPath('attack');
    this.speedImg = ImageUtil.getSymbolsPath('speed');
    this.terms = AbilityTextUtil.getTermsFromText(this.action.text);
  }

  onMouseEnter() {
    this.isHovering = true;
  }

  onMouseLeave() {
    this.isHovering = false;
  }
  
}
