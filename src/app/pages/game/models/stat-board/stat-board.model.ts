import { ArrayUtil } from "~/app/shared/utils/array.util";

export class StatBoard {
  readonly attack: StatBoardSection = new StatBoardSection(3, 0, 'ATTACK');
  readonly speed: StatBoardSection = new StatBoardSection(4, 0, 'SPEED');
  readonly defense: StatBoardSection = new StatBoardSection(3, 0, 'DEFENSE');

  getSectionFromType(type: StatBoardSectionType) {
    if (type === 'ATTACK') return this.attack;
    if (type === 'SPEED') return this.speed;
    return this.defense;
  }

  use(type: StatBoardSectionType) {
    this.getSectionFromType(type).clear();
  }

  gain(amount: number, type: StatBoardSectionType) {
    this.getSectionFromType(type).gain(amount);
  }

  remove(amount: number, type: StatBoardSectionType) {
    this.getSectionFromType(type).remove(amount);
  }

  hasPips(): boolean {
    return this.attack.current > 0 || this.defense.current > 0 || this.speed.current > 0;
  }

  totalPips() {
    return this.attack.current + this.defense.current + this.speed.current;
  }

  getSectionsWithPips(): StatBoardSectionType[] {
    const types: StatBoardSectionType[] = [];
    if (this.attack.current > 0) types.push('ATTACK');
    if (this.speed.current > 0) types.push('SPEED');
    if (this.defense.current > 0) types.push('DEFENSE');
    return types;
  }

};

export class StatBoardSection {
  private _max!: number;
  private _current!: number;
  readonly type!: StatBoardSectionType;

  constructor(max: number, current: number, type: StatBoardSectionType) {
    this._max = max;
    this._current = 0;
    this.type = type;
  }

  public get max() { return this._max }
  public get current() { return this._current }

  clear() {
    this._current = 0;
  }

  remove(amount: number) {
    if (this._current - amount <= 0) {
      this._current = 0;
    }
    else {
      this._current = this._current - amount;
    }
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