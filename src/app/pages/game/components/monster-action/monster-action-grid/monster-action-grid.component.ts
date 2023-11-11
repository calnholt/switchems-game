import { Component, Input } from '@angular/core';
import { MonsterAction } from '../../../models/monster/monster-action.model';
import { StandardAction } from '../../../models/standard-action/standard-action.model';
import { ImageUtil } from '~/app/shared/utils/image.util';

@Component({
  selector: 'sw-monster-action-grid',
  templateUrl: './monster-action-grid.component.html',
  styleUrls: ['./monster-action-grid.component.scss']
})
export class MonsterActionGridComponent {
  @Input() actions!: MonsterAction[];
  @Input() cardsInHand = 0;

  restStandardAction = new StandardAction('Rest', [
    ImageUtil.icons.draw, 
    ImageUtil.icons.draw, 
    ImageUtil.icons.hp
  ]);
  prepareStandardAction = new StandardAction('Prepare', [
    ImageUtil.icons.draw, 
    ImageUtil.icons.randomCube, 
    ImageUtil.icons.randomCube, 
    ImageUtil.icons.randomCube, 
  ]);
  
}
