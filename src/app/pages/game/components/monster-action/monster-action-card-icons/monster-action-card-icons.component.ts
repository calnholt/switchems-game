import { Component, Input } from '@angular/core';
import { ImageUtil } from 'src/app/shared/utils/image.util';
import { SelectedActionService } from '../../../services/selected-action/selected-action.service';
import { MonsterAction } from '../../../models/monster/monster-action.model';
import { TutorialService } from '../../../services/tutorial/tutorial.service';

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

  isBuffIconHighlighted = false;
  isDiscardIconHighlighted = false;
  isDrawIconHighlighted = false;

  constructor(
    private playerCardManagerService: SelectedActionService,
    private tutorialService: TutorialService,
  ) {
  }

  ngOnInit() {
    this.playerCardManagerService.selectedAction$.subscribe((selectAction) => {
      if (!selectAction.action) {
        this.buffSlotsUsed = 0;
        this.discardSlotsUsed = 0;
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
    this.tutorialService.currentSection$.subscribe((value) => {
      this.isBuffIconHighlighted = !!value.types?.includes('MONSTER_ACTION_BUFF');
      this.isDiscardIconHighlighted = !!value.types?.includes('MONSTER_ACTION_DISCARD');
      this.isDrawIconHighlighted = !!value.types?.includes('MONSTER_ACTION_DRAW');
    });
  }

  getCardTypeArray(amount: number, type: CardType) {
    if (amount > 0) {
      return ([...Array(amount).keys()]).map((obj, i) => { return { type: type, index: i }});
    }
    return [];
  }
}
