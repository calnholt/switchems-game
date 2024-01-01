import { Pipe, PipeTransform } from '@angular/core';
import { SimpleTooltip } from '../components/simple-tooltip/simple-tooltip.component';
import { SimpleTooltipType, TooltipUtil } from '../utils/tooltip.util';

@Pipe({
  name: 'simpleTooltip'
})
export class SimpleTooltipPipe implements PipeTransform {

  transform(type: SimpleTooltipType): SimpleTooltip {
    return TooltipUtil.getSimpleTooltip(type);
  }

}
