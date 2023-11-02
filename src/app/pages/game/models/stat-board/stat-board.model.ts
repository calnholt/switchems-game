export class StatBoard {
  readonly attack: StatBoardSection = new StatBoardSection(3, 0, false, 'ATTACK');
  readonly speed: StatBoardSection = new StatBoardSection(4, 0, false, 'SPEED');
  readonly defense: StatBoardSection = new StatBoardSection(3, 0, false, 'DEFENSE');

  getSectionFromType(type: StatBoardSectionType) {
    if (type === 'ATTACK') return this.attack;
    if (type === 'SPEED') return this.speed;
    return this.defense;
  }

  apply(type: StatBoardSectionType) {
    [this.attack, this.speed, this.defense].forEach(section => {
      if (section.type === type) {
        section.setApplied(true);
      }
      else {
        section.setApplied(false);
      }
    });
  }

  use(type: StatBoardSectionType) {
    this.getSectionFromType(type).use();
  }

  gain(amount: number, type: StatBoardSectionType) {
    this.getSectionFromType(type).gain(amount);
  }

};

export class StatBoardSection {
  private _max!: number;
  private _current!: number;
  private _isApplied!: boolean;
  readonly type!: StatBoardSectionType;

  constructor(max: number, current: number, isApplied: boolean, type: StatBoardSectionType) {
    this._max = max;
    this._current = current;
    this._isApplied = isApplied;
    this.type = type;
  }

  public get max() { return this._max }
  public get current() { return this._current }
  public get isApplied() { return this._isApplied }

  public set apply(value: boolean) { this._isApplied = value }

  setApplied(value: boolean) {
    this._isApplied = value;
  }

  use() {
    this._current = 0;
  }

  gain(amount: number) {
    if (this.current + amount > this.max) {
      this._current = this.max;
    }
    else {
      this._current += amount;
    }
  }
}

export type StatBoardSectionType = 'ATTACK' | 'SPEED' | 'DEFENSE';