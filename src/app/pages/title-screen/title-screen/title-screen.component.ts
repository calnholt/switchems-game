import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'sw-title-screen',
  templateUrl: './title-screen.component.html',
  styleUrls: ['./title-screen.component.scss']
})
export class TitleScreenComponent {

  constructor(private router: Router) {}

  quickStart() {
    // Navigate to '/your-route'
    this.router.navigate(['/quick-start']);
  }

  tutorial() {
    // Navigate to '/your-route'
    this.router.navigate(['/tutorial']);
  }

}
