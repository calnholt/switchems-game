import { CardCompositeKey } from "~/app/shared/interfaces/ICompositeKey.interface";

export class Modifiers<T> {
  modifiers: Modifier<T>[] = [];

  getByType(type: T): Modifier<T>[] {
    return this.modifiers.filter(m => m.type === type);
  }

  remove(key: CardCompositeKey): void {
    this.modifiers = this.modifiers.filter(m => m.key !== key);
  }

  sumByType(type: T): number {
    return this.getByType(type).reduce((accumulator, mod) => accumulator + mod.value, 0);
  }

  add(...modifiers: Modifier<T>[]): void {
    this.modifiers = this.modifiers.concat(modifiers);
  }

  contains(type: T): boolean { return this.modifiers.map(m => m.type).includes(type); }

  eotClear() { this.modifiers = this.modifiers.filter(m => m.ongoing); }
  
}

export class Modifier<T> {
  key: CardCompositeKey;
  type: T;
  value: number;
  ongoing: boolean; // denotes if the modification should be removed EoT, default it to false since most aren't
  constructor(key: CardCompositeKey, type: T, value: number = 0, ongoing = false) {
    this.key = key;
    this.type = type;
    this.value = value
    this.ongoing = ongoing;
  }
};

export type MonsterModifierType =
  | "DEFENSE"
  | "DRAIN"
  | "WOUND"
  | "STUN"
  | "FATIGUE"
  | "PREVENT_FLINCH"
  | "PREVENT_RECOIL"
  | "FLINCHED"

export type ActionModifierType = 
  | "ATTACK"
  | "SPEED"
  | "RECOIL"
  | "PIERCE"
  | "FLINCH"
  | "BUFF"
  | "DISCARD"

