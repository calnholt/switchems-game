import { Term, Image } from "../types/data";
import { Css, TERM_CODES, IMAGE_CODES } from "../types/dataTypes";

export const AbilityTextUtil = {
  getAbilityTextDefaults: getAbilityTextDefaults,
  getAbilityText: getAbilityText,
  getAbilityTextWithoutTerms: getAbilityTextWithoutTerms,
  getTermsFromText: getTermsFromText,
}

function getAbilityTextDefaults(text: string): string {
  return getAbilityText(text, "embedded-term-text", "embedded-icon");
}

function getAbilityText(text: string, termCss: Css = "embedded-term-text", imageCss: Css = "embedded-icon"): string {
  if (!text) {
    return "";
  }
  let innerHtml = convertInnerTextJson(text);
  TERM_CODES.forEach((term: Term) => {
    while (innerHtml.includes(term.key)) {
      const html = `<br><span class="${termCss}">(${convertInnerTextJson(term.value)})</span>`;
      innerHtml = innerHtml.replace(term.key, html);
    }
  });
  IMAGE_CODES.forEach((image: Image) => {
    while (innerHtml.includes(image.key)) {
      const html = `<img src="${image.path}" class="${imageCss} ${getImageClass(image.key)}">`;
      innerHtml = innerHtml.replace(image.key, html);
    }
  });
  while (innerHtml.includes('<div>')) {
    innerHtml = innerHtml.replace('<div>', `<div class="chunk">`);
  }
  return innerHtml;
};

function getTermsFromText(text: string): Term[] {
  return TERM_CODES.filter(term => text.includes(term.key));
}

function getAbilityTextWithoutTerms(text: string): string {
  let parsedText = text;
  TERM_CODES.forEach((term: Term) => {
    while (parsedText.includes(term.key)) {
      parsedText = parsedText.replace(term.key, '');
    }
  });
  return parsedText;
}


function convertInnerTextJson(innerHtml: string) {
  while (innerHtml.includes('{') && innerHtml.includes('}')) {
    const startIndex = innerHtml.indexOf('{');
    const endIndex = innerHtml.indexOf('}');
    const jsonInText = innerHtml.substring(startIndex, endIndex + 1);
    try {
      const obj = JSON.parse(jsonInText);
      let html = "";
      const isCubes = obj.hasOwnProperty('stat') || obj.hasOwnProperty('num') || obj.hasOwnProperty('isPositive');
      if (isCubes) {
        html = '<div class="chunk">';
        let cubeStr = '';
        for (let i = 0; i < obj.num; i++) {
          cubeStr += '[PQ]' + ' ';
        }
        html += `${cubeStr}[ARROW] [${['ATK', 'HOLLOW'].includes(obj.stat) ? 'ATK' : obj.stat}]</div>`;
      }
      innerHtml = innerHtml.replace(jsonInText, html);
    } catch (error) {
      innerHtml = innerHtml.replace(jsonInText, '');
    }
  }
  return innerHtml;
};

const getImageClass  = (str: string): string => {
  return str.substring(1, str.length - 1).toLowerCase();
};