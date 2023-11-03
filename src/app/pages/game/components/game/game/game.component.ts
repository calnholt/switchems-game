import { Component } from '@angular/core';
import { Monster } from '../../../models/monster/monster.model';
import { StatBoard } from '../../../models/stat-board/stat-board.model';
import { PlayerCardManager } from '../../../models/player/player-card-manager.model';
import { PlayerService } from '../../../services/player/player.service';
import { AppliedBuffService } from '../../../services/applied-buff/applied-buff.service';

@Component({
  selector: 'sw-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent {

  playerCardManager!: PlayerCardManager;
  statBoard!: StatBoard;
  activeMonster!: Monster;

  constructor(
    private playerService: PlayerService,
  ) {}


  ngOnInit() {
    this.activeMonster = this.playerService.activeMonster;
    this.playerCardManager = this.playerService.playerCardManager;
    this.statBoard = this.playerService.statBoard;
  }
}
