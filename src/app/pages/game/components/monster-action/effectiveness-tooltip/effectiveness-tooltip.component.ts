import { Component, Input } from '@angular/core';
import { ELEMENTS, Path } from 'src/app/shared/types/dataTypes';
import { ImageUtil } from 'src/app/shared/utils/image.util';

@Component({
  selector: 'sw-effectiveness-tooltip',
  templateUrl: './effectiveness-tooltip.component.html',
  styleUrls: ['./effectiveness-tooltip.component.scss']
})
export class EffectivenessTooltipComponent {
  @Input() advantages!: number[];

  imgPaths: Path[] = [];
  randomCube = ImageUtil.icons.randomCube;

  ngOnInit() {
    this.imgPaths = ELEMENTS.filter((elem, i) => this.advantages[i] === 1)
    //@ts-ignore
      .map((elem) => ImageUtil.elements[elem.toLowerCase()]);
  }



}