import { CardCompositeKey } from "./ICompositeKey.interface";

export interface ISelectableAction {
  getDisplayName: () => string;
  getNumOfBuffSlots: () => number;
  getNumOfDiscardSlots: () => number;
  key: () => CardCompositeKey;
  getSelectableActionType: () => SelectedActionType;
  canApplyStat: () => boolean;
}

export type SelectedActionType = 'MONSTER' | 'SWITCH' | 'STANDARD';