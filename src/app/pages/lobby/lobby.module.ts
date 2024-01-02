import { NgModule } from "@angular/core";
import { LobbyComponent } from "./components/lobby/lobby.component";
import { CommonModule } from "@angular/common";
import { SharedModule } from "~/app/shared/shared.module";
import { FormsModule } from "@angular/forms";

@NgModule({
  declarations: [
    LobbyComponent,
  ],
  exports: [
    
  ],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
  ]
})
export class LobbyModule { }