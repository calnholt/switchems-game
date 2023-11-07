import { CardCompositeKey } from "./ICompositeKey.interface";

export interface ISelectableAction {
  getDisplayName: () => string;
  getNumOfBuffSlots: () => number;
  getNumOfDiscardSlots: () => number;
  key: () => CardCompositeKey;
  getSelectableActionType: () => SelectedActionType;
}

export type SelectedActionType = 'MONSTER' | 'SWITCH' | 'STANDARD';