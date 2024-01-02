import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Monster } from '~/app/pages/game/models/monster/monster.model';
import { Path } from '~/app/shared/types/dataTypes';
import { ImageUtil } from '~/app/shared/utils/image.util';
import { MonsterSelectionService } from '../../services/monster-selection.service';

@Component({
  selector: 'sw-select-monster',
  templateUrl: './select-monster.component.html',
  styleUrls: ['./select-monster.component.scss']
})
export class SelectMonsterComponent {
  @Input() monster!: Monster;
  @Input() isAdded = false;
  @Input() addToTeam = false;
  @Input() isLead = false;
  @Input() hideButtons = false;
  @Output() onView: EventEmitter<Monster> = new EventEmitter<Monster>();

  monsterIcon!: Path;
  readonly ImageUtil = ImageUtil;

  constructor(
    private monsterSelectionService: MonsterSelectionService,
  ) {

  }

  ngOnInit() {
    this.monsterIcon = ImageUtil.getMonstersPath(this.monster.name);
  }

  toggle() {
    if (this.isAdded && !this.addToTeam) {
      this.monsterSelectionService.unselectMonster(this.monster.key());
    }
    else if (!this.isAdded && !this.addToTeam) {
      this.monsterSelectionService.selectMonster(this.monster.key());
    }
    else if (this.isAdded && this.addToTeam) {
      this.monsterSelectionService.removeFromTeam(this.monster.key());
    }
    else {
      this.monsterSelectionService.addToTeam(this.monster.key());
    }
  }

  setAsLead() {
    this.monsterSelectionService.setLead(this.monster.key());
  }

  view() {
    this.onView.emit(this.monster);
  }

}
