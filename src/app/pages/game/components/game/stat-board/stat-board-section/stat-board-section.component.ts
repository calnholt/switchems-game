import { Component, Input, OnInit } from '@angular/core';
import { bounceInOnEnterAnimation, fadeInOnEnterAnimation, fadeOutOnLeaveAnimation, slideInLeftOnEnterAnimation } from 'angular-animations';
import { StatBoardSection, StatBoardSectionType } from 'src/app/pages/game/models/stat-board/stat-board.model';
import { Path } from 'src/app/shared/types/dataTypes';
import { ImageUtil } from 'src/app/shared/utils/image.util';
import { CurrentPhaseService } from '~/app/pages/game/services/current-phase/current-phase.service';
import { EventManagerService } from '~/app/pages/game/services/event-manager/event-manager.service';
import { GameUISelectionEventType } from '~/app/pages/game/services/game-ui-selection/game-ui-selection-event.model';
import { SelectedActionService } from '~/app/pages/game/services/selected-action/selected-action.service';

@Component({
  selector: 'sw-stat-board-section',
  templateUrl: './stat-board-section.component.html',
  styleUrls: ['./stat-board-section.component.scss'],
  animations: [
    bounceInOnEnterAnimation({ duration: 1000 })
  ]
})
export class StatBoardSectionComponent implements OnInit {
  @Input() statBoardSection!: StatBoardSection;
  @Input() disable: boolean = false;

  icon!: Path;

  enabled = false;
  isApplied = false;
  isApplyable = false;
  aniState = false;
  arrowSrc = ImageUtil.icons.arrow;


  constructor(
    private selectedActionService: SelectedActionService,
    private eventManagerService: EventManagerService,
    private currentPhaseService: CurrentPhaseService,
  ) { }

  ngOnInit() {
    this.icon = this.getPathFromType(this.statBoardSection.type);
    if (this.disable) return;
    this.selectedActionService.selectedAction$.subscribe(({ statBoardSection }) => {
      // TODO: update isApplyable by checking if the selected action is an attack action
      // currently this isn't retrievable. consider just getting access to full action
      // from interface function
      if (statBoardSection?.type === this.statBoardSection.type) {
        this.isApplied = true;
      }
      else {
        this.isApplied = false;
      }
    });
    this.currentPhaseService.currentPhase$.subscribe((phase) => {
      this.enabled = phase === 'SELECTION_PHASE';
    })
  }

  getPathFromType(type: StatBoardSectionType) {
    const { attack, speed, defense } = ImageUtil.icons;
    if (type === 'ATTACK') return attack;
    if (type === 'SPEED') return speed;
    return defense;
  }

  aniDone() {
    this.aniState = !this.aniState;
  }

  onSelect() {
    if (this.disable) return;
    this.eventManagerService.sendEvent({ type: GameUISelectionEventType.TOGGLE_APPLY_STAT, data: this.statBoardSection });
  }

}

