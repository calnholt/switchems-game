import { CardCompositeKey } from "~/app/shared/interfaces/ICompositeKey.interface";
import { LightningFang } from "../logic/chargroar/actions/lightning-fang.model";
import { EventManagerService } from "../../../services/event-manager/event-manager.service";
import { GameStateService } from "../../../services/game-state/game-state.service";
import { Condition, PlayerType } from "../logic/condition.model";
import { BehaviorSubject } from "rxjs";
import { Hypercharge } from "../logic/chargroar/actions/hypercharge.model";
import { BlazingRoar } from "../logic/chargroar/actions/blazing-roar.model";
import { LightsOut } from "../logic/chargroar/actions/lights-out.model";
import { Chargroar } from "../logic/chargroar/chargroar.model";
import { Charge } from "../logic/chargroar/buffs/charge.model";
import { Roar } from "../logic/chargroar/buffs/roar.model";
import { Revenge } from "../logic/chargroar/buffs/revenge.model";
import { PreyUpon } from "../logic/chargroar/buffs/prey-upon.model";

export const CardByKeyUtil = {
  getCardByKey
}

function getCardByKey(key: CardCompositeKey, player: PlayerType, ems: EventManagerService, gss: GameStateService, trigger$: BehaviorSubject<Condition>) {
  const withTrigger = { key, player, ems, gss, trigger$ };
  const withoutTrigger = { key, player, ems, gss };

  switch (key) {
    // chargroar
    case CHARGROAR:
      return new Chargroar(key, player, ems, gss);
    case getActionKey(CHARGROAR, 0):
      return new LightningFang(key, player, ems, gss);;
    case getActionKey(CHARGROAR, 1):
      return new LightsOut(key, player, ems, gss);
    case getActionKey(CHARGROAR, 2):
      return new Hypercharge(key, player, ems, gss);
    case getActionKey(CHARGROAR, 3):
      return new BlazingRoar(key, player, ems, gss);
    case getBuffKey(CHARGROAR, 0):
      return new Charge(key, player, ems, gss);
    case getBuffKey(CHARGROAR, 1):
      return new Roar(key, player, ems, gss);
    case getBuffKey(CHARGROAR, 2):
      return new Revenge(key, player, ems, gss);
    case getBuffKey(CHARGROAR, 3):
      return new PreyUpon(key, player, ems, gss);
  }
}
const CHARGROAR = 'CHARGROAR';
const WILLARD = 'WILLARD';
const ZAPPGUIN = 'ZAPPGUIN';
const PHANTOMATON = 'PHANTOMATON';
const STALAGROWTH = 'STALAGROWTH';
const GALEAFFY = 'GALEAFFY';
const DROWNIGATOR = 'DROWNIGATOR';
const FLEXFERNO = 'FLEXFERNO';
const VULTUROCK = 'VULTUROCK';

function getActionKey(name: string, i: number) { return `${CHARGROAR}_A${i}`; }
function getBuffKey(name: string, i: number) { return `${CHARGROAR}_B${i}`; }