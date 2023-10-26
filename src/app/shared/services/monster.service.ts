import { Injectable } from "@angular/core";
import { Monster } from "../../pages/game/models/monster/monster.model";
import { loadMonsters } from "../../data/import/json-to-obj";

@Injectable({
  providedIn: 'root'
})
export class MonsterService {

  private monsters: Array<Monster> = [];

  constructor() { }

  loadMonsters() {
    this.monsters = loadMonsters();
    this.monsters.sort((a,b) => a._name.localeCompare(b._name));
  }

  getMonsters() {
    if (!this.monsters.length) {
      this.loadMonsters();
    }
    return this.monsters;
  }

  getMonster(monsterName: string, useJson?: boolean): Monster {
    if (!this.monsters || useJson) {
      this.loadMonsters();
      loadMonsters().find(m => m._name === monsterName);
    }
    return this.monsters.find(m => m._name === monsterName) as Monster;
  }

}
