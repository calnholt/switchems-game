import { Component, Input } from '@angular/core';
import { MonsterBeingViewed, MonsterViewService } from '../../services/monster-view/monster-view.service';
import { CardCompositeKey } from '~/app/shared/interfaces/ICompositeKey.interface';
import { ImageUtil } from '~/app/shared/utils/image.util';
import { PlayerType } from '../../logic/player-type.mode';
import { SfxService } from '~/app/shared/services/sfx.service';
import { SimpleTooltipType } from '~/app/shared/utils/tooltip.util';

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


  constructor(
    private monsterViewService: MonsterViewService,
    private sfx: SfxService,
  ) {
    
  }

  ngOnInit() {
    this.monsterViewService.monsterBeingViewed$.subscribe((value) => {
      this.monsterBeingViewed = value;
      this.isActive = value.key === this.key && value.player === this.player;
      this.tooltipType = this.getTooltipType();
    });
  }

  view() {
    this.monsterViewService.changeViewedMonster(this.key, this.player);
    if (this.isActive) {
      this.sfx.play('CLICK');
    }
  }

  getTooltipType(): SimpleTooltipType {
    if (this.isActiveMonster && this.isActive) {
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
