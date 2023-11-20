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

  constructor(
    private eventManagerService: EventManagerService,
    private selectedActionService: SelectedActionService,
    private currentPhaseService: CurrentPhaseService,
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
      this.isSelected = phase === 'SELECTION_PHASE';
    });
  }

  selectAction() {
    if (this.enabled && !this.action.isDisabled && !this.disable) {
      this.eventManagerService.sendEvent({ type: GameUISelectionEventType.TOGGLE_ACTION, data: this.action })
    }
  }

}
