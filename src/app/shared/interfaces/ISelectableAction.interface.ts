import { CardCompositeKey } from "./ICompositeKey.interface";

export interface ISelectableAction {
  selectAsAction: () => void;
  deselectAsAction: () => void;
  key: () => CardCompositeKey;
  isCostFulfilled: (discards: number) => boolean;
  canApplyBuff:(alreadyApplied: number, slots: number) => boolean;
  canApplyDiscard:(alreadyApplied: number, slots: number) => boolean;
}