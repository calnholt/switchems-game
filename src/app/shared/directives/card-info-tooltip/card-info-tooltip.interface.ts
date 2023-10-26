import { AfterViewInit, Directive, ElementRef, ViewChild } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";

@Directive()
export class ICardInfoTooltip implements AfterViewInit {
  @ViewChild('ref') ref!: ElementRef<any>;

  top!: number;
  left!: number;
  show!: boolean;
  // used to communicate with tooltip directive
  kill!: BehaviorSubject<boolean>;

  constructor() {
    this.kill = new BehaviorSubject(false);
    const b = new BehaviorSubject(this.ref);
  }
  ngAfterViewInit(): void {
    this.top = this.top - (this.ref.nativeElement as HTMLElement).offsetHeight - 5;
  }
}