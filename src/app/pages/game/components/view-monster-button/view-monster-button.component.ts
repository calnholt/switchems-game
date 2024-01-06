import { Component, Input } from '@angular/core';
import { MonsterBeingViewed, MonsterViewService } from '../../services/monster-view/monster-view.service';
import { CardCompositeKey } from '~/app/shared/interfaces/ICompositeKey.interface';
import { ImageUtil } from '~/app/shared/utils/image.util';
import { PlayerType } from '../../logic/player-type.mode';
import { SfxService } from '~/app/shared/services/sfx.service';
import { SimpleTooltipType } from '~/app/shared/utils/tooltip.util';
import { PlayerProfileService } from '~/app/shared/services/player-profile.service';

@Component({
  selector: 'sw-view-monster-button',
  templateUrl: './view-monster-button.component.html',
  styleUrls: ['./view-monster-button.component.scss']
})
export class ViewMonsterButtonComponent {
  @Input() key!: CardCompositeKey;
  @Input() player!: PlayerType;
  @Input() isActiveMonster: boolean = false;
  
  monsterBeingViewed!: MonsterBeingViewed;
  isActive = false;
  readonly ImageUtil = ImageUtil;
  tooltipType!: SimpleTooltipType;

  isActiveMonsterBeingViewed = false;


  constructor(
    private monsterViewService: MonsterViewService,
    private playerProfileService: PlayerProfileService,
    private sfx: SfxService,
  ) {
    
  }

  ngOnInit() {
    this.monsterViewService.monsterBeingViewed$.subscribe((value) => {
      this.monsterBeingViewed = value;
      this.isActive = value.key === this.key && value.player === this.player;
      this.tooltipType = this.getTooltipType();
      this.isActiveMonsterBeingViewed = this.isActiveMonster && this.isActive && this.playerProfileService.profile.playerType === this.monsterBeingViewed.player;
    });
  }

  view() {
    if (this.isActive) {
      this.monsterViewService.reset();
    }
    else {
      this.monsterViewService.changeViewedMonster(this.key, this.player);
    }
    if (this.isActive) {
      this.sfx.play('CLICK');
    }
  }

  getTooltipType(): SimpleTooltipType {
    if (this.isActiveMonsterBeingViewed) {
      return 'CURRENTLY_VIEWING_ACTIVE_MONSTER';
    }
    if (this.isActiveMonster && this.isActive ) {
      return 'CURRENTLY_VIEWING_MONSTER';
    }
    if (!this.isActiveMonster && this.isActive) {
      return 'CURRENTLY_VIEWING_MONSTER_RIGHT';
    }
    if (this.isActiveMonster && !this.isActive) {
      return 'VIEW_MONSTER_ACTIONS';
    }
    return 'VIEW_MONSTER_ACTIONS_RIGHT';
  }

}
