import { Component } from '@angular/core';
import { Monster } from '~/app/pages/game/models/monster/monster.model';
import { MonsterDataService } from '~/app/shared/services/monster-data.service';
import { MonsterSelectionService, OnlineSelectionType } from '../../services/monster-selection.service';
import { Router } from '@angular/router';
import { PlayerProfileService } from '~/app/shared/services/player-profile.service';
import { PeerJsService } from '~/app/shared/services/peer-js.service';
import { GameStateService } from '~/app/pages/game/services/game-state/game-state.service';

@Component({
  selector: 'sw-select-monsters',
  templateUrl: './select-monsters.component.html',
  styleUrls: ['./select-monsters.component.scss']
})
export class SelectMonstersComponent {

  private allMonsters: Monster[] = [];

  fullViewMonster!: Monster | null;
  isViewingCpuMonster = false;

  isOnline = false;
  onlineSelectionType: OnlineSelectionType = '';
  mySelectionType: OnlineSelectionType = '';

  capacity: number = 0;

  monsterOptions: Monster[] = [];
  selectedMonsters: Monster[] = [];

  opponentSelections: Monster[] = [];
  opponentName = '';

  teamPlusOne: Monster[] = [];
  team: Monster[] = [];
  lead!: Monster;

  screen: 'PICK_4' | 'PICK_3' = 'PICK_4';

  constructor(
    private monsterService: MonsterDataService,
    private monsterSelectionService: MonsterSelectionService,
    private playerProfileService: PlayerProfileService,
    private peerService: PeerJsService,
    private gameStateService: GameStateService,
    private router: Router,
  ) {

  }

  ngOnInit() {
    this.isOnline = !!this.playerProfileService.opponentProfile.name;
    // this.isOnline = true;
    this.opponentName = this.playerProfileService?.opponentProfile?.name;
    if (this.isOnline) {
      this.monsterSelectionService.opponentSelectionType$.subscribe((value) => {
        this.onlineSelectionType = value;
        if (this.mySelectionType === 'PICK_4_CONFIRMED' && this.onlineSelectionType === 'PICK_4_CONFIRMED') {
          this.peerService.sendData('PICK_4_SELECTIONS', this.monsterSelectionService.selectedMonsters);
          this.screen = 'PICK_3';
        }
        if (this.mySelectionType === 'TEAM_CONFIRMED' && this.onlineSelectionType === 'TEAM_CONFIRMED') {
          this.peerService.sendData('START_GAME', this.monsterSelectionService.selectedMonsters);
          this.gameStateService.setCpu(false);
          setTimeout(() => {
            this.router.navigate(['/online-game']);
          }, 100);
        }
      });
      this.monsterSelectionService.opponentSelections$.subscribe((value) => {
        this.opponentSelections = this.allMonsters.filter(m => value.map(m => m.key).includes(m.key()));
      })
    }
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
    if (!this.isOnline) {
      this.monsterSelectionService.cpuSelections$.subscribe((value) => {
        this.opponentSelections = this.allMonsters.filter(m => value.map(m => m.key).includes(m.key()));
      })
    }
  }

  goToTitleScreen() {
    this.router.navigate(['/']);
  }

  clear() {
    if (this.isOnline && this.mySelectionType.includes('CONFIRM')) {
      return;
    }
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
    if (this.isOnline) {
      this.mySelectionType = 'PICK_4_CONFIRMED';
      this.peerService.sendData('PICK_4_CONFIRMED', {});
      if (this.onlineSelectionType === 'PICK_4_CONFIRMED') {
        this.peerService.sendData('PICK_4_SELECTIONS', this.monsterSelectionService.selectedMonsters);
        this.screen = 'PICK_3';
      }
      return;
    }
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
    if (this.isOnline) {
      this.mySelectionType = 'TEAM_CONFIRMED';
      this.peerService.sendData('TEAM_CONFIRMED', {});
      if (this.onlineSelectionType === 'TEAM_CONFIRMED') {
        this.peerService.sendData('START_GAME', this.monsterSelectionService.selectedMonsters);
        // this.router.navigate(['/online-game']);
      }
      return;
    }
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
