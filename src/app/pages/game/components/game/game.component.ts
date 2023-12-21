import { Component, OnChanges, SimpleChanges } from '@angular/core';
import { Monster } from '../../models/monster/monster.model';
import { StatBoard } from '../../models/stat-board/stat-board.model';
import { PlayerCardManager } from '../../models/player/player-card-manager.model';
import { PlayerService } from '../../services/player/player.service';
import { StandardAction } from '../../models/standard-action/standard-action.model';
import { ImageUtil } from '~/app/shared/utils/image.util';
import { ARENAS, ArenaType } from '~/app/shared/types/dataTypes';
import { BattleAnimationService } from '../../services/battle-animation/battle-animation.service';
import { Modifier, MonsterModifierType } from '../../logic/modifiers/modifier.model';
import { Subscription } from 'rxjs';
import { GameOverService, WinnerType } from '../../services/game-over/game-over.service';

@Component({
  selector: 'sw-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnChanges {

  playerCardManager!: PlayerCardManager;
  statBoard!: StatBoard;
  activeMonster!: Monster;
  inactiveMonsters: Monster[] = [];
  arena!: ArenaType;
  modifiers: Modifier<MonsterModifierType>[] = [];
  modifiersSub!: Subscription;
  
  oInactiveMonsters: Monster[] = [];
  oActiveMonster!: Monster;
  oStatBoard!: StatBoard;
  oModifiers: Modifier<MonsterModifierType>[] = []
  oModifiersSub!: Subscription;

  cardsInMyHand = 0;
  cardsInMyOpponentsHand = 0;

  viewOpponentActions = false;

  winner: WinnerType = null;

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
    private gameOverService: GameOverService,
  ) { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['activeMonster']) {
      console.log('');
    }
  }

  ngOnInit() {
    this.playerService.player.activeMonster$.subscribe((value) => {
      if (this.modifiersSub) {
        this.modifiersSub.unsubscribe();
      }
      this.activeMonster = value;
      this.battleAniService.update(true, 'SWITCHING_IN');
      this.modifiersSub = this.activeMonster.modifiers.modifiers$.subscribe((modifiers) => {
        this.modifiers = modifiers;
      });

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
      if (this.oModifiersSub) {
        this.oModifiersSub.unsubscribe();
      }
      this.oActiveMonster = value;
      this.battleAniService.update(false, 'SWITCHING_IN');
      this.oModifiersSub = this.oActiveMonster.modifiers.modifiers$.subscribe((modifiers) => {
        this.oModifiers = modifiers;
      });
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
    this.gameOverService.winner$.subscribe((value) => {
      this.winner = value;
    })
  }


  getRandomArena(): ArenaType {
    return ARENAS[Math.floor(Math.random() * ARENAS.length)];
  }

}
