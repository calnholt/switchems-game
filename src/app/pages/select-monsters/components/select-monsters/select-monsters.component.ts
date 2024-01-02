import { Component } from '@angular/core';
import { Monster } from '~/app/pages/game/models/monster/monster.model';
import { MonsterDataService } from '~/app/shared/services/monster-data.service';
import { MonsterSelectionService } from '../../services/monster-selection.service';
import { Router } from '@angular/router';

@Component({
  selector: 'sw-select-monsters',
  templateUrl: './select-monsters.component.html',
  styleUrls: ['./select-monsters.component.scss']
})
export class SelectMonstersComponent {

  private allMonsters: Monster[] = [];

  fullViewMonster!: Monster | null;
  isViewingCpuMonster = false;

  capacity: number = 0;

  monsterOptions: Monster[] = [];
  selectedMonsters: Monster[] = [];

  cpuSelections: Monster[] = [];

  teamPlusOne: Monster[] = [];
  team: Monster[] = [];
  lead!: Monster;

  screen: 'PICK_4' | 'PICK_3' = 'PICK_4';

  constructor(
    private monsterService: MonsterDataService,
    private monsterSelectionService: MonsterSelectionService,
    private router: Router,
  ) {

  }

  ngOnInit() {
    this.capacity = this.monsterSelectionService.capacity;
    this.allMonsters = this.monsterService.getAllMonsters();
    this.monsterSelectionService.monstersOptions$.subscribe((value) => {
      this.monsterOptions = this.allMonsters.filter(m => value.map(m => m.key).includes(m.key()));
    });
    this.monsterSelectionService.selectedMonsters$.subscribe((value) => {
      this.selectedMonsters = this.allMonsters.filter(m => value.map(m => m.key).includes(m.key()));
      this.teamPlusOne = this.allMonsters.filter(m => value.filter(m => !m.isOnTeam).map(m => m.key).includes(m.key()));
      this.team = this.allMonsters.filter(m => value.filter(m => m.isOnTeam).map(m => m.key).includes(m.key()));
      this.lead = this.allMonsters.find(m => value.filter(m => m.isLead).map(m => m.key).includes(m.key())) as Monster;
    });
    this.monsterSelectionService.cpuSelections$.subscribe((value) => {
      this.cpuSelections = this.allMonsters.filter(m => value.map(m => m.key).includes(m.key()));
    })
  }

  goToTitleScreen() {
    this.router.navigate(['/']);
  }

  clear() {

    this.monsterSelectionService.clear();
  }

  addFromModal() {
    if (!this.fullViewMonster) {
      return;
    }
    if (this.screen === 'PICK_4') {
      this.monsterSelectionService.selectMonster(this.fullViewMonster.key());
    }
    else if (this.screen === 'PICK_3') {
      this.monsterSelectionService.addToTeam(this.fullViewMonster.key());
    }
    this.fullViewMonster = null;
  }

  removeFromModal() {
    if (!this.fullViewMonster) {
      return;
    }
    if (this.screen === 'PICK_4') {
      this.monsterSelectionService.unselectMonster(this.fullViewMonster.key());
    }
    else if (this.screen === 'PICK_3') {
      this.monsterSelectionService.removeFromTeam(this.fullViewMonster.key());
    }
    this.fullViewMonster = null;
  }

  proceed() {
    if (this.selectedMonsters.length !== 4) {
      return;
    }
    this.screen = 'PICK_3';
    this.monsterSelectionService.setCpuSelections();
  }

  back() {
    this.screen = 'PICK_4';
    this.monsterSelectionService.removeAllFromTeam();
  }

  play() {
    if (this.team.length !== 3) {
      return;
    }
    this.monsterSelectionService.setCpuTeam();
    this.router.navigate(['/custom-game']);
  }

  viewMonsterDetails(monster: Monster, isCpu?: boolean) {
    this.fullViewMonster = monster;
    this.isViewingCpuMonster = !!isCpu;
  }

  closeMonsterDetails() {
    this.fullViewMonster = null;
    this.isViewingCpuMonster = false;
  }

}
