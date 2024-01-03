import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { PeerMessage } from '~/app/shared/services/peer-js.service';
import { PeerMessageHandlerService } from './peer-message-handler.service';

@Injectable({
  providedIn: 'root'
})
export class PeerMessageMediatorService {

  private _message: BehaviorSubject<PeerMessage> = new BehaviorSubject<PeerMessage>({ type: '' });

  public get message() { return this._message.value; }
  public get message$() { return this._message; }

  constructor(
  ) {
    
  }
}
