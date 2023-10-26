import { Component, Input, OnInit } from '@angular/core';
import { pulseAnimation } from 'angular-animations';
import { StatBoardSection, StatBoardSectionType } from 'src/app/pages/game/models/stat-board/stat-board.model';
import { Path } from 'src/app/shared/types/dataTypes';
import { ImageUtil } from 'src/app/shared/utils/image.util';

@Component({
  selector: 'sw-stat-board-section',
  templateUrl: './stat-board-section.component.html',
  styleUrls: ['./stat-board-section.component.scss'],
  animations: [
    pulseAnimation({ duration: 600, scale: 1.02 }),
  ]
})
export class StatBoardSectionComponent implements OnInit {
  @Input() statBoardSection!: StatBoardSection;

  icon!: Path;

  aniState = false;

  ngOnInit() {
    this.icon = this.getPathFromType(this.statBoardSection.type);
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
      // this.statBoardSection.setApplied(!this.statBoardSection._isApplied);
  }

}
