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
    this.getSectionFromType(type).use();
  }

  gain(amount: number, type: StatBoardSectionType) {
    this.getSectionFromType(type).gain(amount);
  }

  gainRandom(amount: number) {
    for (let i = 0; i < amount; i++) {
      const random = Math.floor(Math.random() * 3);
      if (random === 0) {
        this.gain(1, 'ATTACK');
      }
      else if (random === 1) {
        this.gain(1, 'DEFENSE');
      }
      else {
        this.gain(1, 'SPEED');
      }
    }
  }

};

export class StatBoardSection {
  private _max!: number;
  private _current!: number;
  readonly type!: StatBoardSectionType;

  constructor(max: number, current: number, type: StatBoardSectionType) {
    this._max = max;
    this._current = ArrayUtil.getRandomIndex(max + 1); // TODO: replace with current
    this.type = type;
  }

  public get max() { return this._max }
  public get current() { return this._current }

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