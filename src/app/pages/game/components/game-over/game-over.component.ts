import { Component, Input } from '@angular/core';
import { GameOverService, WinnerType } from '../../services/game-over/game-over.service';
import { ImageUtil } from '~/app/shared/utils/image.util';
import { slideInLeftOnEnterAnimation } from 'angular-animations';
import { Router } from '@angular/router';
import { PlayerProfileService } from '~/app/shared/services/player-profile.service';
import { PlayerType } from '../../logic/player-type.mode';
import { OnlineBattleService } from '../../services/online-battle.service';
import { PeerJsService } from '~/app/shared/services/peer-js.service';
import { PlayerService } from '../../services/player/player.service';

@Component({
  selector: 'sw-game-over',
  templateUrl: './game-over.component.html',
  styleUrls: ['./game-over.component.scss'],
  animations: [
    slideInLeftOnEnterAnimation({ translate: '1000px', duration: 300 }),
  ]
})
export class GameOverComponent {
  @Input() winner: WinnerType = null; 

  winAvatar = ImageUtil.avatars.win;
  loseAvatar = ImageUtil.avatars.lose;

  isTutorial = false;
  isCustom = false;

  activePlayer!: PlayerType;

  constructor(
    private gameOverService: GameOverService,
    private playerService: PlayerService,
    private playerProfileService: PlayerProfileService,
    private onlineBattleService: OnlineBattleService,
    private peerService: PeerJsService,
    private router: Router,
  ) {
    this.isTutorial = this.router.url === '/tutorial';
    this.isCustom = this.router.url === '/custom-game';
    this.playerProfileService.profile$.subscribe((value) => {
      this.activePlayer = value.playerType;
    })
  }

  returnToTitleScreen() {
    this.gameOverService.winner$.next(null);
    if (this.onlineBattleService.isOnline) {
      this.peerService.disconnect();
    }
    this.router.navigate(['/']);
  }

  playAgain() {
    this.gameOverService.winner$.next(null);
    if (this.onlineBattleService.isOnline) {
      this.peerService.sendData('REPLAY_GAME');
      this.playerService.startOnlineGame();
    }
    else if (this.isCustom) {
      this.playerService.startCustomGame();
    }
    else {
      this.playerService.startGame();
    }
  }

  changeMonsters() {
    this.gameOverService.winner$.next(null);
    if (this.onlineBattleService.isOnline) {
      this.peerService.sendData('GO_TO_MONSTER_SELECT');
    }
    this.router.navigate(['/select-monsters']);
  }

}
