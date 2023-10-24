import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MonsterActionComponent } from './components/monster-action/monster-action.component';
import { MonsterActionCardIconsComponent } from './components/monster-action/monster-action-card-icons/monster-action-card-icons.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { GameComponent } from './components/game/game.component';
import { MonsterActionTermHoverComponent } from './components/monster-action/hovers/monster-action-term-hover/monster-action-term-hover.component';
import { MonsterActionHoversComponent } from './components/monster-action/hovers/monster-action-hovers/monster-action-hovers.component';


@NgModule({
  declarations: [
    MonsterActionComponent,
    MonsterActionCardIconsComponent,
    GameComponent,
    MonsterActionTermHoverComponent,
    MonsterActionHoversComponent
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
