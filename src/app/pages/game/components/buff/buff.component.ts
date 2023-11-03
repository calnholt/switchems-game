import { MonsterDataService } from '~/app/shared/services/monster-data.service';
import { ImageUtil } from 'src/app/shared/utils/image.util';
import { Component, Input, OnInit } from '@angular/core';
import { Css, Path } from 'src/app/shared/types/dataTypes';
import { IHover } from '~/app/shared/interfaces/IHover.interface';
import { fadeInOnEnterAnimation, fadeOutOnLeaveAnimation } from 'angular-animations';
import { Buff } from '../../models/monster/buff.model';
import { EventManagerService } from '../../services/event-manager/event-manager.service';
import { GameUISelectionEventType } from '../../services/game-ui-selection/game-ui-selection-event.model';

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
    private monsterService: MonsterDataService,
    private eventManagerService: EventManagerService
  ) {
    super();
  }

  ngOnInit() {
    const monster = this.monsterService.getMonster(this.buff.monsterName);
    this.backgroundClass = monster.elements.map(e => e.toString().toLowerCase()).join("");
    this.monsterPath = ImageUtil.getMonstersPath(monster.name);
    this.animationState =  (this.buff.isAppliedAsBuff || this.buff.isAppliedAsDiscard);
  }

  applyAsBuff() {
    this.eventManagerService.sendEvent({ type: GameUISelectionEventType.TOGGLE_APPLY_BUFF, data: this.buff.key() });
  }

  applyAsDiscard() {
    this.eventManagerService.sendEvent({ type: GameUISelectionEventType.TOGGLE_APPLY_DISCARD, data: this.buff.key() });
  }

}
