import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { PlayerType } from '~/app/pages/game/logic/player-type.mode';

const KEY = 'PLAYER_PROFILE';

export interface PlayerProfile {
  name: string;
  playerType: PlayerType,
}

@Injectable({
  providedIn: 'root'
})
export class PlayerProfileService {

  private _profile: BehaviorSubject<PlayerProfile> = new BehaviorSubject<PlayerProfile>({ name: '', playerType: 'P' });
  private _opponentProfile: BehaviorSubject<PlayerProfile> = new BehaviorSubject<PlayerProfile>({ name: '', playerType: 'O' });

  public get profile() { return this._profile.value; }
  public get profile$() { return this._profile; }
  public get opponentProfile() { return this._opponentProfile.value; }
  public get opponentProfile$() { return this._opponentProfile; }

  constructor() { 
    const profile = localStorage.getItem(KEY);
    if (profile) {
      this.profile$.next(JSON.parse(profile) as PlayerProfile);
    }
  }

  save(name: string): PlayerProfile | null {
    if (name.length > 30) {
      return null;
    }
    localStorage.setItem(KEY, JSON.stringify({ ...this._profile, name: name }));
    this.profile$.next({ ...this.profile, name });
    return this.profile;
  }

  setHost(opponent: PlayerProfile, isHost: boolean) {
    this.profile$.next({ ...this.profile, playerType: isHost ? 'P' : 'O' });
    this.opponentProfile$.next({ ...opponent, playerType: !isHost ? 'P' : 'O' });
  }

}
