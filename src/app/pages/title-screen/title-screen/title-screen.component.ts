import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'sw-title-screen',
  templateUrl: './title-screen.component.html',
  styleUrls: ['./title-screen.component.scss']
})
export class TitleScreenComponent {

  constructor(private router: Router) {}

  fullGame() {
    this.router.navigate(['/select-monsters']);
  }

  quickStart() {
    this.router.navigate(['/quick-start']);
  }

  tutorial() {
    this.router.navigate(['/tutorial']);
  }

}
