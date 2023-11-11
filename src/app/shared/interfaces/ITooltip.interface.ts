import { Directive } from "@angular/core";
import { BehaviorSubject } from "rxjs";

export abstract class ITooltip {
  isHovering: boolean = false;
  top!: number;
  left!: number;
  bottom!: number;
  show: boolean = true;
  kill: BehaviorSubject<boolean> = new BehaviorSubject(false);
  abstract tooltipSetup: (object: any, elementRef: HTMLElement) => void;
}