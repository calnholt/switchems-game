import { CardCompositeKey } from "~/app/shared/interfaces/ICompositeKey.interface";
import { Monster } from "../monster/monster.model";
import { StatBoard } from "../stat-board/stat-board.model";
import { PlayerCardManager } from "./player-card-manager.model";
import { BehaviorSubject } from "rxjs";

export class Player {
  private _activeMonster: BehaviorSubject<Monster>;
  private _inactiveMonsters: BehaviorSubject<Monster[]>;
  private _statBoard = new BehaviorSubject(new StatBoard());
  private _playerCardManager: BehaviorSubject<PlayerCardManager>;

  constructor(monsters: Monster[]) {
    this._activeMonster = new BehaviorSubject(monsters.find(m => m.isActive) as Monster);
    this._inactiveMonsters = new BehaviorSubject(monsters.filter(m => !m.isActive));
    this._playerCardManager = new BehaviorSubject(new PlayerCardManager(
      this.activeMonster.buffs
        .concat(this.inactiveMonsters[0].buffs)
        .concat(this.inactiveMonsters[1].buffs)
    ));
  }

  public get activeMonster() { return this._activeMonster.value; }
  public get activeMonster$() { return this._activeMonster; }
  public get inactiveMonsters() { return this._inactiveMonsters.value; }
  public get inactiveMonsters$() { return this._inactiveMonsters; }
  public get statBoard() { return this._statBoard.value; }
  public get statBoard$() { return this._statBoard; }
  public get playerCardManager() { return this._playerCardManager.value; }
  public get playerCardManager$() { return this._playerCardManager; }

  public switch(key: CardCompositeKey) {
    const activeCopy: Monster = this._activeMonster.value;
    const switchingIn: Monster = this._inactiveMonsters.value.find(m => m.key() === key) as Monster;
    switchingIn.setIsActive(true);
    activeCopy.setIsActive(true);

    this._activeMonster.next(switchingIn);
    const updatedInactive = this._inactiveMonsters.value.filter(m => m.key() !== key).concat(activeCopy);
    this._inactiveMonsters.next(updatedInactive);
  }

  public cleanup() {
    
  }

  public reset(monsters: Monster[]) {
    this.activeMonster$.next(monsters.find(m => m.isActive) as Monster);
    this.inactiveMonsters$.next(monsters.filter(m => !m.isActive));
    this.playerCardManager.reset(monsters[0].buffs.concat(monsters[1].buffs).concat(monsters[2].buffs));
    this.statBoard.reset();
    this.playerCardManager.drawCard();
    this.playerCardManager.drawCard();
  }
  
}