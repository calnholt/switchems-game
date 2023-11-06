import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MonsterActionCardIconsComponent } from './components/monster-action/monster-action-card-icons/monster-action-card-icons.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { GameComponent } from './components/game/game/game.component';
import { MonsterActionGridComponent } from './components/monster-action/monster-action-grid/monster-action-grid.component';
import { MonsterActionComponent } from './components/monster-action/monster-action/monster-action.component';
import { StatBoardComponent } from './components/game/stat-board/stat-board.component';
import { StatBoardSectionComponent } from './components/game/stat-board/stat-board-section/stat-board-section.component';
import { MonsterActiveComponent } from './components/monster/monster.component';
import { MonsterTooltipComponent } from './components/monster/monster-tooltip/monster-tooltip.component';
import { BuffComponent } from './components/buff/buff.component';
import { PlayerHandComponent } from './components/player-hand/player-hand.component';
import { BuffTooltipComponent } from './components/buff/buff-tooltip/buff-tooltip.component';
import { MonsterHpComponent } from './components/monster/monster-hp/monster-hp.component';
import { MonsterElementBreakdownComponent } from './components/monster/monster-element-breakdown/monster-element-breakdown.component';
import { StandardActionComponent } from './components/standard-action/standard-action.component';
import { SubmitActionButtonComponent } from './components/submit-action-button/submit-action-button.component';


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
    PlayerHandComponent,
    BuffTooltipComponent,
    MonsterHpComponent,
    MonsterElementBreakdownComponent,
    StandardActionComponent,
    SubmitActionButtonComponent,
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
