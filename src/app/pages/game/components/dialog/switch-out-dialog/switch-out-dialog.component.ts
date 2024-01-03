import { Component } from '@angular/core';
import { EventCommandQueueService } from '../../../services/event-command-queue/event-command-queue.service';
import { SwitchOutPromptCommand } from '../../../logic/commands/switch-commands.model';
import { HandlePromptService } from '../../../services/handle-prompt/handle-prompt.service';
import { fadeInOnEnterAnimation, fadeOutOnLeaveAnimation } from 'angular-animations';
import { PeerMessageType } from '~/app/shared/types/PeerMessageTypes';
import { PeerJsService } from '~/app/shared/services/peer-js.service';

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

  show: boolean = false;
  command!: SwitchOutPromptCommand;

  constructor(
    private ecqs: EventCommandQueueService,
    private handlePromptService: HandlePromptService,
    private peerService: PeerJsService,
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
    const data = { ...this.command.data, type: 'HEAL' };
    this.handlePromptService.execute(this.command.type, data);
    this.peerService.sendData(this.command.type as PeerMessageType, data);
    this.show = false;
  }

  removeStatus() {
    const data = { ...this.command.data, type: 'REMOVE_STATUS' };
    this.handlePromptService.execute(this.command.type, data);
    this.peerService.sendData(this.command.type as PeerMessageType, data);
    this.show = false;
  }

}
