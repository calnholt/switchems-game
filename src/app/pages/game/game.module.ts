import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MonsterActionCardIconsComponent } from './components/monster-action/monster-action-card-icons/monster-action-card-icons.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { GameComponent } from './components/game/game.component';
import { MonsterActionGridComponent } from './components/monster-action/monster-action-grid/monster-action-grid.component';
import { MonsterActionComponent } from './components/monster-action/monster-action/monster-action.component';
import { StatBoardComponent } from './components/game/stat-board/stat-board.component';
import { StatBoardSectionComponent } from './components/game/stat-board/stat-board-section/stat-board-section.component';
import { MonsterComponent } from './components/monster/monster.component';
import { MonsterTooltipComponent } from './components/monster/monster-tooltip/monster-tooltip.component';
import { BuffComponent } from './components/buff/buff.component';
import { PlayerHandComponent } from './components/player-hand/player-hand.component';
import { BuffTooltipComponent } from './components/buff/buff-tooltip/buff-tooltip.component';
import { MonsterHpComponent } from './components/monster/monster-hp/monster-hp.component';
import { MonsterElementBreakdownComponent } from './components/monster/monster-element-breakdown/monster-element-breakdown.component';
import { StandardActionComponent } from './components/standard-action/standard-action.component';
import { SubmitActionButtonComponent } from './components/submit-action-button/submit-action-button.component';
import { DialogComponent } from './components/dialog/dialog.component';
import { SwitchOutDialogComponent } from './components/dialog/switch-out-dialog/switch-out-dialog.component';
import { ModifiersComponent } from './components/modifiers/modifiers.component';
import { KOSwitchOutDialogComponent } from './components/dialog/ko-switch-out-dialog/koswitch-out-dialog/koswitch-out-dialog.component';
import { CrushDialogComponent } from './components/dialog/crush-dialog/crush-dialog.component';
import { StatusEffectsComponent } from './components/status-effects/status-effects.component';
import { GameOverComponent } from './components/game-over/game-over.component';
import { DisableMonsterActionDialogComponent } from './components/dialog/disable-monster-action-dialog/disable-monster-action-dialog.component';
import { TutorialComponent } from './components/tutorial/tutorial.component';
import { SoundControlComponent } from './components/sound-control/sound-control.component';
import { StatusEffectTooltipComponent } from './components/monster/status-effect-tooltip/status-effect-tooltip.component';
import { ViewMonsterButtonComponent } from './components/view-monster-button/view-monster-button.component';


@NgModule({
  declarations: [
    MonsterActionComponent,
    MonsterActionCardIconsComponent,
    GameComponent,
    MonsterActionGridComponent,
    StatBoardComponent,
    StatBoardSectionComponent,
    MonsterComponent,
    MonsterTooltipComponent,
    BuffComponent,
    PlayerHandComponent,
    BuffTooltipComponent,
    MonsterHpComponent,
    MonsterElementBreakdownComponent,
    StandardActionComponent,
    SubmitActionButtonComponent,
    DialogComponent,
    SwitchOutDialogComponent,
    ModifiersComponent,
    KOSwitchOutDialogComponent,
    CrushDialogComponent,
    StatusEffectsComponent,
    GameOverComponent,
    DisableMonsterActionDialogComponent,
    TutorialComponent,
    SoundControlComponent,
    StatusEffectTooltipComponent,
    ViewMonsterButtonComponent,
  ],
  exports: [
    MonsterComponent,
    MonsterActionComponent,
    MonsterActionCardIconsComponent,
    BuffComponent,
    GameComponent,
    SoundControlComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
  ]
})
export class GameModule { }
