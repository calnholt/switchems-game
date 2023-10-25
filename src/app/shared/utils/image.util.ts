import { ELEMENT_PATH_COLOR, ElemType, MONSTERS_PATH, Path, SVG_PATH, SYMBOLS_PATH } from "../types/dataTypes";

export const ImageUtil = {
  getSymbolsPath,
  getElementsPath,
  getMonstersPath: (name: string): Path => `${MONSTERS_PATH}${name.toLowerCase()}.png`,
  elements: {
    fire: getElementsPath('Fire'),
    death: getElementsPath('Death'),
    electric: getElementsPath('Electric'),
    leaf: getElementsPath('Leaf'),
    rock: getElementsPath('Rock'),
    water: getElementsPath('Water'),
  },
  icons: {
    draw: getSymbolsPath('draw'),
    discard: getSymbolsPath('discard'),
    buff: getSymbolsPath('buff'),
    randomCube: getSymbolsPath('question'),
  }
}

function getElementsPath(name: ElemType): Path { return `${ELEMENT_PATH_COLOR}${name.toLowerCase()}.png` };
function getSymbolsPath(name: string): Path { return `${SYMBOLS_PATH}${name.toLowerCase()}.png` };