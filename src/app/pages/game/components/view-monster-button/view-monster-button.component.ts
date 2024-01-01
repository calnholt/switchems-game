import { Component, Input } from '@angular/core';
import { MonsterBeingViewed, MonsterViewService } from '../../services/monster-view/monster-view.service';
import { CardCompositeKey } from '~/app/shared/interfaces/ICompositeKey.interface';
import { ImageUtil } from '~/app/shared/utils/image.util';
import { PlayerType } from '../../logic/player-type.mode';

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


  constructor(
    private monsterViewService: MonsterViewService,
  ) {
    
  }

  ngOnInit() {
    this.monsterViewService.monsterBeingViewed$.subscribe((value) => {
      this.monsterBeingViewed = value;
      this.isActive = value.key === this.key && value.player === this.player;
    });
  }

  view() {
    this.monsterViewService.changeViewedMonster(this.key, this.player);
  }

}
