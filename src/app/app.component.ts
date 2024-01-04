import { Component } from '@angular/core';
import { PeerMessageHandlerService } from './pages/game/services/peer-message-handler.service';
import { GameStateService } from './pages/game/services/game-state/game-state.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'switchems-game';

  constructor(
    private p: PeerMessageHandlerService, 
    private cpu: GameStateService,
  ) {
    
  }

}
