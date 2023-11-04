import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RangePipe } from './pipes/range.pipe';
import { InnerHtmlDirective } from './directives/inner-html/inner-html.directive';
import { ConvertEmbeddedTextPipe } from './pipes/convert-embedded-text.pipe';
import { CardInfoTooltipDirective } from './directives/card-info-tooltip/card-info-tooltip.directive';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MonsterActionTooltipComponent } from '../pages/game/components/monster-action/monster-action-tooltip/monster-action-tooltip.component';
import { EffectivenessTooltipComponent } from '../pages/game/components/monster-action/effectiveness-tooltip/effectiveness-tooltip.component';
import { TermTooltipComponent } from '../pages/game/components/monster-action/term-tooltip/term-tooltip.component';
import { PushableButtonComponent } from './components/pushable-button/pushable-button.component';


@NgModule({
  declarations: [
    RangePipe,
    InnerHtmlDirective,
    ConvertEmbeddedTextPipe,
    CardInfoTooltipDirective,
    MonsterActionTooltipComponent,
    EffectivenessTooltipComponent,
    TermTooltipComponent,
    PushableButtonComponent,
  ],
  imports: [
    CommonModule,
    BrowserAnimationsModule,
  ],
  exports: [
    RangePipe,
    ConvertEmbeddedTextPipe,
    CardInfoTooltipDirective,
    MonsterActionTooltipComponent,
    TermTooltipComponent,
    PushableButtonComponent,
  ]
})
export class SharedModule { }
