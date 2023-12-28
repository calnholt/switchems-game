import { Component, Input } from '@angular/core';
import { TutorialService } from '../../../services/tutorial/tutorial.service';

@Component({
  selector: 'sw-monster-hp',
  templateUrl: './monster-hp.component.html',
  styleUrls: ['./monster-hp.component.scss']
})
export class MonsterHpComponent {
  @Input() hp!: number;
  @Input() currentHp!: number;
  @Input() initiative!: number;

  isHpHighlighted = false;
  isInitiativeHighlighted = false;

  constructor(
    private tutorialService: TutorialService,
  ) {
    this.tutorialService.currentSection$.subscribe((value) => {
      this.isHpHighlighted = !!value.types?.includes('HP');
      this.isInitiativeHighlighted = !!value.types?.includes('INITIATIVE');
    })
  }

}
