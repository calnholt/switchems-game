import { Component, Input } from '@angular/core';
import { ImageUtil } from 'src/app/shared/utils/image.util';
import { SelectedActionService } from '../../../services/selected-action/selected-action.service';
import { MonsterAction } from '../../../models/monster/monster-action.model';

type CardType = 'BUFF' | 'DRAW' | 'DISCARD';

@Component({
  selector: 'sw-monster-action-card-icons',
  templateUrl: './monster-action-card-icons.component.html',
  styleUrls: ['./monster-action-card-icons.component.scss']
})
export class MonsterActionCardIconsComponent {
  @Input() action!: MonsterAction;
  cardTypes: {type: CardType, index: number}[] = [];

  buffSlotsUsed = 0;
  discardSlotsUsed = 0;

  buffImg = ImageUtil.icons.buff;
  discardImg = ImageUtil.icons.discard;
  drawImg = ImageUtil.icons.draw;

  constructor(
    private playerCardManagerService: SelectedActionService
  ) {
  }

  ngOnInit() {
    this.playerCardManagerService.selectedAction$.subscribe((selectAction) => {
      if (!selectAction.action) {
        return;
      }
      if (selectAction.action.key() === this.action.key()){
        this.buffSlotsUsed = selectAction.getNumBuffSlotsUsed();
        this.discardSlotsUsed = selectAction.getNumDiscardSlotsUsed();
      }
      else {
        this.buffSlotsUsed = 0;
        this.discardSlotsUsed = 0;
      }
    })
    this.cardTypes = this.cardTypes.concat(
      this.getCardTypeArray(this.action.getNumOfBuffSlots(), 'BUFF'),
      this.getCardTypeArray(this.action.getNumOfDiscardSlots(), 'DISCARD'),
      this.getCardTypeArray(this.action.draw, 'DRAW'),
    );
  }

  getCardTypeArray(amount: number, type: CardType) {
    if (amount > 0) {
      return ([...Array(amount).keys()]).map((obj, i) => { return { type: type, index: i }});
    }
    return [];
  }
}
