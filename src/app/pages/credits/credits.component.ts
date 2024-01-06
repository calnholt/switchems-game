import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'sw-credits',
  templateUrl: './credits.component.html',
  styleUrls: ['./credits.component.scss']
})
export class CreditsComponent {

  constructor(
    private router: Router,
  ) {

  }

  playtesters: string[] = [
    'Conor Cain',
    'Chris Eyer',
    'Zachary Gogel',
    'Ethan Grosso',
    'John Holt',
    'Kevin Levesque',
    'Will Little',
    'Tim Oliva',
    'Jim Palmeri',
    'Dan Peterson',
    'Mike Sette',
    'Guy Tuori',
    'Eric Twardzik',
    'Mike Vessia',
    'Diego Vizhnay',
    'Jeff Kunkel',
    'Josepth Santianna',
    'Elijah Calub',
    'Noah Cagle',
    'Tonin "Nini" Veshi',
    'Alex Acosta',
    'Jakob Rogers',
    'William Morgan',
    'Michael Holder',
    'Jeff Morgan',
  ].sort((a,b) => a.localeCompare(b));

  titleScreen() {
    this.router.navigate(['/']);
  }

}
