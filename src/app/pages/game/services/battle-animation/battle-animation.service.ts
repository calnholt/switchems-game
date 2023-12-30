import { Injectable } from '@angular/core';
import { BattleAnimationState, BattleAnimationType } from './battle-animation.model';
import { BehaviorSubject, of } from 'rxjs';
import { SfxService } from '~/app/shared/services/sfx.service';

@Injectable({
  providedIn: 'root'
})
export class BattleAnimationService {

  private _state = new BehaviorSubject<BattleAnimationState>(new BattleAnimationState());

  public get battleAniState$() { return this._state; }
  public get battleAniState() { return this._state.value; }

  constructor(
    private sfxService: SfxService,
  ) { }

  public clear() {
    this.battleAniState.clear();
    this.battleAniState$.next(this.battleAniState);
  }

  public update(isPlayer: boolean, battleAniType: BattleAnimationType) {
    this.doAnimationSfx(battleAniType);
    this.battleAniState.updateByPlayer(isPlayer, battleAniType);
    this.battleAniState$.next(this.battleAniState);
  }

  public done(isPlayer: boolean) {
    this.battleAniState.done(isPlayer);
    if (this.battleAniState.playerState != 'N/A') {
      this.doAnimationSfx(this.battleAniState.playerState);
    }
    if (this.battleAniState.opponentState != 'N/A') {
      this.doAnimationSfx(this.battleAniState.opponentState);
    }
    this.battleAniState$.next(this.battleAniState);
  }

  public isAnimating() {
    return this.battleAniState.isAnimating();
  }

  private doAnimationSfx(battleAniType: BattleAnimationType) {
    switch(battleAniType) {
      case 'SWITCHING_IN':
        this.sfxService.play('SWITCH');
        break;
      case 'ATTACKING':
        this.sfxService.play('ATTACK');
        break;
      case 'TAKING_DAMAGE':
        this.sfxService.play('DAMAGE');
        break;
      case 'USING_SPECIAL':
        this.sfxService.play('SPECIAL');
        break;
    }
  }

}
