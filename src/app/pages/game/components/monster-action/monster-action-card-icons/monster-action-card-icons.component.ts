import { Component, Input } from '@angular/core';
import { ImageUtil } from 'src/app/shared/utils/image.util';
import { MonsterActionCardIcons } from '../../../models/monster/monster-action-card-icons.model';
import { Applied, PlayerCardManagerService } from '../../../services/player-card-manager/player-card-manager.service';

type CardType = 'BUFF' | 'DRAW' | 'DISCARD' | 'ADDED_BUFF';

@Component({
  selector: 'sw-monster-action-card-icons',
  templateUrl: './monster-action-card-icons.component.html',
  styleUrls: ['./monster-action-card-icons.component.scss']
})
export class MonsterActionCardIconsComponent {
  @Input() icons!: MonsterActionCardIcons;
  cardTypes: {type: CardType, index: number}[] = [];

  // subscriptions
  applied!: Applied;

  buffImg = ImageUtil.icons.buff;
  discardImg = ImageUtil.icons.discard;
  drawImg = ImageUtil.icons.draw;

  constructor(
    private playerCardManagerService: PlayerCardManagerService
  ) {

  }

  ngOnInit() {
    this.playerCardManagerService.applied$.subscribe((applied) => {
      this.applied = applied;
    })
    this.cardTypes = this.cardTypes.concat(
      this.getCardTypeArray(this.icons.buff, 'BUFF'),
      this.getCardTypeArray(this.icons.addedBuff, 'ADDED_BUFF'),
      this.getCardTypeArray(this.icons.discard, 'DISCARD'),
      this.getCardTypeArray(this.icons.draw, 'DRAW'),
    );
  }

  getCardTypeArray(amount: number, type: CardType) {
    if (amount > 0) {
      return ([...Array(amount).keys()]).map((obj, i) => { return { type: type, index: i }});
    }
    return [];
  }
}
