import { CardCompositeKey } from "~/app/shared/interfaces/ICompositeKey.interface";
import { ISelectableAction, SelectedActionType } from "~/app/shared/interfaces/ISelectableAction.interface";
import { Path } from "~/app/shared/types/dataTypes";

const STANDARD_ACTION_DESCRIPTION = `This action resolves after monster actions, regardless if your active monster was KO'd this turn.`;

export class StandardAction implements ISelectableAction {
  private _name: string;
  private _paths: Path[];
  private _description: string = STANDARD_ACTION_DESCRIPTION;

  constructor(name: string, paths: Path[]) {
    this._name = name;
    this._paths = paths;
  }

  public get name() { return this._name; }
  public get paths() { return this._paths; }
  public get description() { return this._description; }

  // ISelectableAction
  getNumOfBuffSlots = (): number => { return 0; };
  getNumOfDiscardSlots = (): number => { return 0; };
  getDisplayName = (): string => { return this._name; } 
  getSelectableActionType = (): SelectedActionType => { return 'STANDARD'; } 
  canApplyStat = (): boolean => { return false; } 
  key = (): CardCompositeKey => { return `SA_${this.name.replaceAll(' ', '').toUpperCase()}`; }
  // end


}