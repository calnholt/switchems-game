import { Component } from '@angular/core';
import { Monster } from '../../models/monster/monster.model';
import { StatBoard } from '../../models/stat-board/stat-board.model';
import { PlayerCardManager } from '../../models/player/player-card-manager.model';
import { PlayerService } from '../../services/player/player.service';
import { StandardAction } from '../../models/standard-action/standard-action.model';
import { ImageUtil } from '~/app/shared/utils/image.util';
import { ARENAS, ArenaType } from '~/app/shared/types/dataTypes';

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
  arena!: ArenaType;

  oActiveMonster!: Monster;
  oStatBoard!: StatBoard;

  cardsInMyHand = 0;
  cardsInMyOpponentsHand = 0;

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
  ) { }

  ngOnInit() {
    this.activeMonster = this.playerService.activeMonster;
    this.inactiveMonsters = this.playerService.inactiveMonsters;
    this.playerCardManager = this.playerService.playerCardManager;
    this.statBoard = this.playerService.statBoard;

    this.oActiveMonster = this.playerService.oActiveMonster;
    this.oStatBoard = this.playerService.oStatBoard;

    this.arena = this.getRandomArena();

    this.playerService.playerCardManager.hand$.subscribe((hand) => {
      this.cardsInMyHand = hand.cardsInHand();
    });

    this.playerService.oPlayerCardManager.hand$.subscribe((hand) => {
      this.cardsInMyOpponentsHand = hand.cardsInHand();
    });

  }

  getRandomArena(): ArenaType {
    return ARENAS[Math.floor(Math.random() * ARENAS.length)];
  }

}
