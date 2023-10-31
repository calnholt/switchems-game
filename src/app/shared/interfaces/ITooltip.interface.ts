import { Directive } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Directive()
export class ITooltip {
  isHovering: boolean = false;
  top!: number;
  left!: number;
  show: boolean = true;
  kill: BehaviorSubject<boolean> = new BehaviorSubject(false);
}