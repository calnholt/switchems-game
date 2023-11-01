import { Component, Input, OnInit } from '@angular/core';
import { Monster } from '../../models/monster/monster.model';
import { ImageUtil } from 'src/app/shared/utils/image.util';
import { Path } from 'src/app/shared/types/dataTypes';

@Component({
  selector: 'sw-monster',
  templateUrl: './monster.component.html',
  styleUrls: ['./monster.component.scss']
})
export class MonsterActiveComponent implements OnInit {
  @Input() monster!: Monster;
  
  monsterIcon!: Path;
  superEffectiveIcon!: Path;
  switchDefenseIcon!: Path;
  readonly ImageUtil = ImageUtil;
  
  ngOnInit(): void {
    this.monsterIcon = ImageUtil.getMonstersPath(this.monster._name);
    this.superEffectiveIcon = ImageUtil.icons.superEffective;
    this.switchDefenseIcon = ImageUtil.icons.switchDefense;
  }

}
