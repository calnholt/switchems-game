import { Injectable } from '@angular/core';
import { Player } from '../../models/player/player.model';
import { MonsterDataService } from '~/app/shared/services/monster-data.service';
import { ArrayUtil } from '~/app/shared/utils/array.util';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {

  private _player!: Player;

  constructor(
    private monsterService: MonsterDataService,
  ) {
    const threeRandomMonsters = ArrayUtil.getRandomUniqueEntriesFromArray(
      this.monsterService.getMonsters(), 3
    );
    threeRandomMonsters[0].setIsActive(true);
    threeRandomMonsters[1].setIsActive(false);
    threeRandomMonsters[2].setIsActive(false);
    this._player = new Player(threeRandomMonsters);
    this._player.playerCardManager.drawCard();
    this._player.playerCardManager.drawCard();
    this._player.playerCardManager.drawCard();
    this._player.playerCardManager.drawCard();
    this._player.playerCardManager.drawCard();
  }

  public get playerCardManager() { return this._player.playerCardManager; }
  public get activeMonster() { return this._player.activeMonster; }
  public get inactiveMonsters() { return this._player.inactiveMonsters; }
  public get statBoard() { return this._player.statBoard; }

}
