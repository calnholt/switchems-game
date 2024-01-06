import { Routes } from '@angular/router';
import { GameComponent } from './pages/game/components/game/game.component';
import { TitleScreenComponent } from './pages/title-screen/title-screen/title-screen.component';
import { SelectMonstersComponent } from './pages/select-monsters/components/select-monsters/select-monsters.component';
import { LobbyComponent } from './pages/lobby/components/lobby/lobby.component';
import { CreditsComponent } from './pages/credits/credits.component';

export const AppRoutingModule: Routes = [
  {
    path: '',
    component: TitleScreenComponent
  },
  {
    path: 'quick-game',
    component: GameComponent
  },
  {
    path: 'online-game',
    component: GameComponent
  },
  {
    path: 'custom-game',
    component: GameComponent,
  },
  {
    path: 'tutorial',
    component: GameComponent
  },
  {
    path: 'select-monsters',
    component: SelectMonstersComponent,
  },
  {
    path: 'lobby',
    component: LobbyComponent
  },
  {
    path: 'credits',
    component: CreditsComponent
  },
];