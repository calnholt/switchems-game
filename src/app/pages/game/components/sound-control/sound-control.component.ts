import { Component } from '@angular/core';
import { SfxService } from '~/app/shared/services/sfx.service';
import { ImageUtil } from '~/app/shared/utils/image.util';

@Component({
  selector: 'sw-sound-control',
  templateUrl: './sound-control.component.html',
  styleUrls: ['./sound-control.component.scss']
})
export class SoundControlComponent {

  playIcon = ImageUtil.gui.play;
  pauseIcon = ImageUtil.gui.pause;
  audioOnIcon = ImageUtil.gui.audioOn;
  audioOffIcon = ImageUtil.gui.audioOff;

  paused = false;
  muted = false;

  constructor(
    public sfx: SfxService,
  ) {

  }

  pause() {
    this.paused = this.sfx.togglePause();
  }

  mute() {
    this.muted = this.sfx.toggleMute();
  }

}
