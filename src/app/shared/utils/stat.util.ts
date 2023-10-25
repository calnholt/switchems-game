import { ElemType } from "../types/dataTypes";

export const StatUtil = {

  getAdvantages(elem: ElemType): number[] {
    // fire, water, rock, leaf, elec, death
    // -1 means the monster takes MORE damage
    // 1 means resistance
    const map: Map<ElemType, number[]> = new Map();
    map.set('Death', [0, -1, 1, 1, -1, 0]);
    map.set('Electric', [-1, 1, -1, 0, 0, 1]);
    map.set('Fire', [0, -1, -1, 1, 1, 0]);
    map.set('Water', [1, 0, 0, -1, -1, 1]);
    map.set('Leaf', [-1, 1, 1, 0, 0, -1]);
    map.set('Rock', [1, 0, 0, -1, 1, -1]);
    return map.get(elem) as number[];
  },

  getElementIndex(elem: ElemType): number {
    if (elem === 'Death') {
      return 5;
    }
    if (elem === 'Electric') {
      return 4;
    }
    if (elem === 'Leaf') {
      return 3;
    }
    if (elem === 'Rock') {
      return 2;
    }
    if (elem === 'Water') {
      return 1;
    }
    return 0;
  },
}