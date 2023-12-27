import { NgModule } from "@angular/core";
import { TitleScreenComponent } from "./title-screen/title-screen.component";
import { CommonModule } from "@angular/common";
import { SharedModule } from "~/app/shared/shared.module";

@NgModule({
  declarations: [
    TitleScreenComponent,
  ],
  exports: [
    
  ],
  imports: [
    CommonModule,
    SharedModule,
  ]
})
export class TitleScreenModule { }
