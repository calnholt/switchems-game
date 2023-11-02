export type CardCompositeKey = string;

export interface ICompositeKey {
  key: () => CardCompositeKey;
}