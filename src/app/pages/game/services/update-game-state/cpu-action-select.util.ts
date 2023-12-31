import { CardCompositeKey } from "~/app/shared/interfaces/ICompositeKey.interface";
import { PlayerState } from "../game-state/game-state.service";
import { SelectedAction } from "../selected-action/selected-action.model";
import { StandardAction } from "../../models/standard-action/standard-action.model";
import { PlayerCardManager } from "../../models/player/player-card-manager.model";
import { Buff } from "../../models/monster/buff.model";
import { Monster } from "../../models/monster/monster.model";
import { MonsterAction } from "../../models/monster/monster-action.model";
import { ArrayUtil } from "~/app/shared/utils/array.util";
import { SeedableRngService } from "../seedable-rng/seedable-rng.service";

export const CPUActionSelectUtil = {
  getRandomAction,
}

function getRandomAction(cpuState: PlayerState, playerState: PlayerState, rng: SeedableRngService): SelectedAction {
  const { activeMonster, inactiveMonsters, statBoard, playerCardManager } = cpuState;
  const { activeMonster: pActiveMonster } = playerState;
  const potentialActionKeys: CardCompositeKey[] = [];
  // standard actions
  if (rng.randomFloat() > 0.75) {
    if (playerCardManager.hand.cardsInHand() <= 3 || activeMonster.currentHp <= 2) {
      potentialActionKeys.push('Prepare');
    }
    if (playerCardManager.hand.cardsInHand() <= 2 || activeMonster.currentHp <= 2) {
      potentialActionKeys.push('Rest');
    }
  }
  // switch to options
  if (playerCardManager.hand.cardsInHand() >= 2) {
    let switchRandom = rng.randomFloat();
    if (activeMonster.modifiers.hasStatusEffect()) {
      switchRandom += 0.1;
    }
    inactiveMonsters.forEach(m => {
      if (m.currentHp !== 0 && switchRandom > 0.4) {
        potentialActionKeys.push(m.key());
      }
    });
  }
  // monster action options
  activeMonster.actions.forEach(a => {
    if (a.discards <= playerCardManager.hand.cardsInHand() && !a.isDisabled && !a.isLocked) {
      potentialActionKeys.push(a.key());
    }
  });
  const chosenActionKey = potentialActionKeys[Math.floor(rng.randomFloat() * potentialActionKeys.length)];
  // is monster action
  if (chosenActionKey.includes("_A")) {
    return getMonsterAction(cpuState, chosenActionKey, rng);
  }

  // is standard action
  if (['Rest', 'Prepare'].includes(chosenActionKey)) {
    return new SelectedAction(new StandardAction(chosenActionKey, ''));
  }

  // is switch action
  return getSwitchAction(cpuState, chosenActionKey);

}

function getMonsterAction(cpuState: PlayerState, key: CardCompositeKey, rng: SeedableRngService) {
  const { activeMonster, playerCardManager, statBoard } = cpuState;
  const action = activeMonster.actions.find(a => a.key() === key) as MonsterAction;
  const discards = getRandomCardsFromHand(action.discards, playerCardManager);
  let buffs: Buff[] = [];
  const cardsInHandAfterDiscard = playerCardManager.hand.cardsInHand();
  if (cardsInHandAfterDiscard > 0) {
    const slotsAbleToUse = cardsInHandAfterDiscard >= action.buffs ? action.buffs : cardsInHandAfterDiscard;
    buffs = getRandomCardsFromHand(slotsAbleToUse, playerCardManager);
  }
  let statBoardSection = undefined;
  let sectionsWithPips = statBoard.getSectionsWithPips();
  if (!action.isStatus && statBoard.hasPips() && rng.randomFloat() > 0.65) {
    const rand = sectionsWithPips[ArrayUtil.getRandomIndex(sectionsWithPips.length, rng)]; 
    statBoardSection = statBoard.getSectionFromType(rand);
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
    const card = playerCardManager.hand.discardRandomCard();
    cards.push(card);
  }
  return cards;
}