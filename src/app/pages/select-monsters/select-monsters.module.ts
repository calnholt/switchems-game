import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SharedModule } from "~/app/shared/shared.module";
import { SelectMonstersComponent } from "./components/select-monsters/select-monsters.component";
import { SelectMonsterComponent } from './components/select-monster/select-monster.component';
import { GameModule } from "../game/game.module";

@NgModule({
  declarations: [
    SelectMonstersComponent,
    SelectMonsterComponent,
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
