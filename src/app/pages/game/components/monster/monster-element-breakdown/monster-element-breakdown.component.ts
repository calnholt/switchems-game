import { Component, Input } from '@angular/core';
import { ElemType, Path } from '~/app/shared/types/dataTypes';
import { ImageUtil } from '~/app/shared/utils/image.util';
import { TutorialService } from '../../../services/tutorial/tutorial.service';
import { CardCompositeKey } from '~/app/shared/interfaces/ICompositeKey.interface';

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

  isWeaknessHighlighted = false;
  isResistanceHighlighted = false;

  constructor(private tutorialService: TutorialService) {
    this.tutorialService.currentSection$.subscribe((value) => {
      this.isWeaknessHighlighted = !!value.types?.includes('WEAKNESSES');
      this.isResistanceHighlighted = !!value.types?.includes('RESISTANCES');
    })
  }

  ngOnInit(): void {
    this.superEffectiveIcon = ImageUtil.icons.superEffective;
    this.switchDefenseIcon = ImageUtil.icons.switchDefense;
  }

}
