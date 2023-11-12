import { Component } from '@angular/core';
import { fadeInOnEnterAnimation, fadeOutOnLeaveAnimation } from 'angular-animations';
import { EventCommandQueueService } from '../../services/event-command-queue/event-command-queue.service';

@Component({
  selector: 'sw-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
  animations: [
    fadeInOnEnterAnimation({ duration: 200 }),
    fadeOutOnLeaveAnimation({ duration: 200 }),
  ]
})
export class DialogComponent {

  message: string = '';
  show: boolean = false;

  constructor(
    private ecqs: EventCommandQueueService,
  ) {

  }

  ngOnInit() {
    this.ecqs.event$.subscribe((command) => {
      if (!command) return;
      this.show = command.type !== 'SELECTION_PHASE';
      if (command.skipMessage()) return;
      setTimeout(() =>{
        this.message = command.getDisplayMessage();
      }, 300);
      
    });
  }

  next() {
    this.message = '';
    this.ecqs.acknowledge();
  }

}
