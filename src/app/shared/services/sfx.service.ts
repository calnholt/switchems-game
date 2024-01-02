import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Path } from '../types/dataTypes';
import { CurrentPhaseService } from '~/app/pages/game/services/current-phase/current-phase.service';
import { EventType, Router } from '@angular/router';
import { TutorialService } from '~/app/pages/game/services/tutorial/tutorial.service';

const UI_PATH = '../../../../assets/audio/ui/';
const MUSIC_PATH = '../../../../assets/audio/music/';

@Injectable({
  providedIn: 'root'
})
export class SfxService {

  private _playSfx: BehaviorSubject<SfxType> = new BehaviorSubject<SfxType>('');

  private music = new Audio();
  private song: SfxType = '';
  private _pause = false;
  private _mute = false;

  public get playSfx() { return this._playSfx.value; }
  public get playSfx$() { return this._playSfx; }
  public get paused() { return this._pause; }
  public get muted() { return this._mute; }

  constructor(
    private router: Router,
  ) { 
    this._playSfx.subscribe((value) => {
      if (this._mute) {
        return;
      }
      const audio = new Audio(this.getPath(value));
      if (value.includes('MUSIC') && value === this.song) {
        return;
      }
      if (value.includes('MUSIC') && value !== this.song) {
        this.music = audio;
        this.music.loop = true;
        if (value === 'TUTORIAL_MUSIC') {
          this.setVolume(0.05);
        }
        this.song = value;
        if (!this._pause) {
          this.music.play().catch(err => console.error('Error playing sound:', err));
        }
      }
      else {
        audio.play().catch(err => console.error('Error playing sound:', err));
      }
    });
    this.router.events.subscribe((value) => {
      if (value.type === EventType.NavigationStart) {
        this.music.pause();
        this.music = new Audio();
        this.song = '';
      }
    })
  }

  public play(sfx: SfxType) {
    this.playSfx$.next(sfx);
  }

  public clear() {
    this.playSfx$.next('');
  }

  public toggleMute() {
    this._mute = !this._mute;
    this.music.volume = this._mute ? 0 : 1;
    return this._mute;
  }
  public togglePause() {
    this._pause = !this._pause;
    if (this._pause) {
      this.music.pause();
    }
    else {
      this.music.play();
    }
    return this._pause;
  }
  public setVolume(volume: number) {
    this.music.volume = volume;
  }

  private getPath(sfxType: SfxType): Path {
    switch (sfxType) {
      case 'CLICK':
        return UI_PATH + 'click.ogg';
      case 'ATTACK':
        return UI_PATH + 'attack.mp3';
      case 'SWITCH':
        return UI_PATH + 'switch.mp3';
      case 'BATTLE_MUSIC':
        return MUSIC_PATH + 'battle.wav';
      case 'TUTORIAL_MUSIC':
        return MUSIC_PATH + 'tutorial.wav';
      case 'DAMAGE':
        return UI_PATH + 'damage.wav';
      case 'SPECIAL':
        return UI_PATH + 'special.wav';
      case 'APPLY_CARD':
        return UI_PATH + 'apply-card.wav';
      case 'UNAPPLY_CARD':
        return UI_PATH + 'unapply-card.wav';
    }
    return '';
  }

}

export type SfxType = 
  | 'SWITCH'
  | 'CLICK'
  | 'BATTLE_MUSIC'
  | 'TUTORIAL_MUSIC'
  | 'ATTACK'
  | 'DAMAGE'
  | 'SPECIAL'
  | 'APPLY_CARD'
  | 'UNAPPLY_CARD'
  | ''
;