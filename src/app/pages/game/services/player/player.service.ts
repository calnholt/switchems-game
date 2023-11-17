import { Injectable } from '@angular/core';
import { Player } from '../../models/player/player.model';
import { MonsterDataService } from '~/app/shared/services/monster-data.service';
import { ArrayUtil } from '~/app/shared/utils/array.util';
import { Monster } from '../../models/monster/monster.model';
import { Vulturock } from '../../logic/monsters/vulturock.model';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {

  private _player!: Player;
  private _opponent!: Player;

  constructor(
    private monsterService: MonsterDataService,
  ) {
    this._player = new Player(this.getSpecificStart('Chargroar', 'Vulturock', 'Stalagrowth'));
    this._opponent = new Player(this.getSpecificStart('Stalagrowth', 'Vulturock', 'Chargroar'));
    this._player.playerCardManager.drawCard();
    this._player.playerCardManager.drawCard();
    this._opponent.playerCardManager.drawCard();
    this._opponent.playerCardManager.drawCard();
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

  getRandomStart(): Monster[] {
    const threeRandomMonsters = ArrayUtil.getRandomUniqueEntriesFromArray(
      this.monsterService.getAllMonsters(), 3
    );
    threeRandomMonsters[0].setIsActive(true);
    threeRandomMonsters[1].setIsActive(false);
    threeRandomMonsters[2].setIsActive(false);
    return threeRandomMonsters;
  }

  getSpecificStart(active: string, inactive1: string, inactive2: string): Monster[] {
    const allMonsters = this.monsterService.getAllMonsters();
    allMonsters.find(m => m.name === active)?.setIsActive(true);
    return [
      allMonsters.find(m => m.name === active) as Monster,
      allMonsters.find(m => m.name === inactive1) as Monster,
      allMonsters.find(m => m.name === inactive2) as Monster,
    ];
  }

  getMonsterAsActive(name: string) {
    let monsters = this.getRandomStart();
    while (monsters[0].name !== name) {
      monsters = this.getRandomStart();
    }
    return monsters;
  }

}
