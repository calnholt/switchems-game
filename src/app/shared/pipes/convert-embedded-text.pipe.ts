import { Pipe, PipeTransform } from '@angular/core';
import { AbilityTextUtil } from '../utils/ability-text.util';

@Pipe({
  name: 'convertEmbeddedText'
})
export class ConvertEmbeddedTextPipe implements PipeTransform {

  transform(value: string): string {
    return AbilityTextUtil.getAbilityText(value);
  }

}
