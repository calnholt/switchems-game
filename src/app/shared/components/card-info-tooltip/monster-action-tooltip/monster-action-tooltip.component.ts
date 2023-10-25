import { Component, Input } from '@angular/core';
import { fadeInLeftOnEnterAnimation, fadeInOnEnterAnimation, fadeInRightOnEnterAnimation, fadeOutOnLeaveAnimation, slideInRightOnEnterAnimation } from 'angular-animations';
import { MonsterAction } from 'src/app/pages/game/models/monster/monster.model';
import { Term } from 'src/app/shared/types/data';

@Component({
  selector: 'sw-monster-action-tooltip',
  templateUrl: './monster-action-tooltip.component.html',
  styleUrls: ['./monster-action-tooltip.component.scss'],
  animations: [
    slideInRightOnEnterAnimation({ duration: 300, translate: '5%' }),
    // fadeInOnEnterAnimation({ duration: 300 }),
    fadeOutOnLeaveAnimation({ duration: 300 }),
  ]
})
export class MonsterActionTooltipComponent {
  @Input() action!: MonsterAction;

  terms!: Term[];
  advantages!: number[];

  top!: number;
  left!: number;
  show: boolean = false;
  fadingOut: boolean = false;

  ngOnInit() {
    this.terms = this.action.getTerms();
    this.advantages = this.action.getAdvantages();
  }

}
