import { MonsterService } from 'src/app/shared/services/monster.service';
import { ImageUtil } from 'src/app/shared/utils/image.util';
import { Buff } from './../../models/monster/monster.model';
import { Component, Input, OnInit } from '@angular/core';
import { Css, Path } from 'src/app/shared/types/dataTypes';
import { IHover } from '~/app/shared/interfaces/IHover.interface';
import { bounceInOnEnterAnimation, fadeInOnEnterAnimation, fadeOutOnLeaveAnimation, rubberBandAnimation, rubberBandOnEnterAnimation, slideInDownOnEnterAnimation } from 'angular-animations';

@Component({
  selector: 'sw-buff',
  templateUrl: './buff.component.html',
  styleUrls: ['./buff.component.scss'],
  animations: [
    fadeInOnEnterAnimation({ duration: 500 }),
    fadeOutOnLeaveAnimation({ duration: 500 }),
  ]
})
export class BuffComponent extends IHover implements OnInit {
  @Input() buff!: Buff;

  backgroundClass!: Css;
  monsterPath!: Path;
  buffPath = ImageUtil.icons.buff;
  discardPath = ImageUtil.icons.discard;
  teamAuraPath = ImageUtil.icons.teamAura;

  animationState = false;

  constructor(
    private monsterService: MonsterService
  ) {
    super();
  }

  ngOnInit() {
    const monster = this.monsterService.getMonster(this.buff._monsterName);
    this.backgroundClass = monster._elements.map(e => e.toString().toLowerCase()).join("");
    this.monsterPath = ImageUtil.getMonstersPath(monster._name);
    this.animationState =  (this.buff._isAppliedAsBuff || this.buff._isAppliedAsDiscard);
  }

}
