import { Injectable } from '@angular/core';
import { Player } from '../../models/player/player.model';
import { MonsterDataService } from '~/app/shared/services/monster-data.service';
import { ArrayUtil } from '~/app/shared/utils/array.util';
import { Monster } from '../../models/monster/monster.model';
import { CurrentPhaseService } from '../current-phase/current-phase.service';
import { SeedableRngService } from '../seedable-rng/seedable-rng.service';
import { SelectedActionService } from '../selected-action/selected-action.service';
import { TutorialService } from '../tutorial/tutorial.service';
import { GameOverService } from '../game-over/game-over.service';
import { SfxService } from '~/app/shared/services/sfx.service';

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
    private gameOverService: GameOverService,
    private tutorialService: TutorialService,
    private sfx: SfxService,
  ) {
    this._player = new Player(this.getSpecificStartRandom('Deusvolt', 'Vulturock', 'Stalagrowth'), this.rng);
    this._opponent = new Player(this.getSpecificStartRandom('Lanternshade', 'Vulturock', 'Chargroar'), this.rng);
    this.gameOverService.winner$.subscribe((value) => {
      if (!value && this.currentPhaseService.currentTurn >= 1) {
        this.startGame();
      }
    })
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
    this._player.reset(this.getRandomStart());
    this.selectedActionService.clear();
    this._opponent.reset(this.getRandomStart());
    this.tutorialService.clear();
    this.currentPhaseService.startGame();
    this.sfx.play('BATTLE_MUSIC');
  }

  startTutorial() {
    this._player.reset(this.getSpecificStart('Deusvolt', 'Volcanoggin', 'Lanternshade'));
    this.selectedActionService.clear();
    this._opponent.reset(this.getSpecificStart('Sorrospine', 'Vulturock', 'Chargroar'));
    this.sfx.play('TUTORIAL_MUSIC');
  }

  getRandomStart(): Monster[] {
    const threeRandomMonsters = ArrayUtil.getRandomUniqueEntriesFromArray(
      this.monsterService.getAllMonsters(), 3, this.rng,
    );
    threeRandomMonsters[0].setIsActive(true);
    threeRandomMonsters[1].setIsActive(false);
    threeRandomMonsters[2].setIsActive(false);
    // threeRandomMonsters[1].takeDamage(999);
    // threeRandomMonsters[2].takeDamage(999);
    return threeRandomMonsters;
  }

  getSpecificStart(...names: string[]): Monster[] {
    const monsters = this.monsterService.getAllMonsters().filter(m => names.includes(m.name));
    monsters.find(m => m.name === names[0])?.setIsActive(true);
    return monsters;
  }

  getSpecificStartRandom(...names: string[]): Monster[] {
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
