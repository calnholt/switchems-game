import { Component, Input } from '@angular/core';

@Component({
  selector: 'sw-flashy-graphic',
  templateUrl: './flashy-graphic.component.html',
  styleUrls: ['./flashy-graphic.component.scss']
})
export class FlashyGraphicComponent {
  @Input() show = true;

  ngAfterViewInit() {
    // TODO: consider handling in service
    const flashyGraphic = document.querySelector('#flashy-graphic');
    if (flashyGraphic) {
      flashyGraphic.addEventListener('animationstart', () => {
        this.show = true;
      });
      flashyGraphic.addEventListener('animationend', () => {
        this.show = false;
      });
    }
  }

}
