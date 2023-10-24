import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RangePipe } from './pipes/range.pipe';
import { InnerHtmlDirective } from './directives/inner-html/inner-html.directive';
import { ConvertEmbeddedTextPipe } from './pipes/convert-embedded-text.pipe';
import { TooltipDirective } from './directives/tooltip.directive';
import { TooltipComponent } from './components/tooltip/tooltip.component';


@NgModule({
  declarations: [
    RangePipe,
    InnerHtmlDirective,
    ConvertEmbeddedTextPipe,
    TooltipDirective,
    TooltipComponent,
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    RangePipe,
    ConvertEmbeddedTextPipe,
    TooltipDirective,
    TooltipComponent,
  ]
})
export class SharedModule { }
