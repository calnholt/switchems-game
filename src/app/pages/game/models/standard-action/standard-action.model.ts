import { CardCompositeKey } from "~/app/shared/interfaces/ICompositeKey.interface";
import { ISelectableAction, SelectedActionType } from "~/app/shared/interfaces/ISelectableAction.interface";
import { ImageCode, Path } from "~/app/shared/types/dataTypes";

const STANDARD_ACTION_DESCRIPTION = `This action resolves after monster actions, regardless if your active monster was KO'd this turn.`;

export class StandardAction implements ISelectableAction {
  private _name: string;
  private _text: string;
  private _description: string = STANDARD_ACTION_DESCRIPTION;

  constructor(name: string, text: string) {
    this._name = name;
    this._text = text;
  }

  public get name() { return this._name; }
  public get text() { return this._text; }
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