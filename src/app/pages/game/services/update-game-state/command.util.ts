import { DrawCommand, HandCommandData } from "../../logic/commands/hand-commands.model";
import { HealCommand, HealCommandData } from "../../logic/commands/stat-modification-command.model";
import { GainRandomStatPipCommandData, GainStatPipCommand } from "../../logic/commands/stat-pip-commands.model";
import { GameState } from "../game-state/game-state.service";
import { GameStateUtil } from "../game-state/game-state.util";
import { UpdateGameStateService } from "./update-game-state.service";

export const CommandUtil = {
  gainRandomStatPip,
  heal,
  draw,
}

// basically an intermediary action that sets the actual pips gained
function gainRandomStatPip(gs: GameState, data: GainRandomStatPipCommandData, rc: UpdateGameStateService) {
  const monster = GameStateUtil.getMonsterByPlayer(gs, data.player);
  let [speed, attack, defense] = [0,0,0]
  for (let i = 0;  i < data.amount; i++) {
    const random = gs.rng.randomIntOption(3);
    let type: 'ATTACK' | 'SPEED' | 'DEFENSE' = 'ATTACK';
    if (random === 0) {
      type = 'ATTACK';
      attack++;
    }
    if (random === 1) {
      type = 'SPEED';
      speed++;
    }
    if (random === 2){
      type = 'DEFENSE'; 
      defense++;
    }
    new GainStatPipCommand(rc, { ...data, key: 'pip', amount: 1, player: data.player, statType: type, monsterName: monster.name, wasRandom: true }).pushFront();
  }
  return { 
    attack, speed, defense, 
    message: `gaining ${attack > 0 ? ` ${attack} attack` : ''}${speed > 0 ? ` ${speed} speed` : ''}${defense > 0 ? ` ${defense} defense`  : ''} pips`};
}

function draw(gs: GameState, data: HandCommandData, rc: UpdateGameStateService) {
  const cardsInHand = GameStateUtil.getPlayerState(gs, data.player).playerCardManager.hand.cardsInHand();
  let cardsToDraw = data.amount;
  if (cardsInHand === 4) {
    cardsToDraw = 1;
  }
  if (cardsInHand === 5) {
    cardsToDraw = 0;
  }
  if (cardsToDraw > 0) {
    new DrawCommand(rc, { ...data, amount: cardsToDraw}).enqueue();
  }
  return cardsToDraw;
}

function heal(gs: GameState, data: HandCommandData, rc: UpdateGameStateService) {
  const monster = GameStateUtil.getPlayerState(gs, data.player).activeMonster;
  const hpDiff = monster.hp - monster.currentHp;
  if (hpDiff > data.amount) {
    new HealCommand(rc, data).enqueue();
    return data.amount;
  }
  new HealCommand(rc, { ...data, amount: hpDiff}).pushFront();
  return hpDiff;
}