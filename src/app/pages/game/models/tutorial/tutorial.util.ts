import { TutorialSection } from "./tutorial.model";

export const TutorialSections: TutorialSection[] = [
  {
    text: `Hey there! My name's Professor Holt, a giga-chad Catholic and the world's leading expert on all things Switchems. I'll teach you everything you'll need to know to play.`,
    description: 'intro',
  },
  {
    text: `Going forward, I will highlight relevant information by making them "pulse" on your screen, so please take notice!`,
    description: 'pulse',
  },
  {
    text: `The first player to knockout (KO) their opponent's three monsters wins. A monster is knocked out when their health points (HP) are reduced to zero.`,
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
    text: `Each monster has their own starting HP. It's important to try to keep your monsters alive for as long as possible!`,
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
    text: `TODO 1`,
    types: ['MONSTER_ACTION'], 
    description: 'todo1',
    isTop: true,
  },
  {
    text: `The attack [ATK] value represents how much damage it will deal to the opponent's active monster.`,
    types: ['MONSTER_ACTION_ATTACK'], 
    description: 'attack',
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
    text: `TODO`,
    types: [], 
    description: 'todo2',
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
    text: `When an action has draw card slots, you draw that many cards, even if the monster was KO'd this turn.`,
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
    text: `When a switch action occurs, you are given a choice to heal your active monster 2HP or remove all of that monster's status effects. Then the monster you selected switches in, its switch in ability is resolved, if it has one.`,
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
]