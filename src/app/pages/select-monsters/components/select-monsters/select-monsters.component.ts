import { Component } from '@angular/core';
import { Monster } from '~/app/pages/game/models/monster/monster.model';
import { MonsterDataService } from '~/app/shared/services/monster-data.service';
import { MonsterSelectionService } from '../../services/monster-selection.service';

@Component({
  selector: 'sw-select-monsters',
  templateUrl: './select-monsters.component.html',
  styleUrls: ['./select-monsters.component.scss']
})
export class SelectMonstersComponent {

  private allMonsters: Monster[] = [];

  monsterOptions: Monster[] = [];
  selectedMonsters: Monster[] = [];

  constructor(
    private monsterService: MonsterDataService,
    private monsterSelectionService: MonsterSelectionService,
  ) {

  }

  ngOnInit() {
    this.allMonsters = this.monsterService.getAllMonsters();
    this.monsterSelectionService.monstersOptions$.subscribe((value) => {
      this.monsterOptions = this.allMonsters.filter(m => value.includes(m.key()));
    });
    this.monsterSelectionService.selectedMonsters$.subscribe((value) => {
      this.selectedMonsters = this.allMonsters.filter(m => value.includes(m.key()));
    });
  }



}
