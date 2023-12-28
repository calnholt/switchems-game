import { Component, Input } from '@angular/core';
import { StatBoard } from '../../../models/stat-board/stat-board.model';
import { TutorialService } from '../../../services/tutorial/tutorial.service';

@Component({
  selector: 'sw-stat-board',
  templateUrl: './stat-board.component.html',
  styleUrls: ['./stat-board.component.scss']
})
export class StatBoardComponent {
  @Input() statBoard: StatBoard = new StatBoard();
  @Input() disable: boolean = false;

  isStatBoardHighlighted = false;

  constructor(
    private tutorialService: TutorialService,
  ) {

  }

  ngOnInit() {
    this.tutorialService.currentSection$.subscribe((value) => {
      this.isStatBoardHighlighted = !!value.types?.includes('PIP_SECTION');
    });
  }

}
