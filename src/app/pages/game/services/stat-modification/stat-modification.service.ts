import { Injectable } from '@angular/core';
import { StatModificationEvent, StatModificationEventType } from './stat-modification.model';
import { BehaviorSubject } from 'rxjs';
import { PlayerType } from '../../components/game/logic/condition.model';

export interface StatModifications {
  attack: number,
  speed: number,
  defense: number,
  pierce: number,
  recoil: number,
  heal: number,
}

@Injectable({
  providedIn: 'root'
})
export class StatModificationService {

  private _modifications$ = new BehaviorSubject<StatModifications>(this.getEmpty());
  private _oModifications$ = new BehaviorSubject<StatModifications>(this.getEmpty());

  public get modifications$() { return this._modifications$; }
  public get modifications() { return this._modifications$.value; }
  public get oModifications$() { return this._oModifications$; }
  public get oModifications() { return this._oModifications$.value; }

  constructor() { }

  sendEvent(event: StatModificationEvent) {
    switch (event.type) {
      case StatModificationEventType.MODIFY_ATTACK:
        this.modifyAttack(event.data, event.player);
        break;
      case StatModificationEventType.MODIFY_SPEED:
        this.modifySpeed(event.data, event.player);
        break;
      case StatModificationEventType.MODIFY_DEFENSE:
        this.modifyDefense(event.data, event.player);
        break;
      case StatModificationEventType.MODIFY_PIERCE:
        this.modifyPierce(event.data, event.player);
        break;
      case StatModificationEventType.MODIFY_RECOIL:
        this.modifyRecoil(event.data, event.player);
        break;
      case StatModificationEventType.HEAL:
        this.heal(event.data, event.player);
        break;
    }
  }

  private getByPlayerType$(player: PlayerType) { return player === 'P' ? this._modifications$ : this._oModifications$ }

  private modifyAttack(value: number, player: PlayerType) {
    this.getByPlayerType$(player).next({ ...this.modifications, attack: this.modifications.attack += value })
  }
  private modifySpeed(value: number, player: PlayerType) {
    this.getByPlayerType$(player).next({ ...this.modifications, speed: this.modifications.speed += value })
  }
  private modifyDefense(value: number, player: PlayerType) {
    this.getByPlayerType$(player).next({ ...this.modifications, defense: this.modifications.defense += value })
  }
  private modifyPierce(value: number, player: PlayerType) {
    this.getByPlayerType$(player).next({ ...this.modifications, pierce: this.modifications.pierce += value })
  }
  private modifyRecoil(value: number, player: PlayerType) {
    this.getByPlayerType$(player).next({ ...this.modifications, recoil: this.modifications.recoil += value })
  }
  private heal(value: number, player: PlayerType) {
    this.getByPlayerType$(player).next({ ...this.modifications, heal: this.modifications.heal = value })
  }

  clear() {
    this._modifications$.next(this.getEmpty());
    this._oModifications$.next(this.getEmpty());
  }

  private getEmpty(): StatModifications {
    return { attack: 0, speed: 0, defense: 0, pierce: 0, recoil: 0, heal: 0 };
  }

}
