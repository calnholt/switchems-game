import { Component } from '@angular/core';
import { fadeInOnEnterAnimation, fadeOutOnLeaveAnimation } from 'angular-animations';
import { EventCommandQueueService } from '../../../services/event-command-queue/event-command-queue.service';
import { HandlePromptService } from '../../../services/handle-prompt/handle-prompt.service';
import { CrushPromptCommand } from '../../../logic/commands/stat-pip-commands.model';
import { PlayerService } from '../../../services/player/player.service';
import { StatBoard, StatBoardSection, StatBoardSectionType } from '../../../models/stat-board/stat-board.model';
import { PeerJsService } from '~/app/shared/services/peer-js.service';
import { PeerMessageType } from '~/app/shared/types/PeerMessageTypes';

@Component({
  selector: 'sw-crush-dialog',
  templateUrl: './crush-dialog.component.html',
  styleUrls: ['./crush-dialog.component.scss', '../dialog.component.scss'],
  animations: [
    fadeInOnEnterAnimation({ duration: 200 }),
    fadeOutOnLeaveAnimation({ duration: 200 }),
  ]
})
export class CrushDialogComponent {

  show: boolean = false;
  command!: CrushPromptCommand;
  statBoard!: StatBoard;

  selections: { statType: StatBoardSectionType, amount: number }[] = [];

  constructor(
    private ecqs: EventCommandQueueService,
    private handlePromptService: HandlePromptService,
    private playerService: PlayerService,
    private peerService: PeerJsService,
  ) {

  }

  ngOnInit() {
    this.ecqs.event$.subscribe((command) => {
      if (!command || command.type !== 'CRUSH_PROMPT') return;
      this.show = true;
      this.command = command as CrushPromptCommand;
      this.statBoard = this.playerService.oPlayer.statBoard;
      if (this.statBoard.attack.current > 0) {
        this.selections.push({ statType: 'ATTACK', amount: 0});
      }
      if (this.statBoard.speed.current > 0) {
        this.selections.push({ statType: 'SPEED', amount: 0});
      }
      if (this.statBoard.defense.current > 0) {
        this.selections.push({ statType: 'DEFENSE', amount: 0});
      }
    });
  }

  getTotal() {
    return this.selections.reduce((acc, value) => value.amount + acc, 0);
  }

  increment(statType: StatBoardSectionType) {
    if (this.getTotal() < this.command.data.total && this.getTotal() < this.statBoard.totalPips()) {
      //@ts-ignore
      this.selections.find(s => s.statType === statType).amount++;
    }
  }

  decrement(statType: StatBoardSectionType) {
    const selection = this.selections.find(s => s.statType === statType);
    //@ts-ignore
    if (selection.amount > 0) selection.amount--;
  }

  submit() {
    if (this.getTotal() > 0) {
      const data = { ...this.command.data, selections: this.selections };
      this.handlePromptService.execute(this.command.type, data);
      this.peerService.sendData(this.command.type as PeerMessageType, data);
      this.show = false;
    }
  }

}
