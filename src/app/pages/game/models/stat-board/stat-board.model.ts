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
  private max!: number;
  private current!: number;
  private isApplied!: boolean;
  readonly type!: StatBoardSectionType;

  constructor(max: number, current: number, isApplied: boolean, type: StatBoardSectionType) {
    this.max = max;
    this. current = current;
    this.isApplied = isApplied;
    this.type = type;
  }

  public get _max() { return this.max }
  public get _current() { return this.current }
  public get _isApplied() { return this.isApplied }

  public set apply(value: boolean) { this.isApplied = value }

  setApplied(value: boolean) {
    this.isApplied = value;
  }

  use() {
    this.current = 0;
  }

  gain(amount: number) {
    if (this.current + amount > this.max) {
      this.current = this.max;
    }
    else {
      this.current += amount;
    }
  }
}

export type StatBoardSectionType = 'ATTACK' | 'SPEED' | 'DEFENSE';