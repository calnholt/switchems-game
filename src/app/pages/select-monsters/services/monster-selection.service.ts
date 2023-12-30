import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CardCompositeKey } from '~/app/shared/interfaces/ICompositeKey.interface';
import { Monster } from '../../game/models/monster/monster.model';
import { MonsterDataService } from '~/app/shared/services/monster-data.service';

@Injectable({
  providedIn: 'root'
})
export class MonsterSelectionService {

  private _monstersOptions: BehaviorSubject<CardCompositeKey[]> = new BehaviorSubject<CardCompositeKey[]>([]);
  private _selectedMonsters: BehaviorSubject<CardCompositeKey[]> = new BehaviorSubject<CardCompositeKey[]>([]);

  public get monstersOptions() { return this._monstersOptions.value; }
  public get monstersOptions$() { return this._monstersOptions; }
  public get selectedMonsters() { return this._selectedMonsters.value; }
  public get selectedMonsters$() { return this._selectedMonsters; }

  constructor(
    private monsterDataService: MonsterDataService,
  ) { 
    this._monstersOptions.next(this.monsterDataService.getAllMonsters().map(m => m.key()));
  }

  selectMonster(key: CardCompositeKey) {
    this.monstersOptions$.next(this.monstersOptions.filter(m => m !== key));
    this.selectedMonsters$.next(this.selectedMonsters.concat(key));
  }

  unselectMonster(key: CardCompositeKey) {
    this.monstersOptions$.next(this.monstersOptions.concat(key));
    this.selectedMonsters$.next(this.selectedMonsters.filter(m => m !== key));
  }


}
