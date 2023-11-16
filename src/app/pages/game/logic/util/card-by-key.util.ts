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

  switch (monsterKey) {
    // chargroar
    case CHARGROAR:
      new Chargroar(monsterKey, cardKey, player, gs, receiver).executeMonsterCard(key);
      break;
    case VULTUROCK:
      new Vulturock(monsterKey, cardKey, player, gs, receiver).executeMonsterCard(key);
      break;
    case STALAGROWTH:
      new Stalagrowth(monsterKey, cardKey, player, gs, receiver).executeMonsterCard(key);
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