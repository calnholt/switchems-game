import { Component } from '@angular/core';
import { CurrentPhaseService } from '../../services/current-phase/current-phase.service';
import { StringUtil } from '~/app/shared/utils/string.util';
import { PlayerProfileService } from '~/app/shared/services/player-profile.service';

@Component({
  selector: 'sw-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.scss']
})
export class TopBarComponent {
  
  phase!: string;
  round = 0;

  player!: string;
  opponent!: string;

  constructor(
    private currentPhaseService: CurrentPhaseService,
    private playerProfileService: PlayerProfileService,
  ) {

  }

  ngOnInit() {
    this.currentPhaseService.currentPhase$.subscribe((value) => {
      this.phase = StringUtil.capitalizeFirstLetterAndReplaceUnderscores(value.toLowerCase());
      this.round = this.currentPhaseService.currentTurn === 0 ? 1 : this.currentPhaseService.currentTurn;
    });
    this.player = this.playerProfileService.profile.name.length ? this.playerProfileService.profile.name : 'You';
    this.opponent = this.playerProfileService.opponentProfile.name.length ? this.playerProfileService.opponentProfile.name : 'Opponent';
  }

}
