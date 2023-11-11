import { Component, Input, OnInit } from '@angular/core';
import { Monster } from '../../models/monster/monster.model';
import { ImageUtil } from 'src/app/shared/utils/image.util';
import { Css, Path } from 'src/app/shared/types/dataTypes';
import { EventManagerService } from '../../services/event-manager/event-manager.service';
import { GameUISelectionEventType } from '../../services/game-ui-selection/game-ui-selection-event.model';
import { SelectedActionService } from '../../services/selected-action/selected-action.service';

@Component({
  selector: 'sw-monster',
  templateUrl: './monster.component.html',
  styleUrls: ['./monster.component.scss']
})
export class MonsterActiveComponent implements OnInit {
  @Input() monster!: Monster;
  @Input() isActive: boolean = false;
  @Input() isOpponent: boolean = false;
  
  monsterIcon!: Path;
  superEffectiveIcon!: Path;
  switchDefenseIcon!: Path;
  discardIcon = ImageUtil.icons.discard;
  readonly ImageUtil = ImageUtil;
  backgroundClass!: Css;
  selected = false;
  numDiscards = 0;

  constructor(
    private eventManagerService: EventManagerService,
    private selectedActionService: SelectedActionService,
  ) {
    
  }
  
  ngOnInit(): void {
    this.monsterIcon = ImageUtil.getMonstersPath(this.monster.name);
    this.superEffectiveIcon = ImageUtil.icons.superEffective;
    this.switchDefenseIcon = ImageUtil.icons.switchDefense;
    this.backgroundClass = this.monster.elements.map(e => e.toString().toLowerCase()).join("");
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
  }

  onSelect() {
    if (!this.isActive) {
      this.eventManagerService.sendEvent({ type: GameUISelectionEventType.TOGGLE_ACTION, data: this.monster })
    }
  }

}
