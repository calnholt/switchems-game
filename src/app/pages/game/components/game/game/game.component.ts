import { Component } from '@angular/core';
import { Monster } from '../../../models/monster/monster.model';
import { MonsterService } from 'src/app/shared/services/monster.service';
import { StatBoard } from '../../../models/stat-board/stat-board.model';
import { PlayerCardManagerService } from '../../../services/player-card-manager/player-card-manager.service';
import { PlayerCardManager } from '../../../models/player/player-card-manager.model';

@Component({
  selector: 'sw-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent {

  playerCardManager!: PlayerCardManager;
  statBoard = new StatBoard();

  constructor(
    private monsterService: MonsterService,
    private playerCardManagerService: PlayerCardManagerService
  ) {}

  monsters: Monster[] = [];

  ngOnInit() {
    this.monsters = this.monsterService.getMonsters();
    this.playerCardManager = this.playerCardManagerService.playerCardManager;
  }
}
