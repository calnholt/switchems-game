import { Component } from '@angular/core';
import { Monster } from '../../../models/monster/monster-action.model';
import { MonsterService } from 'src/app/shared/services/monster.service';
import { StatBoard } from '../../../models/stat-board/stat-board.model';

@Component({
  selector: 'sw-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent {

  statBoard = new StatBoard();

  constructor(private monsterService: MonsterService) {}

  monsters: Monster[] = [];

  ngOnInit() {
    this.monsters = this.monsterService.getMonsters();
  }
}
