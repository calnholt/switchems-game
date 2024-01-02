import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SharedModule } from "~/app/shared/shared.module";
import { SelectMonstersComponent } from "./components/select-monsters/select-monsters.component";
import { SelectMonsterComponent } from './components/select-monster/select-monster.component';
import { GameModule } from "../game/game.module";
import { FullMonsterViewComponent } from './components/full-monster-view/full-monster-view.component';

@NgModule({
  declarations: [
    SelectMonstersComponent,
    SelectMonsterComponent,
    FullMonsterViewComponent,
  ],
  exports: [
    
  ],
  imports: [
    CommonModule,
    SharedModule,
    GameModule,
  ]
})
export class SelectMonstersModule { }
