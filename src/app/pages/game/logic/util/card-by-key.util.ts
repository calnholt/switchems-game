import { CardCompositeKey } from "~/app/shared/interfaces/ICompositeKey.interface";
import { EventManagerService } from "../../services/event-manager/event-manager.service";
import { GameState, GameStateService } from "../../services/game-state/game-state.service";
import { PlayerType } from "../player-type.mode";
import { EventCommandQueueService } from "../../services/event-command-queue/event-command-queue.service";
import { Chargroar } from "../monsters/chargroar";
import { UpdateGameStateUtil } from "../../services/update-game-state/update-game-state.util";

export const CardByKeyUtil = {
  getCardByKey
}

function getCardByKey(key: CardCompositeKey, player: PlayerType, ecqs: EventCommandQueueService, gs: GameState) {

  switch (key) {
    // chargroar
    case CHARGROAR:
      Chargroar.ChargroarMonster(key, player, ecqs);
      break;
    case getActionKey(CHARGROAR, 0):
      break;
    case getActionKey(CHARGROAR, 1):
      break;
    case getActionKey(CHARGROAR, 2):
      break;
    case getActionKey(CHARGROAR, 3):
      break;
    case getBuffKey(CHARGROAR, 0):
      break;
    case getBuffKey(CHARGROAR, 1):
      break;
    case getBuffKey(CHARGROAR, 2):
      break;
    case getBuffKey(CHARGROAR, 3):
      break;
    // ***
    case VULTUROCK:
      break;
    case getActionKey(VULTUROCK, 0):
      break;
    case getActionKey(VULTUROCK, 1):
      break;
    case getActionKey(VULTUROCK, 2):
      break;
    case getActionKey(VULTUROCK, 3):
      break;
    case getBuffKey(VULTUROCK, 0):
      break;
    case getBuffKey(VULTUROCK, 1):
      break;
    case getBuffKey(VULTUROCK, 2):
      break;
    case getBuffKey(VULTUROCK, 3):
      break;
    // ***
    case WHAILSTROM:
      break;
    case getActionKey(WHAILSTROM, 0):
      break;
    case getActionKey(WHAILSTROM, 1):
      break;
    case getActionKey(WHAILSTROM, 2):
      break;
    case getActionKey(WHAILSTROM, 3):
      break;
    case getBuffKey(WHAILSTROM, 0):
      break;
    case getBuffKey(WHAILSTROM, 1):
      break;
    case getBuffKey(WHAILSTROM, 2):
      break;
    case getBuffKey(WHAILSTROM, 3):
      break;
    // ***
    case ZAPPGUIN:
      break;
    case getActionKey(ZAPPGUIN, 0):
      break;
    case getActionKey(ZAPPGUIN, 1):
      break;
    case getActionKey(ZAPPGUIN, 2):
      break;
    case getActionKey(ZAPPGUIN, 3):
      break;
    case getBuffKey(ZAPPGUIN, 0):
      break;
    case getBuffKey(ZAPPGUIN, 1):
      break;
    case getBuffKey(ZAPPGUIN, 2):
      break;
    case getBuffKey(ZAPPGUIN, 3):
      break;
    // ***
    case PHANTOMATON:
      break;
    case getActionKey(PHANTOMATON, 0):
      break;
    case getActionKey(PHANTOMATON, 1):
      break;
    case getActionKey(PHANTOMATON, 2):
      break;
    case getActionKey(PHANTOMATON, 3):
      break;
    case getBuffKey(PHANTOMATON, 0):
      break;
    case getBuffKey(PHANTOMATON, 1):
      break;
    case getBuffKey(PHANTOMATON, 2):
      break;
    case getBuffKey(PHANTOMATON, 3):
      break;
    // ***
    case STALAGROWTH:
      break;
    case getActionKey(STALAGROWTH, 0):
      break;
    case getActionKey(STALAGROWTH, 1):
      break;
    case getActionKey(STALAGROWTH, 2):
      break;
    case getActionKey(STALAGROWTH, 3):
      break;
    case getBuffKey(STALAGROWTH, 0):
      break;
    case getBuffKey(STALAGROWTH, 1):
      break;
    case getBuffKey(STALAGROWTH, 2):
      break;
    case getBuffKey(STALAGROWTH, 3):
      break;
    // ***
    case GALEAFFY:
      break;
    case getActionKey(GALEAFFY, 0):
      break;
    case getActionKey(GALEAFFY, 1):
      break;
    case getActionKey(GALEAFFY, 2):
      break;
    case getActionKey(GALEAFFY, 3):
      break;
    case getBuffKey(GALEAFFY, 0):
      break;
    case getBuffKey(GALEAFFY, 1):
      break;
    case getBuffKey(GALEAFFY, 2):
      break;
    case getBuffKey(GALEAFFY, 3):
      break;
    // ***
    case DROWNIGATOR:
      break;
    case getActionKey(DROWNIGATOR, 0):
      break;
    case getActionKey(DROWNIGATOR, 1):
      break;
    case getActionKey(DROWNIGATOR, 2):
      break;
    case getActionKey(DROWNIGATOR, 3):
      break;
    case getBuffKey(DROWNIGATOR, 0):
      break;
    case getBuffKey(DROWNIGATOR, 1):
      break;
    case getBuffKey(DROWNIGATOR, 2):
      break;
    case getBuffKey(DROWNIGATOR, 3):
      break;
    // ***
    case FLEXFERNO:
      break;
    case getActionKey(FLEXFERNO, 0):
      break;
    case getActionKey(FLEXFERNO, 1):
      break;
    case getActionKey(FLEXFERNO, 2):
      break;
    case getActionKey(FLEXFERNO, 3):
      break;
    case getBuffKey(FLEXFERNO, 0):
      break;
    case getBuffKey(FLEXFERNO, 1):
      break;
    case getBuffKey(FLEXFERNO, 2):
      break;
    case getBuffKey(FLEXFERNO, 3):
      break;
    // ***
    // TODO:
    case 'SA_REST':
    case 'SA_PREPARE':
      UpdateGameStateUtil.gainRandomStatPip(gs, { key: 'SA_PREPARE', player, amount: 3 }, ecqs);
      break;
  }
}
const CHARGROAR = 'CHARGROAR';
const VULTUROCK = 'VULTUROCK';
const WHAILSTROM = 'WHAILSTROM';
const ZAPPGUIN = 'ZAPPGUIN';
const PHANTOMATON = 'PHANTOMATON';
const STALAGROWTH = 'STALAGROWTH';
const GALEAFFY = 'GALEAFFY';
const DROWNIGATOR = 'DROWNIGATOR';
const FLEXFERNO = 'FLEXFERNO';

function getActionKey(name: string, i: number) { return `${CHARGROAR}_A${i}`; }
function getBuffKey(name: string, i: number) { return `${CHARGROAR}_B${i}`; }