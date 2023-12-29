import { Component, Input } from '@angular/core';
import { MonsterAction } from '../../../models/monster/monster-action.model';
import { StandardAction } from '../../../models/standard-action/standard-action.model';

@Component({
  selector: 'sw-monster-action-grid',
  templateUrl: './monster-action-grid.component.html',
  styleUrls: ['./monster-action-grid.component.scss']
})
export class MonsterActionGridComponent {
  @Input() actions!: MonsterAction[];
  @Input() cardsInHand = 0;
  @Input() disable = false;

  restStandardAction = new StandardAction('Rest', '[+] [+] [HP]');
  prepareStandardAction = new StandardAction('Prepare', '[+] <div>{\"stat\": \"?\", \"num\": 3}</div>');
  
}
