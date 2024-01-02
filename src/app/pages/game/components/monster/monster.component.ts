import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
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
import { TutorialService } from '../../services/tutorial/tutorial.service';
import { CardCompositeKey } from '~/app/shared/interfaces/ICompositeKey.interface';
import { Router } from '@angular/router';

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
  @Input() cardsInMyOpponentsHand = 0;
  @Input() disable: boolean = false;
  @Output() onView: EventEmitter<CardCompositeKey> = new EventEmitter();
  
  monsterIcon!: Path;
  superEffectiveIcon!: Path;
  switchDefenseIcon!: Path;
  discardIcon = ImageUtil.icons.discard;
  handIcon = ImageUtil.icons.hand;
  readonly ImageUtil = ImageUtil;
  backgroundClass!: Css;
  selected = false;
  numDiscards = 0;
  enabled = true;

  hideUiElements = false;

  attacking = false;
  takingDamage = false;
  usingSpecial = false;
  switchingIn = true;
  switchingOut = false;

  isMonsterHighlighted = false;
  isOpponentHandHighlighted = false;
  isBenchedMonsterHighlighted = false;

  constructor(
    private eventManagerService: EventManagerService,
    private selectedActionService: SelectedActionService,
    private battleAnimationService: BattleAnimationService,
    private currentPhaseService: CurrentPhaseService,
    private tutorialService: TutorialService,
    private router: Router,
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
    this.hideUiElements = this.router.url.includes('select-monsters');
    // update discard icons when paying for switch action
    this.selectedActionService.selectedAction$.subscribe((selectedAction) => {
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
    this.tutorialService.currentSection$.subscribe((value) => {
      this.isMonsterHighlighted = !!value.types?.includes('MONSTER');
      this.isOpponentHandHighlighted = !!value.types?.includes('OPPONENT_HAND');
      this.isBenchedMonsterHighlighted = !!value.types?.includes('BENCHED_MONSTER') && !this.isActiveMonster;
    })
  }

  onSelect() {
    if (!this.isActiveMonster && this.enabled && !this.disable) {
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

  view() {
    this.onView.emit(this.monster.key());
  }

}

