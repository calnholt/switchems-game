import { Component, HostListener, Input } from '@angular/core';
import { SfxService } from '../../services/sfx.service';

@Component({
  selector: 'sw-pushable-button',
  templateUrl: './pushable-button.component.html',
  styleUrls: ['./pushable-button.component.scss']
})
export class PushableButtonComponent {
  @Input() isActive = true;

  constructor(
    private sfx: SfxService,
  ) {
    
  }

  @HostListener('click')
  @HostListener('touchstart')
  onClick() {
    if (this.isActive) {
      this.sfx.play('CLICK');
    }
  }

}
