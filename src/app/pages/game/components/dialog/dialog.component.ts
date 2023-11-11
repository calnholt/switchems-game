import { Component } from '@angular/core';
import { EventCommandQueueService } from '../../services/event-command-queue/event-command-queue.service';
import { GamePhaseService } from '../../services/game-phase/game-phase.service';

@Component({
  selector: 'sw-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent {

  message: string = '';
  show: boolean = true;

  constructor(
    private ecqs: EventCommandQueueService,
    private gamePhaseService: GamePhaseService,
  ) {

  }

  ngOnInit() {
    this.ecqs.event$.subscribe((command) => {
      if (!command) return;
      this.show = command.type !== 'SELECTION_PHASE';
      if (command.skipMessage()) return;
      this.message = command.getDisplayMessage();
      
    });
    // this.gamePhaseService.phase$.subscribe((phase) => {
    //   if (phase === 'SELECTION') {
    //     this.hide = true;
    //   }
    // });
  }

  next() {
    this.ecqs.acknowledge();
  }

}
