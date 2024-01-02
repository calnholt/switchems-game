import { Injectable } from '@angular/core';
import Peer, { DataConnection } from 'peerjs';
import { BehaviorSubject } from 'rxjs';
import { PeerMessageType } from '../types/PeerMessageTypes';
import { PlayerProfile, PlayerProfileService } from './player-profile.service';

@Injectable({
  providedIn: 'root'
})
export class PeerJsService {
  private _peer: Peer;
  private _peerId: BehaviorSubject<string> = new BehaviorSubject<string>('');
  private _connection: BehaviorSubject<DataConnection | null> = new BehaviorSubject<DataConnection | null>(null);

  public get peerId() { return this._peerId.value; }
  public get peerId$() { return this._peerId; }
  public get connection() { return this._connection.value; }
  public get connection$() { return this._connection; }

  constructor(
    private playerProfileService: PlayerProfileService,
  ) {
    this._peer = new Peer();

    this._peer.on('open', id => {
      this.peerId$.next(id);
    });

    this._peer.on('error', err => {
      console.error(err);
    });

    this._peer.on('connection', (connection) => {
      this.setupConnection(connection, this.playerProfileService.profile, false);
    });
  }

  setupConnection(connection: DataConnection, profile: PlayerProfile, isHost: boolean) {
    this._connection.next(connection);
    console.log('Peer A connected to Peer B');

    // Now you can set up event handlers for this connection
    connection.on('data', (data: any) => {
      const type = data.type as PeerMessageType;
      switch (type) {
        case 'PLAYER_PROFILE':
          this.playerProfileService.setHost(data.data, isHost);
          break;
      }
      console.log('Received data from Peer A:', data);
    });

    connection.on('open', () => {
      console.log('Connection with Peer A opened');
      // Peer B can now send data to Peer A
      this.sendData('PLAYER_PROFILE', profile);
    });

    // Handle close and error events as well
    connection.on('close', () => {
      console.log('Connection with Peer A closed');
    });

    connection.on('error', (err) => {
      console.error('Connection error with Peer A:', err);
    });
  }

  connectToPeer(peerId: string) {
    const connection = this._peer.connect(peerId);
    connection.on('open', () => {
      this.setupConnection(connection, this.playerProfileService.profile, true);
    });
  }

  sendData(type: PeerMessageType, data: any) {
    this.connection?.send({ type, data });
  }

}

export interface PeerData {
  type: PeerMessageType,
  data: any;
}