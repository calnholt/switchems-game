import { Component, Input } from '@angular/core';
import { StatBoard } from '../../../models/stat-board/stat-board.model';

@Component({
  selector: 'sw-stat-board',
  templateUrl: './stat-board.component.html',
  styleUrls: ['./stat-board.component.scss']
})
export class StatBoardComponent {
  @Input() statBoard: StatBoard = new StatBoard();
  @Input() disable: boolean = false;
}
