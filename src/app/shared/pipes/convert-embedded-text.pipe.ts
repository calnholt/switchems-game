import { Pipe, PipeTransform } from '@angular/core';
import { AbilityTextUtil } from '../utils/ability-text.util';
import { Css } from '../types/dataTypes';

interface ConvertEmbeddedTextPipeConfig {
  termCss?: Css,
  imageCss?: Css,
  excludeTerms?: boolean,
};

@Pipe({
  name: 'convertEmbeddedText'
})
export class ConvertEmbeddedTextPipe implements PipeTransform {

  transform(value: string, config?: ConvertEmbeddedTextPipeConfig): string {
    let text = value;
    if (config?.excludeTerms) {
      text = AbilityTextUtil.getAbilityTextWithoutTerms(text);
    }
    if (config?.termCss && config?.imageCss) {
      return AbilityTextUtil.getAbilityText(text, config.termCss, config.imageCss);
    }
    return AbilityTextUtil.getAbilityTextDefaults(text);
  }

}
