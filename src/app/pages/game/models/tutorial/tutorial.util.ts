import { TutorialSection } from "./tutorial.model";

export const TutorialSections: TutorialSection[] = [
  {
    index: 1,
    text: `Hey there! My name's Professor Holt, a giga-chad Catholic and the world's leading expert on all things Switchems. I'll teach you everything you'll need to know to play.`,
  },
  {
    index: 2,
    text: `Going forward, I will highlight relevant information by making them "pulse" on your screen, so please take notice!`,
  },
  {
    index: 3,
    text: `The first player to knockout (KO) their opponent's three monsters wins. A monster is knocked out when their health points (HP) are reduced to zero.`,
    types: ['HP'],
  },
  {
    index: 4,
    text: `Throughout a game of Switchems, you and your opponent will choose one action secretly on your turn. Once both players have selected actions, they are resolved in a specific order (which will be explained later). Then a new turn starts!`,
  },
  {
    index: 5,
    text: `The world of Switchems has a seemingly unlimited number of monsters - and as such, they're all capable of very unique things!`,
  },
  {
    index: 6, 
    text: `Each monster has their own starting HP. It's important to try to keep your monsters alive for as long as possible!`,
    types: ['HP'],
  },
  {
    index: 7, 
    text: `Each monster has their own initiative value. I'll explain this in more detail later.`,
    types: ['INITIATIVE'],
  },
  {
    index: 8, 
    text: `Each monster has its own weaknesses and resistances based on the monster's element(s).`,
    types: ['WEAKNESSES', 'RESISTANCES'],
  },
]