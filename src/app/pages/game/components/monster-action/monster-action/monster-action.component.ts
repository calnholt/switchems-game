import { Component, Input } from '@angular/core';
import { ImageUtil } from 'src/app/shared/utils/image.util';
import { Path } from 'src/app/shared/types/dataTypes';
import { Term } from 'src/app/shared/types/data';
import { AbilityTextUtil } from 'src/app/shared/utils/ability-text.util';
import { MonsterAction } from '../../../models/monster/monster-action.model';
import { EventManagerService } from '../../../services/event-manager/event-manager.service';
import { GameUISelectionEventType } from '../../../services/game-ui-selection/game-ui-selection-event.model';
import { SelectedActionService } from '../../../services/selected-action/selected-action.service';

@Component({
  selector: 'sw-monster-action',
  templateUrl: './monster-action.component.html',
  styleUrls: ['./monster-action.component.scss']
})
export class MonsterActionComponent {
  @Input({ required: true }) action!: MonsterAction;
  @Input() cardsInHand = 0;

  terms: Term[] = [];

  elementImg: Path = "";
  attackImg: Path = "";
  speedImg: Path = "";
  statusImg: Path = "";

  isSelected = false;

  constructor(
    private eventManagerService: EventManagerService,
    private selectedActionService: SelectedActionService,
  ) {

  }

  ngOnInit() {
    if (this.action?.element) {
      this.elementImg = ImageUtil.getElementsPath(this.action?.element);
    }
    this.attackImg = ImageUtil.getSymbolsPath('attack');
    this.speedImg = ImageUtil.getSymbolsPath('speed');
    this.statusImg = ImageUtil.getSymbolsPath('status');
    this.terms = AbilityTextUtil.getTermsFromText(this.action.text);
    this.selectedActionService.selectedAction$.subscribe((selectedAction) => {
      if (!selectedAction.action) {
        return;
      }
      this.isSelected = selectedAction.action.key() === this.action.key();
    });
  }

  selectAction() {
    this.eventManagerService.sendEvent({ type: GameUISelectionEventType.TOGGLE_ACTION, data: this.action })
  }

}
