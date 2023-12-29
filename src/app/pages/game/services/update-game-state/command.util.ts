import { DrawCommand, HandCommandData } from "../../logic/commands/hand-commands.model";
import { DescriptiveMessageCommand } from "../../logic/commands/message-command.model";
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
  const { activeMonster, selectedAction } = GameStateUtil.getPlayerState(gs, data.player);
  let [speed, attack, defense] = [0,0,0];
  const commands = [];
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
    commands.push(
      new GainStatPipCommand(rc, { 
        ...data, 
        key: selectedAction.action.key(), 
        amount: 1, 
        player: data.player, 
        statType: type, 
        monsterName: activeMonster.name, 
        wasRandom: true,
        display: false,
      })
    );
  }
  let message = `${data?.monsterName ?? ''} randomly gained ${attack > 0 ? ` ${attack} attack` : ''}${speed > 0 ? ` ${speed} speed` : ''}${defense > 0 ? ` ${defense} defense`  : ''} pips${data.origin ? ` from ${data.origin}` : ''}`;
  if(data.superEffective) {
    message = `The attack was super effective! ${message}`
  }
  if (data.displayRandomPipGain || data.superEffective) {
    commands.push(new DescriptiveMessageCommand(rc, { ...data, message }));
  }
  commands.reverse().forEach(cmd => cmd.pushFront());
  return { attack, speed, defense, message }

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
    new DrawCommand(rc, { ...data, amount: cardsToDraw, display: false, }).pushFront();
  }
  return cardsToDraw;
}

function heal(gs: GameState, data: HealCommandData, rc: UpdateGameStateService) {
  const monster = GameStateUtil.getPlayerState(gs, data.player).activeMonster;
  const hpDiff = monster.hp - monster.currentHp;
  if (hpDiff > data.amount) {
    new HealCommand(rc, data).pushFront();
    return data.amount;
  }
  new HealCommand(rc, { ...data, amount: hpDiff, display: false}).pushFront();
  return hpDiff;
}