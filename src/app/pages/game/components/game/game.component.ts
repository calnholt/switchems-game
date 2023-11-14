import { Component } from '@angular/core';
import { Monster } from '../../models/monster/monster.model';
import { StatBoard } from '../../models/stat-board/stat-board.model';
import { PlayerCardManager } from '../../models/player/player-card-manager.model';
import { PlayerService } from '../../services/player/player.service';
import { StandardAction } from '../../models/standard-action/standard-action.model';
import { ImageUtil } from '~/app/shared/utils/image.util';
import { ARENAS, ArenaType } from '~/app/shared/types/dataTypes';
import { BattleAnimationService } from '../../services/battle-animation/battle-animation.service';

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
  
  oInactiveMonsters: Monster[] = [];
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
    private battleAniService: BattleAnimationService,
  ) { }

  ngOnInit() {
    this.playerService.player.activeMonster$.subscribe((value) => {
      this.activeMonster = value;
      this.battleAniService.update(true, 'SWITCHING_IN');
    });
    this.playerService.player.inactiveMonsters$.subscribe((value) => {
      this.inactiveMonsters = value;
    });
    this.playerService.player.playerCardManager$.subscribe((value) => {
      this.playerCardManager = value;
    });
    this.playerService.player.statBoard$.subscribe((value) => {
      this.statBoard = value;
    });

    this.playerService.oPlayer.activeMonster$.subscribe((value) => {
      this.oActiveMonster = value;
      this.battleAniService.update(false, 'SWITCHING_IN');
    });
    this.playerService.oPlayer.inactiveMonsters$.subscribe((value) => {
      this.oInactiveMonsters = value;
    });
    this.playerService.oPlayer.statBoard$.subscribe((value) => {
      this.oStatBoard = value;
    });

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
