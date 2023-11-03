import { Injectable } from '@angular/core';
import { PlayerCardManager } from '../../models/player/player-card-manager.model';
import { MonsterService } from '~/app/shared/services/monster.service';
import { ArrayUtil } from '~/app/shared/utils/array.util';
import { Monster } from '../../models/monster/monster.model';

@Injectable({
  providedIn: 'root'
})
export class PlayerCardManagerService {

  private model!: PlayerCardManager;

  constructor(
    private monsterService: MonsterService, // TODO: eventually replace?
  ) {
    this.setup();
  }

  public get playerCardManager(): PlayerCardManager { return this.model; }

  public setup(): void {
    // pick three random monsters
    const threeRandomMonsters: Monster[] = ArrayUtil.getRandomUniqueEntriesFromArray(
      this.monsterService.getMonsters(),
      3
    );
    const allBuffs = threeRandomMonsters[0].buffs
        .concat(threeRandomMonsters[1].buffs)
        .concat(threeRandomMonsters[2].buffs);
    this.model = new PlayerCardManager(allBuffs);
    this.model.drawCard();
    this.model.drawCard();
    this.model.drawCard();
    this.model.drawCard();
    this.model.drawCard();
  }

}
