import { Injectable } from "@angular/core";
import { PlayerType } from "../../logic/player-type.mode";

@Injectable({
  providedIn: 'root'
})
export class SeedableRngService {
  // LCG constants
  private m = 0x80000000; // 2**31;
  private a = 1103515245;
  private c = 12345;

  private _seed: number;

  public get seed() { return this._seed; }

  constructor() {
    this._seed = Math.floor(Math.random() * 1000000);
    // this._seed = 264793;
    console.log("SEED: " + this._seed);
  }

  setSeed(seed: number) {
    this._seed = seed;
  }

  randomInt(): number {
    this._seed = (this.a * this._seed + this.c) % this.m;
    return this._seed;
  }

  randomIntOption(value: number) {
    return Math.floor(this.randomFloat() * value);
  }

  randomFloat(): number {
    // Create a floating point number in the range [0, 1)
    return this.randomInt() / (this.m - 1);
  }

  getRandomPlayer(): PlayerType { 
    return this.randomIntOption(2) === 1 ? 'P' : 'O' 
  }

}