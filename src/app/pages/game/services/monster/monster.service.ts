import { Injectable } from '@angular/core';
import { PlayerService } from '../player/player.service';
import { Monster } from '../../models/monster/monster.model';

@Injectable({
  providedIn: 'root'
})
export class MonsterService {

  private _monster!: Monster;

  constructor(
    private playerService: PlayerService,
  ) { 
    this._monster = this.playerService.activeMonster;
  }

  public get monster() { return this._monster; }

}
