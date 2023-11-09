import { CardCompositeKey } from "~/app/shared/interfaces/ICompositeKey.interface";

export class Condition {
  readonly value: boolean;
  readonly playerType?: PlayerType | undefined;
  readonly key?: CardCompositeKey;

  constructor(value: boolean, playerType: PlayerType, key: CardCompositeKey) {
    this.value = value;
    this.playerType = playerType;
    this.key = key;
  }

  passCondition(playerType: PlayerType, key: CardCompositeKey): boolean {
    if (!this.key || !this.value) return false;
    return this.value && this.playerType === playerType && this.key === key;
  };
}

export type PlayerType = 'P' | 'O' | 'T' | undefined;