import { MonsterDataService } from '~/app/shared/services/monster-data.service';
import { ImageUtil } from 'src/app/shared/utils/image.util';
import { Component, Input, OnInit } from '@angular/core';
import { Css, Path } from 'src/app/shared/types/dataTypes';
import { IHover } from '~/app/shared/interfaces/IHover.interface';
import { fadeInOnEnterAnimation, fadeOutOnLeaveAnimation } from 'angular-animations';
import { Buff } from '../../models/monster/buff.model';
import { EventManagerService } from '../../services/event-manager/event-manager.service';
import { GameUISelectionEventType } from '../../services/game-ui-selection/game-ui-selection-event.model';
import { SelectedActionService } from '../../services/selected-action/selected-action.service';
import { CurrentPhaseService } from '../../services/current-phase/current-phase.service';
import { TutorialService } from '../../services/tutorial/tutorial.service';

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

  enabled = true;

  animationState = false;
  isAppliedAsBuff = false;
  isAppliedAsDiscard = false;
  displayApplyToBuffButton = false;
  displayApplyToDiscardButton = false;

  isBuffHighlighted = false;
  isBuffMonsterHighlighted = false;
  isBuffTextHighlighted = false;

  constructor(
    private monsterService: MonsterDataService,
    private eventManagerService: EventManagerService,
    private selectedActionService: SelectedActionService,
    private currentPhaseService: CurrentPhaseService,
    private tutorialService: TutorialService,
  ) {
    super();
  }

  ngOnInit() {
    const monster = this.monsterService.getMonster(this.buff.monsterName);
    this.backgroundClass = monster.getBuffBackground();
    this.monsterPath = ImageUtil.getMonstersPath(monster.name);
    this.selectedActionService.selectedAction$.subscribe((selectedAction) => {
      if (!selectedAction.action) {
        return;
      }
      this.isAppliedAsBuff = selectedAction.isAppliedAsBuff(this.buff);
      this.isAppliedAsDiscard = selectedAction.isAppliedAsDiscard(this.buff);
      this.animationState =  this.isAppliedAsBuff || this.isAppliedAsDiscard;
      this.displayApplyToBuffButton = selectedAction.canApplyBuff(this.buff) || this.isAppliedAsBuff;
      this.displayApplyToDiscardButton = selectedAction.canApplyDiscard(this.buff) || this.isAppliedAsDiscard;
    });
    this.currentPhaseService.currentPhase$.subscribe((phase) => {
      this.enabled = phase === 'SELECTION_PHASE';
    });
    this.tutorialService.currentSection$.subscribe((value) => {
      this.isBuffHighlighted = !!value.types?.includes('BUFF');
      this.isBuffMonsterHighlighted = !!value.types?.includes('BUFF_MONSTER');
      this.isBuffTextHighlighted = !!value.types?.includes('BUFF_TEXT');
    });
  }

  applyAsBuff() {
    this.eventManagerService.sendEvent({ type: GameUISelectionEventType.TOGGLE_APPLY_BUFF, data: this.buff });
  }

  applyAsDiscard() {
    this.eventManagerService.sendEvent({ type: GameUISelectionEventType.TOGGLE_APPLY_DISCARD, data: this.buff });
  }

}
