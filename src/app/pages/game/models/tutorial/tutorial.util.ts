import { GameState } from "../../services/game-state/game-state.service";
import { TutorialSection } from "./tutorial.model";

export const TutorialSections: TutorialSection[] = [
  {
    text: `Hey there! My name's Professor Holt, a giga-chad Catholic and the world's leading expert on all things Switchems. I'll teach you everything you'll need to know to play.`,
    description: 'intro',
    isStart: true,
  },
  {
    text: `Going forward, I will highlight relevant information by making them <span class="tutorial-highlight inline">"pulse"</span> on your screen, so please take notice!`,
    description: 'pulse',
  },
  {
    text: `The first player to knockout (KO) their opponent's three monsters wins. A monster is knocked out when their health points [HP] (HP) are reduced to zero.`,
    types: ['HP'],
    description: 'knockout',
  },
  {
    text: `Throughout a game of Switchems, you and your opponent will choose one action secretly on your turn. Once both players have selected actions, they are resolved in a specific order (which will be explained later). Then a new turn starts!`,
    description: 'select-actions-secretly',
  },
  {
    text: `The world of Switchems has a seemingly unlimited number of monsters - and as such, they're all capable of very unique things!`,
    description: 'monster-fluff',
  },
  {
    text: `Each monster has their own starting HP [HP]. It's important to try to keep your monsters alive for as long as possible!`,
    types: ['HP'],
    description: 'hp',
  },
  {
    text: `Each monster has their own initiative value. I'll explain this in more detail later.`,
    types: ['INITIATIVE'],
    description: 'initiative',
  },
  {
    text: `Each monster has its own weaknesses [SUPER-EFFECTIVE] and resistances [RESIST] based on the monster's element(s).`,
    types: ['WEAKNESSES', 'RESISTANCES'],
    description: 'weakness-resistance',
  },
  {
    text: `When you hover your mouse over a monster, a tooltip appears that shows its switch in ability and its passive ability. Some monsters only have one of these, but some have both. Try it now!`,
    types: ['MONSTER'],
    description: 'hover-monster',
  },
  {
    text: `Monsters have four unique monster actions, which highly influence a monster's style of play. Let's dig into the different aspects of a monster action.`,
    types: ['MONSTER_ACTION'], 
    description: 'monster-actions',
    isTop: true,
  },
  {
    text: `Most monster actions are attacks, which have a name, attack [ATK] value, speed [SPD] value, buff [B] card slots, discard [-] slots, draw [+] card slots, and action text. For example, this action's name is Leaf Burst, with an attack value of 5, speed of 3, 2 buff slots, and 2 discard slots.`,
    types: ['DEUSVOLT_A3'], 
    description: 'attack-description',
    isTop: true,
  },
  {
    text: `The attack [ATK] value represents how much damage it will deal to the opponent's active monster.`,
    types: ['MONSTER_ACTION_ATTACK'], 
    description: 'attack',
    isTop: true,
  },
  {
    text: `An action with a status [SPECIAL] symbol denotes that the action is not an attack, and therefore deals no damage and cannot be buffed.`,
    types: ['MONSTER_ACTION_STATUS'], 
    description: 'status',
    isTop: true,
  },
  {
    text: `This symbol is the action's element, of which there are six - fire [F], water [W], leaf [L], rock [R], electric [E], and death [S]. These are important for weaknesses and resistances.`,
    types: ['MONSTER_ACTION_ELEMENT'], 
    description: 'element',
    isTop: true,
  },
  {
    text: `The speed [SPD] value represents how fast the action is - the higher the value, the faster it is. If both players select a monster action, the faster action resolves first. If the speeds are tied, the monster with the higher initiative value resolves first.`,
    types: ['MONSTER_ACTION_SPEED', 'INITIATIVE'], 
    description: 'speed',
    isTop: true,
  },
  {
    text: `It's important to note that if your opponent selects a faster action and KO's your active monster, your monster does not perform its monster action. Speed is very important!`,
    types: ['MONSTER_ACTION_SPEED'], 
    description: 'speed-ko',
    isTop: true,
  },
  {
    text: `Discard [-] slots are a required cost to play an action - so in order to play Leaf Burst, you must discard two cards from your hand. If you do not have two cards in your hand, you cannot use the Leaf Burst action.`,
    types: ['DEUSVOLT_A3'], 
    description: 'discard-slots',
    isTop: true,
  },
  {
    text: `Unlike discard [-] slots, buffs slots [B] are optional. When you select an action with buff slots, you may optionally apply that many cards from your hand to gain their benefits. Buffs are applied before actions and are resolved in initiative order (the monster with the higher initiative resolves their buffs first).`,
    types: ['MONSTER_ACTION_BUFF', 'INITIATIVE', 'BUFF'], 
    description: 'buff-slots',
    isTop: true,
  },
  {
    text: `Players have a deck of 12 buff cards. Each monster on a player's team contributes four cards to form their deck. You can apply buff cards from any monster to any of your monsters.`,
    types: ['BUFF'], 
    description: 'deck',
    isTop: true,
  },
  {
    text: `You have a maximum hand size of five cards. If you have five cards in your hand, you simply do not draw more cards. Keep track of the number of cards in your opponent's hand - the more cards in a player's hand, the more threatening they are.`,
    types: ['OPPONENT_HAND'], 
    description: 'max-hand',
    isTop: true,
  },
  {
    text: `After you have clicked on a monster action, when you hover over a card in your hand, buff and discard icons will appear on the left and right side of the card. Clicking these will apply the card as a buff or a discard.`,
    types: ['MONSTER_ACTION_BUFF', 'MONSTER_ACTION_DISCARD', 'BUFF'], 
    description: 'apply-card',
    isTop: true,
  },
  {
    text: `When an action has draw card [+] slots, you draw that many cards, even if the monster was KO'd this turn.`,
    types: ['MONSTER_ACTION_DRAW'], 
    description: 'monster-action-draw',
    isTop: true,
  },
  {
    text: `When a monster action is selected, it becomes disabled [DISABLE] for the following turn. You can't just spam your best moves!`,
    types: [], 
    description: 'disabled',
    isTop: true,
  },
  {
    text: `When an attack is super effective against a monster (meaning the attack is one of the elements that the monster is weak to), the player gains a stat pip of a random value.`,
    types: ['MONSTER_ACTION_ELEMENT', 'WEAKNESSES', 'PIP_SECTION'], 
    description: 'super-effective',
  },
  {
    text: `For example, Sorropine, the cactus-looking monster on the right, is weak to fire [F] and death [S]. So fire and death attacks are super effective against Sorropine.`,
    types: ['WEAKNESSES'], 
    description: 'super-effective-2',
  },
  {
    text: `Throughout the game, you will gain stat pips. There are three types - attack [ATK], speed [SPD], and defense [DEF]. When you are selecting a monster action, you may also apply all of your pips from a single type. This is done by clicking a pip section when you have selected a monster action.`,
    types: ['PIP_SECTION'], 
    description: 'pips',
  },
  {
    text: `For example, if you have three speed pips, you may apply all of them to your selected monster attack, giving it +3 speed. Pips can only be applied to attacks and pips persist even as your active monster changes.`,
    types: ['PIP_SECTION'], 
    description: 'pips-example',
  },
  {
    text: `You can choose to switch to one of your other monsters as long as they are not KO'd (this is called a switch action). Switch actions have two discard slots [-].`,
    types: ['BENCHED_MONSTER'],
    description: 'switch-action',
  },
  {
    text: `When a switch action occurs, you are given a choice to heal your active monster 2HP or remove all of that monster's status effects [STATUS]. Then the monster you selected switches in, its switch in ability is resolved, if it has one.`,
    types: [], 
    description: 'switch-out-decision',
  },
  {
    text: `On the turn a monster switches in, it gains switch in defense [RESIST]. Switch in defense gives the monster bonus defense against attacks with elements that it resists.`,
    types: ['RESISTANCES'],
    description: 'switch-in-defense',
  },
  {
    text: `Properly leveraging switch actions can neutralize your opponent's offense and better position yourself to acquire a big advantage!`,
    types: ['BENCHED_MONSTER'], 
    description: 'leverage-switch',
  },
  {
    text: `Additionally, you have access to the standard actions Rest and Prepare. These actions can be used by all monsters and are not prevented if your active monster is KO'd during the turn.`,
    types: ['STANDARD_ACTIONS'], 
    description: 'standard-actions',
  },
  {
    text: `Now that we have covered all of the actions you can do on a turn, let's review a turn's structure:
    1) Apply pips (initiative order)
    2) Apply buffs (initiative order)
    3) Switch actions (initiative order)
    4) Monster actions (speed order)
    5) Standard actions (initiative order)`,
    types: [], 
    description: 'turn-structure',
  },
  {
    text: `After resolving these steps, both players will draw a card from their deck and a new turn begins.`,
    types: [], 
    description: 'new-turn',
  },
  {
    text: `Now that we've covered the basics of Switchems, I will guide you through a couple of turns so you can familiarize yourself with everything that you've learned.`,
    types: [], 
    description: 'covered-basics',
  },
  {
    text: `For our first action, let's select the Leaf Burst monster action. After you have clicked it, hover over each of the buff cards in your hand and apply them as discards. You do this by clicking the discard [-] icon on the right side. Then press the submit button.`,
    types: [], 
    description: 'action-1',
    isTop: true,
    isGuidedTutorial: true,
    startGuidedTutorial: true,
  },
  {
    text: `Good job! Next, let's select the Rest standard action. We are low on cards in our hand, so this will help draw us more and give us more flexibility on future turns.`,
    types: [], 
    description: 'action-2',
    isTop: true,
    isGuidedTutorial: true,
  },
  {
    text: `Awesome! Now that we have more cards, let's use the Shock monster action. Apply at least one buff [B] card to it from your hand and also apply your speed pips. Remember, you can only apply buffs and pips after you have clicked a monster action.`,
    types: [], 
    description: 'action-3',
    isTop: true,
    isGuidedTutorial: true,
  },
  {
    text: `Well done! The last action we have yet to perform is a switch action. Select either Volcanoggin or Lanternshade and discard two cards from your hand.`,
    types: [], 
    description: 'action-4',
    isTop: true,
    isGuidedTutorial: true,
  },
  {
    text: `At this point, I have shown you all you will need to know to play Switchems. Thank you for taking the time to learn how to play. Let's see if you can put all of your knowledge to the test and win your first game. Good luck!`,
    types: [], 
    description: 'end',
    isTop: true,
  },
  {
    text: '',
    types: [], 
    description: 'finish',
    isEnd: true,
  },
];

export const GuidedTutorialCheckUtil = {
  checkTurn,
};

function checkTurn(gs: GameState, turnNumber: number) {
  switch(turnNumber) {
    case 1:
      return checkTurn1(gs);
    case 2:
      return checkTurn2(gs);
    case 3:
      return checkTurn3(gs);
    case 4:
      return checkTurn4(gs);
  };
  return false;
}

function checkTurn1(gs: GameState): boolean {
  return gs.p.selectedAction.action.key() === 'DEUSVOLT_A3';
};
function checkTurn2(gs: GameState): boolean {
  return gs.p.selectedAction.action.key() === 'SA_REST';
};
function checkTurn3(gs: GameState): boolean {
  const { selectedAction } = gs.p;
  return selectedAction.action.key() === 'DEUSVOLT_A1' && selectedAction.appliedBuffs.length > 0 && selectedAction.statBoardSection?.type === 'SPEED';
};
function checkTurn4(gs: GameState): boolean {
  return ['VOLCANOGGIN', 'LANTERNSHADE'].includes(gs.p.selectedAction.action.key());
};