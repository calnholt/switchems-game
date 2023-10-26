import { Component, Input, OnInit } from '@angular/core';
import { Monster } from '../../models/monster/monster.model';
import { ImageUtil } from 'src/app/shared/utils/image.util';
import { Path } from 'src/app/shared/types/dataTypes';

@Component({
  selector: 'sw-monster-active',
  templateUrl: './monster-active.component.html',
  styleUrls: ['./monster-active.component.scss']
})
export class MonsterActiveComponent implements OnInit {
  @Input() monster!: Monster;
  
  monsterIcon!: Path;
  
  ngOnInit(): void {
    this.monsterIcon = ImageUtil.getMonstersPath(this.monster.name);
  }

}
