
export type BattleAnimationType = 
  | 'ATTACKING'
  | 'USING_SPECIAL'
  | 'TAKING_DAMAGE'
  | 'SWITCHING_IN'
  | 'SWITCHING_OUT'
  | 'HEALING'
  | 'N/A'

export class BattleAnimationState {
  private _playerState!: BattleAnimationType;
  private _opponentState!: BattleAnimationType;

  public get playerState() { return this._playerState; }
  public get opponentState() { return this._opponentState; }

  constructor() {
    this.clear();
  }

  clear() {
    this._playerState = 'N/A';
    this._opponentState = 'N/A';
  }

  isAnimating() {
    return this._playerState !== 'N/A' || this._opponentState !== 'N/A';
  }

  getType(isPlayer: boolean) {
    return isPlayer ? this._playerState : this._opponentState;
  }

  updateByPlayer(isPlayer: boolean, aniType: BattleAnimationType) {
    if (isPlayer) {
      this._playerState = aniType;
    }
    else {
      this._opponentState = aniType;
    }
  }

  done(isPlayer: boolean) {
    const lastState = isPlayer ? this.playerState : this._opponentState;
    if (isPlayer) {
      this._playerState = 'N/A';
    }
    else {
      this._opponentState = 'N/A';
    }
    // check if there's a resulting state
    if (lastState === 'ATTACKING') {
      this.updateOppositePlayer(isPlayer, 'TAKING_DAMAGE');
    }
  }

  private updateOppositePlayer(isPlayer: boolean, aniType: BattleAnimationType) {
    if (isPlayer) {
      this._opponentState = aniType;
    }
    else {
      this._playerState = aniType;
    }
  }

}