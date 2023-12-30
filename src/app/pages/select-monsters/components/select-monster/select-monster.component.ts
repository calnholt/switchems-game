import { Component, Input } from '@angular/core';
import { Monster } from '~/app/pages/game/models/monster/monster.model';

@Component({
  selector: 'sw-select-monster',
  templateUrl: './select-monster.component.html',
  styleUrls: ['./select-monster.component.scss']
})
export class SelectMonsterComponent {
  @Input() monster!: Monster;


}
