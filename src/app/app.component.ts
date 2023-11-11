import { Component } from '@angular/core';
import { UpdateGameStateService } from './pages/game/services/update-game-state/update-game-state.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'switchems-game';
  constructor(
    private ugss: UpdateGameStateService
  ) {

  }
  
}
