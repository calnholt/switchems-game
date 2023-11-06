import { CardCompositeKey } from "~/app/shared/interfaces/ICompositeKey.interface";
import { ISelectableAction } from "~/app/shared/interfaces/ISelectableAction.interface";
import { Path } from "~/app/shared/types/dataTypes";

const STANDARD_ACTION_DESCRIPTION = `These actions resolve after monster actions, regardless if your active monster was KO'd this turn.`;

export class StandardAction extends ISelectableAction {
  private _name: string;
  private _paths: Path[];
  private _description: string = STANDARD_ACTION_DESCRIPTION;

  constructor(name: string, paths: Path[]) {
    super();
    this._name = name;
    this._paths = paths;
  }

  public get name() { return this._name; }
  public get paths() { return this._paths; }
  public get description() { return this._description; }

  // ISelectableAction
  getDisplayName = (): string => { return this._name; } 
  key = (): CardCompositeKey => { return `Standard Action_${this.name}`; }
  isCostFulfilled = (): boolean => { return true; }
  canApplyBuff = (): boolean => { return false; }
  canApplyDiscard = (): boolean => { return false; }
  // end


}