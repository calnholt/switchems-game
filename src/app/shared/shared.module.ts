import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RangePipe } from './pipes/range.pipe';
import { InnerHtmlDirective } from './directives/inner-html/inner-html.directive';
import { ConvertEmbeddedTextPipe } from './pipes/convert-embedded-text.pipe';
import { CardInfoTooltipDirective } from './directives/card-info-tooltip/card-info-tooltip.directive';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MonsterActionTooltipComponent } from './components/card-info-tooltip/monster-action-tooltip/monster-action-tooltip.component';
import { EffectivenessTooltipComponent } from './components/card-info-tooltip/effectiveness-tooltip/effectiveness-tooltip.component';
import { TermTooltipComponent } from './components/card-info-tooltip/term-tooltip/term-tooltip.component';


@NgModule({
  declarations: [
    RangePipe,
    InnerHtmlDirective,
    ConvertEmbeddedTextPipe,
    CardInfoTooltipDirective,
    MonsterActionTooltipComponent,
    EffectivenessTooltipComponent,
    TermTooltipComponent,
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
  ]
})
export class SharedModule { }
