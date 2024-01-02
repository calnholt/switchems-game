import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Monster } from '~/app/pages/game/models/monster/monster.model';
import { MonsterSelectionService } from '../../services/monster-selection.service';

@Component({
  selector: 'sw-full-monster-view',
  templateUrl: './full-monster-view.component.html',
  styleUrls: ['./full-monster-view.component.scss']
})
export class FullMonsterViewComponent {
  @Input() monster!: Monster;
  @Input() isSettingTeam = false;
  @Input() readOnly = false;
  @Output() onClose: EventEmitter<any> = new EventEmitter<any>();
  @Output() onAdd: EventEmitter<any> = new EventEmitter<any>();
  @Output() onRemove: EventEmitter<any> = new EventEmitter<any>();
  
  isAdd = true;
  
  constructor(
    private monsterSelectionService: MonsterSelectionService,
  ) {

  }

  ngOnInit() {
    this.monsterSelectionService.selectedMonsters$.subscribe((value) => {
      if (this.isSettingTeam) {
        this.isAdd = !value.find(m => m.key === this.monster.key())?.isOnTeam;
      }
      else {
        this.isAdd = !value.find(m => m.key === this.monster.key());
      }
    })
  }

  close() {
    this.onClose.emit();
  }
  add() {
    this.onAdd.emit();
  }
  remove() {
    this.onRemove.emit();
  }

}
