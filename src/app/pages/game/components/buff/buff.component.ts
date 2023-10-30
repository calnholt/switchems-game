import { MonsterService } from 'src/app/shared/services/monster.service';
import { ImageUtil } from 'src/app/shared/utils/image.util';
import { Buff } from './../../models/monster/monster.model';
import { Component, Input, OnInit } from '@angular/core';
import { Css, Path } from 'src/app/shared/types/dataTypes';

@Component({
  selector: 'sw-buff',
  templateUrl: './buff.component.html',
  styleUrls: ['./buff.component.scss']
})
export class BuffComponent implements OnInit {
  @Input() buff!: Buff;

  backgroundClass!: Css;
  monsterPath!: Path;

  constructor(
    private monsterService: MonsterService
  ) {
  }

  ngOnInit() {
    const monster = this.monsterService.getMonster(this.buff._monsterName);
    this.backgroundClass = monster._elements.map(e => e.toString().toLowerCase()).join("");
    this.monsterPath = ImageUtil.getMonstersPath(monster._name);
  }

}
