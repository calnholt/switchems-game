import { StatBoardSectionType } from "~/app/pages/game/models/stat-board/stat-board.model";
import { Term, Image } from "../types/data";
import { Css, TERM_CODES, IMAGE_CODES, ImageCode } from "../types/dataTypes";

export const AbilityTextUtil = {
  getAbilityTextDefaults,
  getAbilityText,
  getAbilityTextWithoutTerms,
  getTermsFromText,
  getIconText,
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
      let html = '';
      // TODO: this is icky
      if (image.key === '[PQ]') {
        html = `<div class="stat-pip${imageCss.includes('inverse') ? ' inverse' : ''}"></div>`;
      }
      else {
        html = `<img src="${image.path}" class="${imageCss} ${getImageClass(image.key)}">`;
      }
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
        html = '<div class="gain-stat-pip">';
        let cubeStr = '';
        for (let i = 0; i < obj.num; i++) {
          cubeStr += '<div class="stat-pip"></div>';
        }
        html += `<div>+</div><div>${obj.stat === '?' ? '?' : `[${obj.stat}]`}</div>${cubeStr}</div>`;
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

function getIconText(type: string): string {
  switch (type) {
    case 'ATTACK':
      return '[ATK]';
    case 'SPEED':
      return '[SPD]';
    case 'DEFENSE':
      return '[DEF]';
  };
  return type.toLowerCase();
}