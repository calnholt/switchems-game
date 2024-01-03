import { Component } from '@angular/core';
import { EventCommandQueueService } from '../../../services/event-command-queue/event-command-queue.service';
import { HandlePromptService } from '../../../services/handle-prompt/handle-prompt.service';
import { DisableActionPromptCommand } from '../../../logic/commands/monster-action-commands.model';
import { CardCompositeKey } from '~/app/shared/interfaces/ICompositeKey.interface';
import { fadeInOnEnterAnimation, fadeOutOnLeaveAnimation } from 'angular-animations';
import { PeerMessageType } from '~/app/shared/types/PeerMessageTypes';
import { PeerJsService } from '~/app/shared/services/peer-js.service';

@Component({
  selector: 'sw-disable-monster-action-dialog',
  templateUrl: './disable-monster-action-dialog.component.html',
  styleUrls: ['../dialog.component.scss', './disable-monster-action-dialog.component.scss'],
  animations: [
    fadeInOnEnterAnimation({ duration: 200 }),
    fadeOutOnLeaveAnimation({ duration: 200 }),
  ]
})
export class DisableMonsterActionDialogComponent {

  show: boolean = false;
  command!: DisableActionPromptCommand;

  displayOptions: { key: CardCompositeKey, name: string }[] = [];
  selection!: CardCompositeKey;

  constructor(
    private ecqs: EventCommandQueueService,
    private handlePromptService: HandlePromptService,
    private peerService: PeerJsService,
  ) {

  }

  ngOnInit() {
    this.ecqs.event$.subscribe((command) => {
      if (!command || command.type !== 'DISABLE_ACTION_PROMPT') return;
      this.show = true;
      this.command = command as DisableActionPromptCommand;
      this.displayOptions = this.command.data.options.concat({ key: 'NONE', name: 'Cancel' });
    });
  }

  submit(selection: { key: CardCompositeKey, name: string }) {
    const data = { ...this.command.data, selection };
    this.handlePromptService.execute(this.command.type, { ...this.command.data, selection });
    this.peerService.sendData(this.command.type as PeerMessageType, data);
    this.show = false;
  }

}
