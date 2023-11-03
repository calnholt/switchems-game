import { Monster } from "../monster/monster.model";
import { StatBoard } from "../stat-board/stat-board.model";
import { PlayerCardManager } from "./player-card-manager.model";

export class Player {
  private _activeMonster: Monster;
  private _inactiveMonsters: Monster[];
  private _statBoard: StatBoard = new StatBoard();
  private _playerCardManager: PlayerCardManager;
  private _standardActions: any;

  constructor(monsters: Monster[]) {
    this._activeMonster = monsters.find(m => m.isActive) as Monster;
    this._inactiveMonsters = monsters.filter(m => !m.isActive);
    this._playerCardManager = new PlayerCardManager(
      this._activeMonster.buffs
        .concat(this._inactiveMonsters[0].buffs)
        .concat(this._inactiveMonsters[1].buffs)
    )
  }

  public get activeMonster() { return this._activeMonster; }
  public get inactiveMonsters() { return this._inactiveMonsters; }
  public get statBoard() { return this._statBoard; }
  public get playerCardManager() { return this._playerCardManager; }
  public get standardActions() { return this._standardActions; }
  
}