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
    switch(battleAniType) {
      case 'SWITCHING_IN':
        this.sfxService.play('SWITCH');
        break;
    }
    this.battleAniState.updateByPlayer(isPlayer, battleAniType);
    this.battleAniState$.next(this.battleAniState);
  }

  public done(isPlayer: boolean) {
    this.battleAniState.done(isPlayer);
    this.battleAniState$.next(this.battleAniState);
  }

  public isAnimating() {
    return this.battleAniState.isAnimating();
  }

}
