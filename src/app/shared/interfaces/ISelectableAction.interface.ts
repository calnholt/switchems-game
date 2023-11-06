import { Buff } from "~/app/pages/game/models/monster/buff.model";
import { CardCompositeKey } from "./ICompositeKey.interface";

export abstract class ISelectableAction {
  protected _buff: number = 0;
  protected _discard: number = 0;
  public abstract getDisplayName: () => string;
  public abstract key: () => CardCompositeKey;
  public get buff(): number { return this._buff; }
  public get discard(): number { return this._discard; }
}