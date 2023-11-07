import { Component, Input } from '@angular/core';

@Component({
  selector: 'sw-pushable-button',
  templateUrl: './pushable-button.component.html',
  styleUrls: ['./pushable-button.component.scss']
})
export class PushableButtonComponent {
  @Input() isActive = true;
}
