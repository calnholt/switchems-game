import { Component } from '@angular/core';
import { Monster } from '../../../models/monster/monster.model';
import { StatBoard } from '../../../models/stat-board/stat-board.model';
import { PlayerCardManager } from '../../../models/player/player-card-manager.model';
import { PlayerService } from '../../../services/player/player.service';
import { StandardAction } from '../../../models/standard-action/standard-action.model';
import { ImageUtil } from '~/app/shared/utils/image.util';

@Component({
  selector: 'sw-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent {

  playerCardManager!: PlayerCardManager;
  statBoard!: StatBoard;
  activeMonster!: Monster;
  inactiveMonsters: Monster[] = [];

  restStandardAction = new StandardAction('Rest', [
    ImageUtil.icons.draw, 
    ImageUtil.icons.draw, 
    ImageUtil.icons.hp
  ]);
  prepareStandardAction = new StandardAction('Prepare', [
    ImageUtil.icons.draw, 
    ImageUtil.icons.randomCube, 
    ImageUtil.icons.randomCube, 
    ImageUtil.icons.randomCube, 
  ]);

  constructor(
    private playerService: PlayerService,
  ) {}

  ngOnInit() {
    this.activeMonster = this.playerService.activeMonster;
    this.inactiveMonsters = this.playerService.inactiveMonsters;
    this.playerCardManager = this.playerService.playerCardManager;
    this.statBoard = this.playerService.statBoard;
  }
}
