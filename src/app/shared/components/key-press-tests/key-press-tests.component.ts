import { Component, HostListener } from '@angular/core';
import { PlayerService } from '~/app/pages/game/services/player/player.service';
import { PeerJsService } from '../../services/peer-js.service';
import { Router } from '@angular/router';
import { MonsterSelectionService } from '~/app/pages/select-monsters/services/monster-selection.service';

@Component({
  selector: 'sw-key-press-tests',
  templateUrl: './key-press-tests.component.html',
  styleUrls: ['./key-press-tests.component.scss']
})
export class KeyPressTestsComponent {

  constructor(
    private playerService: PlayerService,
    private peerService: PeerJsService,
    private monsterSelectionService: MonsterSelectionService,
    private router: Router,
  ) {
  }

  // @HostListener('window:keydown.R')
  // restartOnlineGame() {
  //   this.peerService.sendData('REPLAY_GAME');
  //   this.playerService.startOnlineGame();
  // }

  // @HostListener('window:keydown.M')
  // goToMonsterSelect() {
  //   this.monsterSelectionService.opponentSelectionType$.next('');
  //   this.peerService.sendData('GO_TO_MONSTER_SELECT');
  //   this.router.navigate(['/select-monsters']);
  // }

}
