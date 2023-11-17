import { CardCompositeKey } from "~/app/shared/interfaces/ICompositeKey.interface";
import { PlayerState } from "../game-state/game-state.service";
import { SelectedAction } from "../selected-action/selected-action.model";
import { StandardAction } from "../../models/standard-action/standard-action.model";
import { PlayerCardManager } from "../../models/player/player-card-manager.model";
import { Buff } from "../../models/monster/buff.model";
import { Monster } from "../../models/monster/monster.model";
import { MonsterAction } from "../../models/monster/monster-action.model";
import { ArrayUtil } from "~/app/shared/utils/array.util";
import { StatBoardSectionType } from "../../models/stat-board/stat-board.model";


export const CPUActionSelectUtil = {
  getAction,
}

function getAction(cpuState: PlayerState): SelectedAction {
  const { activeMonster, inactiveMonsters, statBoard, playerCardManager } = cpuState;
  const potentialActionKeys: CardCompositeKey[] = [];
  // standard actions
  const standardActions = ['Rest', 'Prepare'];
  standardActions.forEach(sa => potentialActionKeys.push(sa));
  // switch to options
  inactiveMonsters.forEach(m => {
    if (m.currentHp !== 0) {
      potentialActionKeys.push(m.key());
    }
  });
  // monster action options
  activeMonster.actions.forEach(a => {
    if (a.discards <= playerCardManager.hand.cardsInHand()) {
      potentialActionKeys.push(a.key());
    }
  });
  const chosenActionKey = potentialActionKeys[Math.floor(Math.random() * potentialActionKeys.length)];
  // is monster action
  if (chosenActionKey.includes("_A")) {
    return getMonsterAction(cpuState, chosenActionKey);
  }

  // is standard action
  if (standardActions.includes(chosenActionKey)) {
    return new SelectedAction(new StandardAction(chosenActionKey, []));
  }

  // is switch action
  return getSwitchAction(cpuState, chosenActionKey);

}

function getMonsterAction(cpuState: PlayerState, key: CardCompositeKey) {
  const { activeMonster, playerCardManager, statBoard } = cpuState;
  const action = activeMonster.actions.find(a => a.key() === key) as MonsterAction;
  const buffs = getRandomCardsFromHand(ArrayUtil.getRandomIndex(action.buffs), playerCardManager);
  const discards = getRandomCardsFromHand(action.discards, playerCardManager);
  let statBoardSection = undefined;
  if (statBoard.hasPips() && Math.random() > 0.65) {
    const rand = Math.random();
    let section: StatBoardSectionType = 'DEFENSE';
    if (rand < 1/3) {
      section = 'ATTACK';
    }
    if (rand < 2/3) {
      section = 'SPEED';
    }
    statBoardSection = statBoard.getSectionFromType(section);
  }
  return new SelectedAction(action, buffs, discards, statBoardSection);
}

function getSwitchAction(cpuState: PlayerState, key: CardCompositeKey) {
  const { inactiveMonsters, playerCardManager } = cpuState;
  const discards = getRandomCardsFromHand(2, playerCardManager);
  const monster = inactiveMonsters.find(m => m.key() === key) as Monster;
  return new SelectedAction(monster, [], discards, undefined);
}

function getRandomCardsFromHand(num: number, playerCardManager: PlayerCardManager): Buff[] {
  const cards: Buff[] = [];
  for (let i = 0; i < num; i++) {
    cards.push(playerCardManager.hand.discardRandomCard());
  }
  return cards;
}