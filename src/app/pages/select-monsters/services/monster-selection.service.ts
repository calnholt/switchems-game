import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CardCompositeKey } from '~/app/shared/interfaces/ICompositeKey.interface';
import { MonsterDataService } from '~/app/shared/services/monster-data.service';
import { ArrayUtil } from '~/app/shared/utils/array.util';
import { SeedableRngService } from '../../game/services/seedable-rng/seedable-rng.service';

const CAPACITY: number = 4;
const TEAM_CAPACITY: number = 3;

export interface MonsterSelection {
  key: CardCompositeKey,
  isLead: boolean,
  isOnTeam: boolean,
}

@Injectable({
  providedIn: 'root'
})
export class MonsterSelectionService {

  private _monstersOptions: BehaviorSubject<MonsterSelection[]> = new BehaviorSubject<MonsterSelection[]>([]);
  private _selectedMonsters: BehaviorSubject<MonsterSelection[]> = new BehaviorSubject<MonsterSelection[]>([]);
  private _cpuSelections: BehaviorSubject<MonsterSelection[]> = new BehaviorSubject<MonsterSelection[]>([]);

  public get monstersOptions() { return this._monstersOptions.value; }
  public get monstersOptions$() { return this._monstersOptions; }
  public get selectedMonsters() { return this._selectedMonsters.value; }
  public get selectedMonsters$() { return this._selectedMonsters; }
  public get cpuSelections() { return this._cpuSelections.value; }
  public get cpuSelections$() { return this._cpuSelections; }
  public get capacity(): number { return CAPACITY };

  constructor(
    private monsterDataService: MonsterDataService,
    private rng: SeedableRngService,
  ) { 
    this.populate();
  }

  selectMonster(key: CardCompositeKey) {
    if (this.selectedMonsters.length < CAPACITY) {
      this.monstersOptions$.next(this.monstersOptions.filter(m => m.key !== key));
      this.selectedMonsters$.next(this.selectedMonsters.concat({ key, isLead: false, isOnTeam: false}));
    }
  }

  unselectMonster(key: CardCompositeKey) {
    this.monstersOptions$.next(this.monstersOptions.concat({ key, isLead: false, isOnTeam: false}));
    this.selectedMonsters$.next(this.selectedMonsters.filter(m => m.key !== key));
  }

  addToTeam(key: CardCompositeKey) {
    const num = this.selectedMonsters.filter(m => m.isOnTeam).length;
    if (num >= TEAM_CAPACITY) {
      return;
    }
    let monster = this.selectedMonsters.find(m => m.key == key) as MonsterSelection;
    monster.isOnTeam = true;
    monster.isLead = num === 0;
    this.selectedMonsters$.next(this.selectedMonsters);
  }

  setLead(key: CardCompositeKey) {
    this.selectedMonsters.forEach(m => m.isLead = false);
    let monster = this.selectedMonsters.find(m => m.key == key) as MonsterSelection;
    monster.isOnTeam = true;
    monster.isLead = true;
    this.selectedMonsters$.next(this.selectedMonsters);
  }

  removeFromTeam(key: CardCompositeKey) {
    let monster = this.selectedMonsters.find(m => m.key == key) as MonsterSelection;
    monster.isOnTeam = false;
    monster.isLead = false;
    this.selectedMonsters$.next(this.selectedMonsters);
  }

  removeAllFromTeam() {
    this.selectedMonsters.forEach(m => {
      m.isLead = false;
      m.isOnTeam = false;
    });
    this.selectedMonsters$.next(this.selectedMonsters);
  }

  populate() {
    this._monstersOptions.next(this.monsterDataService.getAllMonsters().map(m => { return  {key: m.key(), isLead: false, isOnTeam: false } }));
  }

  clear() {
    this.populate();
    this.selectedMonsters$.next([]);
  }

  setCpuSelections() {
    const fourRandomMonsters = ArrayUtil.getRandomUniqueEntriesFromArray(
      this.monsterDataService.getAllMonsters(), 4, this.rng,
    );
    this._cpuSelections.next(fourRandomMonsters.map((m, i) => { return { key: m.key(), isLead: false, isOnTeam: false } }));
  }

  setCpuTeam() {
    const threeRandom = ArrayUtil.getRandomUniqueEntriesFromArray(
      this.cpuSelections, 3, this.rng,
    );
    this._cpuSelections.next(threeRandom.map((m, i) => { return { key: m.key, isLead: i === 0, isOnTeam: true } }));
  }


}
