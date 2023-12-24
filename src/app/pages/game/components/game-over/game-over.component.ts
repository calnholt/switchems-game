import { Component, Input } from '@angular/core';
import { GameOverService, WinnerType } from '../../services/game-over/game-over.service';
import { CurrentPhaseService } from '../../services/current-phase/current-phase.service';
import { ImageUtil } from '~/app/shared/utils/image.util';

@Component({
  selector: 'sw-game-over',
  templateUrl: './game-over.component.html',
  styleUrls: ['./game-over.component.scss']
})
export class GameOverComponent {
  @Input() winner: WinnerType = null; 

  winAvatar = ImageUtil.avatars.win;
  loseAvatar = ImageUtil.avatars.lose;

  constructor(
    private gameOverService: GameOverService,
    private currentPhaseService: CurrentPhaseService,
  ) {

  }

  returnToTitleScreen() {

  }

  playAgain() {
    this.gameOverService.winner$.next(null);
    this.currentPhaseService.startGame();
  }

}
