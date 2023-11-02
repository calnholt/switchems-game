import { Component, Input } from '@angular/core';

@Component({
  selector: 'sw-monster-hp',
  templateUrl: './monster-hp.component.html',
  styleUrls: ['./monster-hp.component.scss']
})
export class MonsterHpComponent {
  @Input() hp!: number;
  @Input() currentHp!: number;
  @Input() initiative!: number;
}
