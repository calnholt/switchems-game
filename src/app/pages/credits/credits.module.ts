import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { SharedModule } from "~/app/shared/shared.module";
import { CreditsComponent } from "./credits.component";

@NgModule({
  declarations: [
    CreditsComponent
  ],
  exports: [
  ],
  imports: [
    CommonModule,
    SharedModule,
  ]
})
export class CreditsModule { }