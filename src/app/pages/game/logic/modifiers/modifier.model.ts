import { Subject } from "rxjs";
import { CardCompositeKey } from "~/app/shared/interfaces/ICompositeKey.interface";

export class Modifiers<T> {
  private _modifiers: Modifier<T>[] = [];
  
  public readonly modifiers$ = new Subject<Modifier<T>[]>();

  getByType(type: T): Modifier<T>[] {
    return this._modifiers.filter(m => m.type === type);
  }

  remove(key: CardCompositeKey): void {
    this._modifiers = this._modifiers.filter(m => m.key !== key);
    this.modifiers$.next(this._modifiers);
  }

  sumByType(type: T): number {
    return this.getByType(type).reduce((accumulator, mod) => accumulator + mod.value, 0);
  }

  add(...modifiers: Modifier<T>[]): void {
    this._modifiers = this._modifiers.concat(modifiers);
    this.modifiers$.next(this._modifiers);
  }

  contains(type: T): boolean { return this._modifiers.map(m => m.type).includes(type); }

  eotClear() { 
    this._modifiers = this._modifiers.filter(m => m.ongoing);
    this.modifiers$.next(this._modifiers);
  }

  hasStatusEffect(): boolean { return !!this._modifiers.find(m => m.statusEffect); }

}

export class Modifier<T> {
  key: CardCompositeKey;
  type: T;
  value: number;
  ongoing: boolean; // denotes if the modification should be removed EoT, default it to false since most aren't
  statusEffect: boolean; // denotes if the modification is a status effects
  constructor(key: CardCompositeKey, type: T, value: number = 0, ongoing = false, statusEffect = false) {
    this.key = key;
    this.type = type;
    this.value = value
    this.ongoing = ongoing;
    this.statusEffect = statusEffect;
  }
  summable() {
    return [
      'DEFENSE',
      'SWITCH_IN_DEFENSE',
      'RECOIL',
      'ATTACK',
      'SPEED',
      'PIERCE',
    ].includes(this.type as string);
  }
};

export type MonsterModifierType =
  | "DEFENSE"
  | "SWITCH_IN_DEFENSE"
  | "DRAIN"
  | "WOUND"
  | "STUN"
  | "FATIGUE"
  | "PREVENT_FLINCH"
  | "PREVENT_RECOIL"
  | "FLINCHED"
  | "SPEED_REVERSED"
  | "RECOIL"
  | "ATTACK"
  | "SPEED"
  | "PIERCE"
  | "FLINCH"

export type ActionModifierType = 
  | "BUFF"
  | "DISCARD"

