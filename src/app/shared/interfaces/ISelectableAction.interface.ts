import { Buff } from "~/app/pages/game/models/monster/buff.model";
import { CardCompositeKey } from "./ICompositeKey.interface";

export abstract class ISelectableAction {
  protected _isSelected: boolean = false;
  protected _buff: number = 0;
  protected _discard: number = 0;
  protected _appliedBuffs: Buff[] = [];
  protected _appliedDiscards: Buff[] = []
  public abstract selectAsAction: () => void;
  public abstract deselectAsAction: () => void;
  public abstract key: () => CardCompositeKey;
  public abstract isCostFulfilled: (discards: number) => boolean;
  public abstract canApplyBuff:(slots: number) => boolean;
  public abstract canApplyDiscard:(slots: number) => boolean;
  public applyBuff(buff: Buff): void { this._appliedBuffs.push(buff); }
  public applyDiscard(buff: Buff): void { this._appliedBuffs.push(buff); }
  get buff(): number { return this.buff; }
  get discard(): number { return this.discard; }
  get isSelected(): boolean { return this._isSelected; }
}