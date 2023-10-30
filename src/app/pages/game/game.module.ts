import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MonsterActionCardIconsComponent } from './components/monster-action/monster-action-card-icons/monster-action-card-icons.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { GameComponent } from './components/game/game/game.component';
import { MonsterActionGridComponent } from './components/monster-action/monster-action-grid/monster-action-grid.component';
import { MonsterActionComponent } from './components/monster-action/monster-action/monster-action.component';
import { StatBoardComponent } from './components/game/stat-board/stat-board.component';
import { StatBoardSectionComponent } from './components/game/stat-board/stat-board-section/stat-board-section.component';
import { MonsterActiveComponent } from './components/monster-active/monster-active.component';
import { MonsterTooltipComponent } from './components/monster-active/monster-tooltip/monster-tooltip.component';
import { BuffComponent } from './components/buff/buff.component';


@NgModule({
  declarations: [
    MonsterActionComponent,
    MonsterActionCardIconsComponent,
    GameComponent,
    MonsterActionGridComponent,
    StatBoardComponent,
    StatBoardSectionComponent,
    MonsterActiveComponent,
    MonsterTooltipComponent,
    BuffComponent,
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
