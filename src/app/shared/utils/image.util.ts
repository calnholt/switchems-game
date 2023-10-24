import { ELEMENT_PATH_COLOR, ElemType, MONSTERS_PATH, Path, SYMBOLS_PATH } from "../types/dataTypes";

export const ImageUtil = {
  getSymbolsPath: (name: string): Path => `${SYMBOLS_PATH}${name.toLowerCase()}.png`,
  getElementsPath: (name: ElemType): Path => `${ELEMENT_PATH_COLOR}${name.toLowerCase()}.png`,
  getMonstersPath: (name: string): Path => `${MONSTERS_PATH}${name.toLowerCase()}.png`,
}