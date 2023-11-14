import { Component } from '@angular/core';
import { EventCommandQueueService } from '../../../services/event-command-queue/event-command-queue.service';
import { SwitchOutPromptCommand } from '../../../logic/commands/switch-commands.model';
import { HandlePromptService } from '../../../services/handle-prompt/handle-prompt.service';
import { fadeInOnEnterAnimation, fadeOutOnLeaveAnimation } from 'angular-animations';

@Component({
  selector: 'sw-switch-out-dialog',
  templateUrl: './switch-out-dialog.component.html',
  styleUrls: ['./switch-out-dialog.component.scss', '../dialog.component.scss'],
  animations: [
    fadeInOnEnterAnimation({ duration: 200 }),
    fadeOutOnLeaveAnimation({ duration: 200 }),
  ]
})
export class SwitchOutDialogComponent {

  message: string = '';
  show: boolean = false;
  allowNext = true;
  command!: SwitchOutPromptCommand;

  constructor(
    private ecqs: EventCommandQueueService,
    private handlePromptService: HandlePromptService,
  ) {

  }

  ngOnInit() {
    this.ecqs.event$.subscribe((command) => {
      if (!command) return;
      this.show = command.type === 'SWITCH_OUT_PROMPT';
      this.command = command;
    });
  }

  heal() {
    this.handlePromptService.execute(this.command.type, { ...this.command.data, type: 'HEAL' });
    this.show = false;
  }

  removeStatus() {
    this.handlePromptService.execute(this.command.type, { ...this.command.data, type: 'REMOVE_STATUS' });
    this.show = false;
  }

}
