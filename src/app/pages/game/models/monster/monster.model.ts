import { ElemType } from "src/app/shared/types/dataTypes";

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
  attack: number = 0;
  speed: number = 0;
  element: ElemType | null = null;
  icons: MonsterActionCardIcons = new MonsterActionCardIcons();
  // TODO: UI props...should they be here?
  isSelected: boolean = false;
  isLocked: boolean = false;
  isUsed: boolean = false;
  isDisabled: boolean = false;
}

export class MonsterActionCardIcons {
  buff: number = 0;
  discard: number = 0;
  draw: number = 0;

  augmentedBuff: number = 0;

  appliedBuff: number = 0;
  appliedDiscard: number = 0;
}