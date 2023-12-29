import { CardCompositeKey } from "~/app/shared/interfaces/ICompositeKey.interface";
import { GameState } from "../../services/game-state/game-state.service";
import { PlayerType } from "../player-type.mode";
import { UpdateGameStateService } from "../../services/update-game-state/update-game-state.service";
import { StandardActions } from "../standard-actions/standard-actions";
import { Chargroar } from "../monsters/chargroar.model";
import { Vulturock } from "../monsters/vulturock.model";
import { Stalagrowth } from "../monsters/stalagrowth.model";
import { Deusvolt } from "../monsters/deusvolt.model";
import { Volcanoggin } from "../monsters/volcanoggin.model";
import { Sorrospine } from "../monsters/Sorrospine.model";
import { Lanternshade } from "../monsters/lanternshade.model";

export const CardByKeyUtil = {
  executeCardByKey,
  executeStandardAction,
}

function executeCardByKey(key: CardCompositeKey, player: PlayerType, receiver: UpdateGameStateService, gs: GameState) {

  const monsterKey = key.includes("_") ? key.substring(0, key.indexOf("_")) : key;
  const cardKey = key.substring(key.indexOf("_") + 1, key.length);

  switch (monsterKey) {
    case CHARGROAR:
      new Chargroar(monsterKey, cardKey, player, gs, receiver).executeMonsterCard(key);
      break;
    case DEUSVOLT:
      new Deusvolt(monsterKey, cardKey, player, gs, receiver).executeMonsterCard(key);
      break;
    case LANTERNSHADE:
      new Lanternshade(monsterKey, cardKey, player, gs, receiver).executeMonsterCard(key);
      break;
    case SORROSPINE:
      new Sorrospine(monsterKey, cardKey, player, gs, receiver).executeMonsterCard(key);
      break;
    case STALAGROWTH:
      new Stalagrowth(monsterKey, cardKey, player, gs, receiver).executeMonsterCard(key);
      break;
    case VOLCANOGGIN:
      new Volcanoggin(monsterKey, cardKey, player, gs, receiver).executeMonsterCard(key);
      break;
    case VULTUROCK:
      new Vulturock(monsterKey, cardKey, player, gs, receiver).executeMonsterCard(key);
      break;
  }
  switch (key) {
    case 'SA_REST':
      StandardActions.rest(key, player, receiver, gs);
      break;
    case 'SA_PREPARE':
      StandardActions.prepare(key, player, receiver, gs);
      break;
  }
}
const CHARGROAR = 'CHARGROAR';
const DEUSVOLT = 'DEUSVOLT';
const DROWNIGATOR = 'DROWNIGATOR';
const FLEXFERNO = 'FLEXFERNO';
const GALEAFFY = 'GALEAFFY';
const LANTERNSHADE = 'LANTERNSHADE';
const PHANTOMATON = 'PHANTOMATON';
const SORROSPINE = 'SORROSPINE';
const STALAGROWTH = 'STALAGROWTH';
const VOLCANOGGIN = 'VOLCANOGGIN';
const VULTUROCK = 'VULTUROCK';
const WHAILSTROM = 'WHAILSTROM';
const ZAPPGUIN = 'ZAPPGUIN';

function getActionKey(name: string, i: number) { return `${CHARGROAR}_A${i}`; }
function getBuffKey(name: string, i: number) { return `${CHARGROAR}_B${i}`; }

function executeStandardAction(key: CardCompositeKey, player: PlayerType, receiver: UpdateGameStateService, gs: GameState) {
  switch (key) {
    case 'SA_REST':
      StandardActions.rest(key, player, receiver, gs);
      break;
    case 'SA_PREPARE':
      StandardActions.prepare(key, player, receiver, gs);
      break;
  }
}