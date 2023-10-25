import { Term } from "src/app/shared/types/data";
import { ElemType } from "src/app/shared/types/dataTypes";
import { AbilityTextUtil } from "src/app/shared/utils/ability-text.util";

export class Monster {
  name: string = "";
  elements: Array<ElemType> = new Array<ElemType>();
  text: string = "";
  hp: number = 0;
  initiative: number = 0;
  actions: MonsterAction[] = [];
}

export class MonsterAction {
  name: string = "";
  text: string = "";
  attack!: number;
  speed: number = 0;
  element!: ElemType;
  icons: MonsterActionCardIcons = new MonsterActionCardIcons();
  // TODO: UI props...should they be here?
  isSelected: boolean = false;
  isLocked: boolean = false;
  isUsed: boolean = false;
  isDisabled: boolean = false;

  getAdvantages() {
    const map: Map<ElemType, number[]> = new Map();
    map.set('Death', [0, -1, 1, 1, -1, 0]);
    map.set('Electric', [-1, 1, -1, 0, 0, 1]);
    map.set('Fire', [0, -1, -1, 1, 1, 0]);
    map.set('Water', [1, 0, 0, -1, -1, 1]);
    map.set('Leaf', [-1, 1, 1, 0, 0, -1]);
    map.set('Rock', [1, 0, 0, -1, 1, -1]);
    return map.get(this.element as ElemType) as number[];
  }

  getTerms(): Term[] {
    return AbilityTextUtil.getTermsFromText(this.text);
  }
}

export class MonsterActionCardIcons {
  buff: number = 0;
  discard: number = 0;
  draw: number = 0;

  addedBuff: number = 0;

  appliedBuff: number = 1;
  appliedDiscard: number = 1;
}