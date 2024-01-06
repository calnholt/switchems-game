import { Component, Input } from '@angular/core';
import { CurrentPhaseService } from '../../services/current-phase/current-phase.service';
import { StringUtil } from '~/app/shared/utils/string.util';
import { PlayerProfileService } from '~/app/shared/services/player-profile.service';
import { ImageUtil } from '~/app/shared/utils/image.util';
import { Monster } from '../../models/monster/monster.model';
import { EventCommandQueueService } from '../../services/event-command-queue/event-command-queue.service';
import { PlayerService } from '../../services/player/player.service';

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

  isGiga = false;
  isOpponentGiga = false;

  hpString = '';
  oHpString = '';

  aliveMonsters = 3;
  oAliveMonsters = 3;

  readonly ImageUtil = ImageUtil;

  constructor(
    private currentPhaseService: CurrentPhaseService,
    private playerProfileService: PlayerProfileService,
    private ecqs: EventCommandQueueService,
    private playerService: PlayerService,
  ) {
  }

  ngOnInit() {
    this.isGiga = !!this.playerProfileService.profile.gigachad;
    this.isOpponentGiga = !!this.playerProfileService.opponentProfile.gigachad;
    this.player = this.playerProfileService.profile.name.length ? this.playerProfileService.profile.name : 'You';
    this.opponent = this.playerProfileService.opponentProfile.name.length ? this.playerProfileService.opponentProfile.name : 'Opponent';
    this.currentPhaseService.currentPhase$.subscribe((value) => {
      this.phase = StringUtil.capitalizeFirstLetterAndReplaceUnderscores(value.toLowerCase());
      this.round = this.currentPhaseService.currentTurn === 0 ? 1 : this.currentPhaseService.currentTurn;
    });
    // using this is a little clumsy :3
    this.ecqs.event$.subscribe((command) => {
      const { activeMonster, inactiveMonsters, oActiveMonster,oInactiveMonsters } = this.playerService;
      this.hpString = this.getHpString(inactiveMonsters.concat(activeMonster));
      this.oHpString = this.getHpString(oInactiveMonsters.concat(oActiveMonster));
      this.aliveMonsters = inactiveMonsters.concat(activeMonster).reduce((acc, val) => (val.currentHp > 0 ? 1 : 0) + acc, 0);
      this.oAliveMonsters = oInactiveMonsters.concat(oActiveMonster).reduce((acc, val) => (val.currentHp > 0 ? 1 : 0) + acc, 0);
    });
  }

  getHpString(monsters: Monster[]): string {
    const current = monsters.reduce((acc, val) => val.currentHp + acc, 0);
    const max = monsters.reduce((acc, val) => val.hp + acc, 0);
    return `${current}/${max} [HP]`;
  }

}
