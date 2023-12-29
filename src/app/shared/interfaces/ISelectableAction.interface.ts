import { CardCompositeKey } from "./ICompositeKey.interface";

export interface ISelectableAction {
  getDisplayName: () => string;
  getNumOfBuffSlots: () => number;
  getNumOfDiscardSlots: () => number;
  key: () => CardCompositeKey;
  getSelectableActionType: () => SelectedActionType;
  canApplyPips: () => boolean;
}

export type SelectedActionType = 'MONSTER' | 'SWITCH' | 'STANDARD' | 'NONE';