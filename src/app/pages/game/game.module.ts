import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MonsterActionComponent } from './components/monster-action/monster-action.component';
import { MonsterActionCardIconsComponent } from './components/monster-action/monster-action-card-icons/monster-action-card-icons.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { GameComponent } from './components/game/game.component';


@NgModule({
  declarations: [
    MonsterActionComponent,
    MonsterActionCardIconsComponent,
    GameComponent,
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
