import { Component } from '@angular/core';
import { fadeInOnEnterAnimation, fadeOutOnLeaveAnimation } from 'angular-animations';
import { KnockedOutSwitchInPromptCommand } from '~/app/pages/game/logic/commands/switch-commands.model';
import { EventCommandQueueService } from '~/app/pages/game/services/event-command-queue/event-command-queue.service';
import { HandlePromptService } from '~/app/pages/game/services/handle-prompt/handle-prompt.service';
import { CardCompositeKey } from '~/app/shared/interfaces/ICompositeKey.interface';
import { PeerJsService } from '~/app/shared/services/peer-js.service';
import { PeerMessageType } from '~/app/shared/types/PeerMessageTypes';

@Component({
  selector: 'sw-koswitch-out-dialog',
  templateUrl: './koswitch-out-dialog.component.html',
  styleUrls: ['./koswitch-out-dialog.component.scss', '../../dialog.component.scss'],
  animations: [
    fadeInOnEnterAnimation({ duration: 200 }),
    fadeOutOnLeaveAnimation({ duration: 200 }),
  ]
})
export class KOSwitchOutDialogComponent {

  show: boolean = false;
  command!: KnockedOutSwitchInPromptCommand;

  constructor(
    private ecqs: EventCommandQueueService,
    private handlePromptService: HandlePromptService,
    private peerService: PeerJsService,
  ) {

  }

  ngOnInit() {
    this.ecqs.event$.subscribe((command) => {
      if (!command || command.type !== 'KNOCKED_OUT_SWITCH_IN_PROMPT') return;
      this.show = true;
      this.command = command as KnockedOutSwitchInPromptCommand;
    });
  }

  submit(key: CardCompositeKey) {
    const data = { ...this.command.data, key };
    this.handlePromptService.execute(this.command.type, { ...this.command.data, key });
    this.peerService.sendData(this.command.type as PeerMessageType, data);
    this.show = false;
  }

}
