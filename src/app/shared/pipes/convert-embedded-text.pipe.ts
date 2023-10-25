import { Pipe, PipeTransform } from '@angular/core';
import { AbilityTextUtil } from '../utils/ability-text.util';
import { Css } from '../types/dataTypes';

@Pipe({
  name: 'convertEmbeddedText'
})
export class ConvertEmbeddedTextPipe implements PipeTransform {

  transform(value: string, termCss?: Css, imageCss?: Css): string {
    if (termCss || imageCss) {
      return AbilityTextUtil.getAbilityText(value, termCss, imageCss);
    }
    return AbilityTextUtil.getAbilityTextDefaults(value);
  }

}
