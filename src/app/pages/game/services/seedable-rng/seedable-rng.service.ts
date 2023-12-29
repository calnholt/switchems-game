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

  private seed: number;
  constructor() {
    this.seed = Math.floor(Math.random() * 1000000);
    // this.seed = 286945;
    console.log("SEED: " + this.seed);
  }

  setSeed(seed: number) {
    this.seed = seed;
  }

  randomInt(): number {
    this.seed = (this.a * this.seed + this.c) % this.m;
    return this.seed;
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