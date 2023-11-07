import { Component, Input } from '@angular/core';
import { ImageUtil } from 'src/app/shared/utils/image.util';
import { SelectedActionService } from '../../../services/selected-action/selected-action.service';
import { MonsterAction } from '../../../models/monster/monster-action.model';
import { SelectedAction } from '../../../services/selected-action/selected-action.model';

type CardType = 'BUFF' | 'DRAW' | 'DISCARD';

@Component({
  selector: 'sw-monster-action-card-icons',
  templateUrl: './monster-action-card-icons.component.html',
  styleUrls: ['./monster-action-card-icons.component.scss']
})
export class MonsterActionCardIconsComponent {
  @Input() action!: MonsterAction;
  cardTypes: {type: CardType, index: number}[] = [];

  // subscriptions
  selectedAction!: SelectedAction | undefined;

  buffImg = ImageUtil.icons.buff;
  discardImg = ImageUtil.icons.discard;
  drawImg = ImageUtil.icons.draw;

  constructor(
    private playerCardManagerService: SelectedActionService
  ) {
  }

  ngOnInit() {
    this.playerCardManagerService.selectedAction$.subscribe((applied) => {
      if (!applied.action) {
        return;
      }
      if (applied.action.key() === this.action.key()){
        this.selectedAction = applied;
      }
      else {
        this.selectedAction = new SelectedAction(null);
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
