import { Component, Input } from '@angular/core';
import { GameOverService, WinnerType } from '../../services/game-over/game-over.service';
import { CurrentPhaseService } from '../../services/current-phase/current-phase.service';
import { ImageUtil } from '~/app/shared/utils/image.util';
import { slideInLeftAnimation, slideInLeftOnEnterAnimation } from 'angular-animations';
import { Router } from '@angular/router';

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
  isCustomGame = false;

  constructor(
    private gameOverService: GameOverService,
    private currentPhaseService: CurrentPhaseService,
    private router: Router,
  ) {
    this.isTutorial = this.router.url === '/tutorial';
    this.isCustomGame = this.router.url === '/custom-game';
  }

  returnToTitleScreen() {
    this.router.navigate(['/']);
  }

  playAgain() {
    this.gameOverService.winner$.next(null);
    this.currentPhaseService.startGame();
  }

  changeMonsters() {
    this.gameOverService.winner$.next(null);
    this.router.navigate(['/select-monsters']);
  }

}
