import { Component, Input } from '@angular/core';
import { MonsterAction } from '../../../models/monster/monster.model';

@Component({
  selector: 'sw-monster-action-grid',
  templateUrl: './monster-action-grid.component.html',
  styleUrls: ['./monster-action-grid.component.scss']
})
export class MonsterActionGridComponent {
  @Input() actions!: MonsterAction[];

  
}
