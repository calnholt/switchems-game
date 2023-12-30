import { Routes } from '@angular/router';
import { GameComponent } from './pages/game/components/game/game.component';
import { TitleScreenComponent } from './pages/title-screen/title-screen/title-screen.component';
import { SelectMonstersComponent } from './pages/select-monsters/components/select-monsters/select-monsters.component';

export const AppRoutingModule: Routes = [
  {
    path: '',
    component: TitleScreenComponent
  },
  {
    path: 'quick-start',
    component: GameComponent
  },
  {
    path: 'tutorial',
    component: GameComponent
  },
  {
    path: 'select-monsters',
    component: SelectMonstersComponent
  },
];