import { Injectable } from "@angular/core";
import { Monster } from "../../pages/game/models/monster/monster.model";
import { convertJsonToObjs } from "~/app/data/import/convert-json-cards";

@Injectable({
  providedIn: 'root'
})
export class MonsterDataService {

  private monsters: Array<Monster> = [];

  constructor() {
    this.loadMonsters();
  }

  loadMonsters() {
    this.monsters = convertJsonToObjs().sort((a,b) => a.name.localeCompare(b.name));
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
      convertJsonToObjs().find(m => m.name === monsterName);
    }
    return this.monsters.find(m => m.name === monsterName) as Monster;
  }

  getAllMonsters() {
    return convertJsonToObjs().sort((a,b) => a.name.localeCompare(b.name));
  }

}
