import { Component } from '@angular/core';

@Component({
  selector: 'sw-tooltip',
  templateUrl: './tooltip.component.html',
  styleUrls: ['./tooltip.component.scss']
})
export class TooltipComponent {

  tooltip: string = '';
  left: number = 0;
  top: number = 0;

  constructor() {}

  ngOnInit(): void {}

}
