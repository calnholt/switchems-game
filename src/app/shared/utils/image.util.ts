import { BACKGROUNDS_PATH } from './../types/dataTypes';
import { ELEMENT_PATH_COLOR, ElemType, MONSTERS_PATH, Path, SYMBOLS_PATH } from "../types/dataTypes";

export const ImageUtil = {
  getSymbolsPath,
  getElementsPath,
  getMonstersPath,
  getBuffBackgroundPath,
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
    attack: getSymbolsPath('attack'),
    speed: getSymbolsPath('speed'),
    defense: getSymbolsPath('defense'),
    superEffective: getSymbolsPath('super-effective'),
    switchDefense: getSymbolsPath('switch-defense'),
    teamAura: getSymbolsPath('aura'),
    hp: getSymbolsPath('heart'),
    arrow: getSymbolsPath('arrow'),
  },
  monsters: {
    Chargroar: getMonstersPath('chargroar'),
    Drownigator: getMonstersPath('drownigator'),
    Flexferno: getMonstersPath('flexferno'),
    Galeaffy: getMonstersPath('galeaffy'),
    Phantomaton: getMonstersPath('phantomaton'),
    Stallagrowth: getMonstersPath('stallagrowth'),
    Vulturock: getMonstersPath('vulturock'),
    Willard: getMonstersPath('willard'),
    Zappguin: getMonstersPath('zappguin'),
  }
}

function getElementsPath(name: ElemType): Path { return `${ELEMENT_PATH_COLOR}${name.toLowerCase()}.png` };
function getSymbolsPath(name: string): Path { return `${SYMBOLS_PATH}${name.toLowerCase()}.png` };
function getMonstersPath(name: string): Path { return `${MONSTERS_PATH}${name.toLowerCase()}.png` };
function getBuffBackgroundPath(elements: ElemType[]): Path {
  const elemJoin = elements.map(e => e.toString().toLowerCase()).join("");
  return `${BACKGROUNDS_PATH}${elemJoin}.png`
}