import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MonsterActionCardIconsComponent } from './components/monster-action/monster-action-card-icons/monster-action-card-icons.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { GameComponent } from './components/game/game.component';
import { MonsterActionGridComponent } from './components/monster-action/monster-action-grid/monster-action-grid.component';
import { MonsterActionComponent } from './components/monster-action/monster-action/monster-action.component';


@NgModule({
  declarations: [
    MonsterActionComponent,
    MonsterActionCardIconsComponent,
    GameComponent,
    MonsterActionGridComponent,
  ],
  exports: [
    MonsterActionComponent,
    MonsterActionCardIconsComponent,
    GameComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
  ]
})
export class GameModule { }
