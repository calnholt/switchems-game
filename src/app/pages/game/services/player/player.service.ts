import { Injectable } from '@angular/core';
import { Player } from '../../models/player/player.model';
import { MonsterDataService } from '~/app/shared/services/monster-data.service';
import { ArrayUtil } from '~/app/shared/utils/array.util';
import { Monster } from '../../models/monster/monster.model';
import { CurrentPhaseService } from '../current-phase/current-phase.service';
import { SeedableRngService } from '../seedable-rng/seedable-rng.service';
import { SelectedActionService } from '../selected-action/selected-action.service';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {

  private _player!: Player;
  private _opponent!: Player;

  constructor(
    private monsterService: MonsterDataService,
    private currentPhaseService: CurrentPhaseService,
    private rng: SeedableRngService,
    private selectedActionService: SelectedActionService,
  ) {
    this._player = new Player(this.getSpecificStart('Deusvolt', 'Vulturock', 'Stalagrowth'), this.rng);
    this._opponent = new Player(this.getSpecificStart('Stalagrowth', 'Vulturock', 'Chargroar'), this.rng);
    this.currentPhaseService.currentPhase$.subscribe(value => {
      if (value === 'START_OF_GAME') {
        this.startGame();
      }
    });
  }

  public get player() { return this._player; }
  public get playerCardManager() { return this._player.playerCardManager; }
  public get activeMonster() { return this._player.activeMonster; }
  public get inactiveMonsters() { return this._player.inactiveMonsters; }
  public get statBoard() { return this._player.statBoard; }

  public get oPlayer() { return this._opponent; }
  public get oPlayerCardManager() { return this._opponent.playerCardManager; }
  public get oActiveMonster() { return this._opponent.activeMonster; }
  public get oInactiveMonsters() { return this._opponent.inactiveMonsters; }
  public get oStatBoard() { return this._opponent.statBoard; }

  startGame() {
    this._player.reset(this.getSpecificStart('Deusvolt', 'Vulturock', 'Stalagrowth'));
    this.selectedActionService.clear();
    this._opponent.reset(this.getSpecificStart('Chargroar', 'Vulturock', 'Stalagrowth'));
  }

  getRandomStart(): Monster[] {
    const threeRandomMonsters = ArrayUtil.getRandomUniqueEntriesFromArray(
      this.monsterService.getAllMonsters(), 3, this.rng,
    );
    threeRandomMonsters[0].setIsActive(true);
    threeRandomMonsters[1].setIsActive(false);
    threeRandomMonsters[2].setIsActive(false);
    return threeRandomMonsters;
  }

  getSpecificStart(...names: string[]): Monster[] {
    const monsters = this.monsterService.getAllMonsters().filter(m => names.includes(m.name));
    const rand: Monster = ArrayUtil.getRandomItemFromArray(monsters, this.rng) as Monster
    rand.setIsActive(true);
    return monsters;
  }

  getMonsterAsActive(name: string) {
    let monsters = this.getRandomStart();
    while (monsters[0].name !== name) {
      monsters = this.getRandomStart();
    }
    return monsters;
  }

}
