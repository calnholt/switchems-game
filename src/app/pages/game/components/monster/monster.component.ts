import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Monster } from '../../models/monster/monster.model';
import { ImageUtil } from 'src/app/shared/utils/image.util';
import { Css, Path } from 'src/app/shared/types/dataTypes';
import { EventManagerService } from '../../services/event-manager/event-manager.service';
import { GameUISelectionEventType } from '../../services/game-ui-selection/game-ui-selection-event.model';
import { SelectedActionService } from '../../services/selected-action/selected-action.service';
import { flashAnimation, rubberBandAnimation, slideInLeftAnimation, slideInLeftOnEnterAnimation, slideInRightAnimation, slideInRightOnEnterAnimation, slideOutLeftAnimation, slideOutLeftOnLeaveAnimation, slideOutRightAnimation, slideOutRightOnLeaveAnimation, wobbleAnimation } from 'angular-animations';
import { BattleAnimationService } from '../../services/battle-animation/battle-animation.service';
import { AnimationEvent } from '@angular/animations';
import { CurrentPhaseService } from '../../services/current-phase/current-phase.service';

@Component({
  selector: 'sw-monster',
  templateUrl: './monster.component.html',
  styleUrls: ['./monster.component.scss'],
  animations: [
    wobbleAnimation(),
    flashAnimation(),
    rubberBandAnimation(),
    slideInLeftAnimation({ translate: '1000px', duration: 300 }),
    slideInRightAnimation({ translate: '1000px', duration: 300 }),
    slideOutRightAnimation({ translate: '1000px', duration: 300 }),
    slideOutLeftAnimation({ translate: '1000px', duration: 300 }),
  ]
})
export class MonsterComponent implements OnInit, OnChanges {
  @Input() monster!: Monster;
  @Input() isActiveMonster: boolean = false;
  @Input() isOpponent: boolean = false;
  @Input() cardsInHand = 0;
  
  monsterIcon!: Path;
  superEffectiveIcon!: Path;
  switchDefenseIcon!: Path;
  discardIcon = ImageUtil.icons.discard;
  readonly ImageUtil = ImageUtil;
  backgroundClass!: Css;
  selected = false;
  numDiscards = 0;
  enabled = true;

  attacking = false;
  takingDamage = false;
  usingSpecial = false;
  switchingIn = true;
  switchingOut = false;

  constructor(
    private eventManagerService: EventManagerService,
    private selectedActionService: SelectedActionService,
    private battleAnimationService: BattleAnimationService,
    private currentPhaseService: CurrentPhaseService,
  ) {
    
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['monster']) {
      this.ngOnInit();
    }
  }
  
  ngOnInit(): void {
    this.monsterIcon = ImageUtil.getMonstersPath(this.monster.name);
    this.superEffectiveIcon = ImageUtil.icons.superEffective;
    this.switchDefenseIcon = ImageUtil.icons.switchDefense;
    this.backgroundClass = this.monster.elements.map(e => e.toString().toLowerCase()).join("");
    // update discard icons when paying for switch action
    this.selectedActionService.selectedAction$.subscribe((selectedAction) => {
      if (!selectedAction?.action) {
        return;
      }
      if (selectedAction.action.key() === this.monster.key()) {
        this.selected = true;
        this.numDiscards = selectedAction.appliedDiscards.length;
      }
      else {
        this.selected = false;
        this.numDiscards = 0;
      }
    });    
    // update animation states
    this.battleAnimationService.battleAniState$.subscribe((state) => {
      if (!state || !this.isActiveMonster) return;
      if (state.getType(!this.isOpponent) === 'ATTACKING') this.animateAttacking();
      if (state.getType(!this.isOpponent) === 'TAKING_DAMAGE') this.animateTakingDamage();
      if (state.getType(!this.isOpponent) === 'USING_SPECIAL') this.animateUsingSpecial();
      if (state.getType(!this.isOpponent) === 'SWITCHING_IN') this.animateSwitchingIn();
      if (state.getType(!this.isOpponent) === 'SWITCHING_OUT') this.animateSwitchingOut();
    });
    this.currentPhaseService.currentPhase$.subscribe((phase) => {
      this.enabled = phase === 'SELECTION_PHASE';
    });
  }

  onSelect() {
    if (!this.isActiveMonster && this.enabled) {
      this.eventManagerService.sendEvent({ type: GameUISelectionEventType.TOGGLE_ACTION, data: this.monster })
    }
  }

  animateAttacking() {
    this.attacking = false;
    setTimeout(() => { this.attacking = true; }, 1);
  }
  animateTakingDamage() {
    this.takingDamage = false;
    setTimeout(() => { this.takingDamage = true; }, 1);
  }
  animateUsingSpecial() {
    this.usingSpecial = false;
    setTimeout(() => { this.usingSpecial = true; }, 1);
  }
  animateSwitchingIn() {
    this.switchingIn = false;
    setTimeout(() => { this.switchingIn = true; }, 1);
  }
  animateSwitchingOut() {
    this.switchingOut = false;
    setTimeout(() => { this.switchingOut = true; }, 1);
  }

  aniDone(event: AnimationEvent) {
    this.battleAnimationService.done(!this.isOpponent);
  }

}

