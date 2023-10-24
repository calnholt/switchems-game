import { Component } from '@angular/core';
import { MonsterAction } from '../../models/monster/monster.model';
import { MonsterService } from 'src/app/shared/services/monster.service';

@Component({
  selector: 'sw-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent {

  constructor(private monsterService: MonsterService) {}

  actions: MonsterAction[] = [];

  ngOnInit() {
    this.monsterService.getMonsters().forEach(m => {
      this.actions = this.actions.concat(m.actions);
    })
  }
}
