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
    // ***
    case VULTUROCK:
      return null;
    case getActionKey(VULTUROCK, 0):
      return null;
    case getActionKey(VULTUROCK, 1):
      return null;
    case getActionKey(VULTUROCK, 2):
      return null;
    case getActionKey(VULTUROCK, 3):
      return null;
    case getBuffKey(VULTUROCK, 0):
      return null;
    case getBuffKey(VULTUROCK, 1):
      return null;
    case getBuffKey(VULTUROCK, 2):
      return null;
    case getBuffKey(VULTUROCK, 3):
      return null;
    // ***
    case WILLARD:
      return null;
    case getActionKey(WILLARD, 0):
      return null;
    case getActionKey(WILLARD, 1):
      return null;
    case getActionKey(WILLARD, 2):
      return null;
    case getActionKey(WILLARD, 3):
      return null;
    case getBuffKey(WILLARD, 0):
      return null;
    case getBuffKey(WILLARD, 1):
      return null;
    case getBuffKey(WILLARD, 2):
      return null;
    case getBuffKey(WILLARD, 3):
      return null;
    // ***
    case ZAPPGUIN:
      return null;
    case getActionKey(ZAPPGUIN, 0):
      return null;
    case getActionKey(ZAPPGUIN, 1):
      return null;
    case getActionKey(ZAPPGUIN, 2):
      return null;
    case getActionKey(ZAPPGUIN, 3):
      return null;
    case getBuffKey(ZAPPGUIN, 0):
      return null;
    case getBuffKey(ZAPPGUIN, 1):
      return null;
    case getBuffKey(ZAPPGUIN, 2):
      return null;
    case getBuffKey(ZAPPGUIN, 3):
      return null;
    // ***
    case PHANTOMATON:
      return null;
    case getActionKey(PHANTOMATON, 0):
      return null;
    case getActionKey(PHANTOMATON, 1):
      return null;
    case getActionKey(PHANTOMATON, 2):
      return null;
    case getActionKey(PHANTOMATON, 3):
      return null;
    case getBuffKey(PHANTOMATON, 0):
      return null;
    case getBuffKey(PHANTOMATON, 1):
      return null;
    case getBuffKey(PHANTOMATON, 2):
      return null;
    case getBuffKey(PHANTOMATON, 3):
      return null;
    // ***
    case STALAGROWTH:
      return null;
    case getActionKey(STALAGROWTH, 0):
      return null;
    case getActionKey(STALAGROWTH, 1):
      return null;
    case getActionKey(STALAGROWTH, 2):
      return null;
    case getActionKey(STALAGROWTH, 3):
      return null;
    case getBuffKey(STALAGROWTH, 0):
      return null;
    case getBuffKey(STALAGROWTH, 1):
      return null;
    case getBuffKey(STALAGROWTH, 2):
      return null;
    case getBuffKey(STALAGROWTH, 3):
      return null;
    // ***
    case GALEAFFY:
      return null;
    case getActionKey(GALEAFFY, 0):
      return null;
    case getActionKey(GALEAFFY, 1):
      return null;
    case getActionKey(GALEAFFY, 2):
      return null;
    case getActionKey(GALEAFFY, 3):
      return null;
    case getBuffKey(GALEAFFY, 0):
      return null;
    case getBuffKey(GALEAFFY, 1):
      return null;
    case getBuffKey(GALEAFFY, 2):
      return null;
    case getBuffKey(GALEAFFY, 3):
      return null;
    // ***
    case DROWNIGATOR:
      return null;
    case getActionKey(DROWNIGATOR, 0):
      return null;
    case getActionKey(DROWNIGATOR, 1):
      return null;
    case getActionKey(DROWNIGATOR, 2):
      return null;
    case getActionKey(DROWNIGATOR, 3):
      return null;
    case getBuffKey(DROWNIGATOR, 0):
      return null;
    case getBuffKey(DROWNIGATOR, 1):
      return null;
    case getBuffKey(DROWNIGATOR, 2):
      return null;
    case getBuffKey(DROWNIGATOR, 3):
      return null;
    // ***
    case FLEXFERNO:
      return null;
    case getActionKey(FLEXFERNO, 0):
      return null;
    case getActionKey(FLEXFERNO, 1):
      return null;
    case getActionKey(FLEXFERNO, 2):
      return null;
    case getActionKey(FLEXFERNO, 3):
      return null;
    case getBuffKey(FLEXFERNO, 0):
      return null;
    case getBuffKey(FLEXFERNO, 1):
      return null;
    case getBuffKey(FLEXFERNO, 2):
      return null;
    case getBuffKey(FLEXFERNO, 3):
      return null;
  }
}
const CHARGROAR = 'CHARGROAR';
const VULTUROCK = 'VULTUROCK';
const WILLARD = 'WILLARD';
const ZAPPGUIN = 'ZAPPGUIN';
const PHANTOMATON = 'PHANTOMATON';
const STALAGROWTH = 'STALAGROWTH';
const GALEAFFY = 'GALEAFFY';
const DROWNIGATOR = 'DROWNIGATOR';
const FLEXFERNO = 'FLEXFERNO';

function getActionKey(name: string, i: number) { return `${CHARGROAR}_A${i}`; }
function getBuffKey(name: string, i: number) { return `${CHARGROAR}_B${i}`; }