import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { SfxService, SfxType } from '../../services/sfx.service';
import { Path } from '../../types/dataTypes';

const BASE_PATH = '../../../../assets/audio/ui/';

@Component({
  selector: 'sw-sfx',
  templateUrl: './sfx.component.html',
  styleUrls: ['./sfx.component.scss']
})
export class SfxComponent {

  constructor(
    private sfxService: SfxService,
  ) {

  }

  ngOnInit() {
    this.sfxService.playSfx$.subscribe((value) => {
      const audio = new Audio(this.getPath(value));
      audio.play().catch(err => console.error('Error playing sound:', err));
    });
  }

  getPath(sfxType: SfxType): Path {
    switch (sfxType) {
      case 'CLICK':
        return BASE_PATH + 'click.ogg';
      case 'SWITCH':
        return BASE_PATH + 'switch.mp3';
    }
    return '';
  }

}
