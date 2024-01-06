import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { GameModule } from './pages/game/game.module';
import { HttpClientModule } from '@angular/common/http';
import { TitleScreenModule } from './pages/title-screen/title-screen.module';
import { SelectMonstersModule } from './pages/select-monsters/select-monsters.module';
import { LobbyModule } from './pages/lobby/lobby.module';
import { CreditsModule } from './pages/credits/credits.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(AppRoutingModule, {
      enableTracing: false
    }),
    GameModule,
    HttpClientModule,
    TitleScreenModule,
    SelectMonstersModule,
    LobbyModule,
    CreditsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
