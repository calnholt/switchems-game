import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Path } from '../types/dataTypes';
import { CurrentPhaseService } from '~/app/pages/game/services/current-phase/current-phase.service';
import { EventType, Router } from '@angular/router';

const UI_PATH = '../../../../assets/audio/ui/';
const MUSIC_PATH = '../../../../assets/audio/music/';

@Injectable({
  providedIn: 'root'
})
export class SfxService {

  private _playSfx: BehaviorSubject<SfxType> = new BehaviorSubject<SfxType>('');

  private music = new Audio();
  private _pause = false;
  private _mute = false;

  public get playSfx() { return this._playSfx.value; }
  public get playSfx$() { return this._playSfx; }
  public get paused() { return this._pause; }
  public get muted() { return this._mute; }

  constructor(
    private currentPhaseService: CurrentPhaseService,
    private router: Router,
  ) { 
    this._playSfx.subscribe((value) => {
      const audio = new Audio(this.getPath(value));
      if (value.includes('MUSIC')) {
        this.music = audio;
        this.music.loop = true;
        this.music.play().catch(err => console.error('Error playing sound:', err));
      }
      else {
        audio.play().catch(err => console.error('Error playing sound:', err));
      }
    });
    this.currentPhaseService.currentPhase$.subscribe((value) => {
      if (value === 'START_OF_GAME') {
        this.play('BATTLE_MUSIC');
      }
    })
    this.router.events.subscribe((value) => {
      if (value.type === EventType.NavigationStart) {
        this.music.pause();
        this.music = new Audio();
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
  }
  public togglePause() {
    this._pause = !this._pause;
  }

  private getPath(sfxType: SfxType): Path {
    switch (sfxType) {
      case 'CLICK':
        return UI_PATH + 'click.ogg';
      case 'SWITCH':
        return UI_PATH + 'switch.mp3';
      case 'BATTLE_MUSIC':
        return MUSIC_PATH + 'battle.wav';
    }
    return '';
  }

}

export type SfxType = 
  | 'SWITCH'
  | 'CLICK'
  | 'BATTLE_MUSIC'
  | ''
;