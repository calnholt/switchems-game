import { Component, Input } from '@angular/core';
import { ElemType, Path } from '~/app/shared/types/dataTypes';
import { ImageUtil } from '~/app/shared/utils/image.util';

@Component({
  selector: 'sw-monster-element-breakdown',
  templateUrl: './monster-element-breakdown.component.html',
  styleUrls: ['./monster-element-breakdown.component.scss']
})
export class MonsterElementBreakdownComponent {
  @Input() weaknesses!: ElemType[];
  @Input() resistances!: ElemType[];
  @Input() switchDefense!: number;

  readonly ImageUtil = ImageUtil;
  superEffectiveIcon!: Path;
  switchDefenseIcon!: Path;

  ngOnInit(): void {
    this.superEffectiveIcon = ImageUtil.icons.superEffective;
    this.switchDefenseIcon = ImageUtil.icons.switchDefense;
  }

}
