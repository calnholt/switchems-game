import { CardCompositeKey } from "~/app/shared/interfaces/ICompositeKey.interface";
import { GameState } from "../../services/game-state/game-state.service";
import { PlayerType } from "../player-type.mode";
import { UpdateGameStateService } from "../../services/update-game-state/update-game-state.service";
import { StandardActions } from "../standard-actions/standard-actions";
import { Chargroar } from "../monsters/chargroar.model";
import { Vulturock } from "../monsters/vulturock.model";
import { Stalagrowth } from "../monsters/stalagrowth.model";

export const CardByKeyUtil = {
  getCardByKey
}

function getCardByKey(key: CardCompositeKey, player: PlayerType, receiver: UpdateGameStateService, gs: GameState) {

  const monsterKey = key.substring(0, key.indexOf("_"));
  const cardKey = key.substring(key.indexOf("_") + 1, key.length);
  const shared = { monsterKey, cardKey, player, gs, receiver };

  switch (monsterKey) {
    // chargroar
    case CHARGROAR:
      new Chargroar(monsterKey, cardKey, player, gs, receiver).executeMonsterCard(key);
      break;
    // ***
    case VULTUROCK:
      new Vulturock(monsterKey, cardKey, player, gs, receiver).executeMonsterCard(key);
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
      new Stalagrowth(monsterKey, cardKey, player, gs, receiver).executeMonsterCard(key);
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
  }
  switch(key) {
    case 'SA_REST':
      StandardActions.rest(key, player, receiver, gs);
      break;
    case 'SA_PREPARE':
      StandardActions.prepare(key, player, receiver, gs);
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