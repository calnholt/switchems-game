import { Component, Input } from '@angular/core';
import { ImageUtil } from 'src/app/shared/utils/image.util';
import { Path } from 'src/app/shared/types/dataTypes';
import { Term } from 'src/app/shared/types/data';
import { AbilityTextUtil } from 'src/app/shared/utils/ability-text.util';
import { MonsterAction } from '../../../models/monster/monster-action.model';
import { EventManagerService } from '../../../services/event-manager/event-manager.service';
import { GameUISelectionEventType } from '../../../services/game-ui-selection/game-ui-selection-event.model';
import { SelectedActionService } from '../../../services/selected-action/selected-action.service';
import { CurrentPhaseService } from '../../../services/current-phase/current-phase.service';
import { TutorialService } from '../../../services/tutorial/tutorial.service';
import { TutorialSectionType } from '../../../models/tutorial/tutorial.model';

@Component({
  selector: 'sw-monster-action',
  templateUrl: './monster-action.component.html',
  styleUrls: ['./monster-action.component.scss']
})
export class MonsterActionComponent {
  @Input({ required: true }) action!: MonsterAction;
  @Input() cardsInHand = 0;
  @Input() disable = false;

  terms: Term[] = [];

  elementImg: Path = "";
  attackImg: Path = ImageUtil.getSymbolsPath('attack');
  speedImg: Path = ImageUtil.getSymbolsPath('speed');
  statusImg: Path = ImageUtil.getSymbolsPath('status');
  lockImg: Path = ImageUtil.getSymbolsPath('lock');

  isSelected = false;
  enabled = true;

  isMonsterActionHighlighted = false;
  isAttackIconHighlighted = false;
  isStatusIconHighlighted = false;
  isSpeedIconHighlighted = false;
  isElementIconHighlighted = false;
  isBuffIconHighlighted = false;
  isDiscardIconHighlighted = false;
  isDrawIconHighlighted = false;
  isTextHighlighted = false;

  constructor(
    private eventManagerService: EventManagerService,
    private selectedActionService: SelectedActionService,
    private currentPhaseService: CurrentPhaseService,
    private tutorialService: TutorialService,
  ) {

  }

  ngOnInit() {
    if (this.action.element) {
      this.elementImg = ImageUtil.getElementsPath(this.action.element);
    }
    this.terms = AbilityTextUtil.getTermsFromText(this.action.text);
    this.selectedActionService.selectedAction$.subscribe((selectedAction) => {
      if (!selectedAction.action) {
        return;
      }
      this.isSelected = selectedAction.action.key() === this.action.key();
    });
    this.currentPhaseService.currentPhase$.subscribe((phase) => {
      this.enabled = phase === 'SELECTION_PHASE';
      if (phase === 'SELECTION_PHASE')
      this.isSelected = false;
    });
    this.tutorialService.currentSection$.subscribe((value) => {
      this.isMonsterActionHighlighted = !!value.types?.includes('MONSTER_ACTION') || !!value.types?.includes(this.action.key() as TutorialSectionType);
      this.isAttackIconHighlighted = !!value.types?.includes('MONSTER_ACTION_ATTACK');
      this.isStatusIconHighlighted = !!value.types?.includes('MONSTER_ACTION_STATUS');
      this.isSpeedIconHighlighted = !!value.types?.includes('MONSTER_ACTION_SPEED');
      this.isElementIconHighlighted = !!value.types?.includes('MONSTER_ACTION_ELEMENT');
      this.isBuffIconHighlighted = !!value.types?.includes('MONSTER_ACTION_BUFF');
      this.isDiscardIconHighlighted = !!value.types?.includes('MONSTER_ACTION_DISCARD');
      this.isDrawIconHighlighted = !!value.types?.includes('MONSTER_ACTION_DRAW');
      this.isTextHighlighted = !!value.types?.includes('MONSTER_ACTION_TEXT');
    })
  }

  selectAction() {
    if (this.enabled && !this.action.isDisabled && !this.disable) {
      this.eventManagerService.sendEvent({ type: GameUISelectionEventType.TOGGLE_ACTION, data: this.action })
    }
  }

}
