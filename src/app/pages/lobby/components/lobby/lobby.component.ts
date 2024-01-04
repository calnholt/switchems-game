import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PeerJsService } from '~/app/shared/services/peer-js.service';
import { PlayerProfile, PlayerProfileService } from '~/app/shared/services/player-profile.service';
import { ImageUtil } from '~/app/shared/utils/image.util';

@Component({
  selector: 'sw-lobby',
  templateUrl: './lobby.component.html',
  styleUrls: ['./lobby.component.scss']
})
export class LobbyComponent {

  myId: string = '';
  peerId: string = '';
  isConnected = false;

  profile!: PlayerProfile;
  opponentProfile!: PlayerProfile;

  readonly ImageUtil = ImageUtil;

  constructor(
    private peerService: PeerJsService,
    private playerProfileService: PlayerProfileService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.profile = this.playerProfileService.profile;
    this.peerService.peerId$.subscribe((value) => {
      this.myId = value;
    });
    this.peerService.connection$.subscribe((value) => {
      this.isConnected = Boolean(value?.connectionId?.length);
      this.peerService.sendData('PLAYER_PROFILE', this.profile);
    })
    this.playerProfileService.opponentProfile$.subscribe((value) => {
      console.log(value);
      this.opponentProfile = value;
    })
  }

  savePlayerName() {
    const originalName = this.profile.name;
    const profile = this.playerProfileService.save(this.profile.name);
    if (profile) {
      this.profile = profile;
    }
    else {
      this.profile.name = originalName;
    }
  }

  copyPeerIdToClipboard(): void {
    const listener = (e: ClipboardEvent) => {
      e.clipboardData?.setData('text/plain', this.myId);
      e.preventDefault();
    };

    document.addEventListener('copy', listener);
    document.execCommand('copy');
    document.removeEventListener('copy', listener);
  }

  connectToPeer() {
    this.peerService.connectToPeer(this.peerId);
  }

  play() {
    this.router.navigate(['select-monsters']);
    this.peerService.sendData('GO_TO_MONSTER_SELECT', {});
  }

  returnToTitleScreen() {
    this.router.navigate(['/']);
  }
}
