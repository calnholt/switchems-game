export interface TutorialSection {
  text: string;
  index: number;
  isEnd?: boolean;
  types?: TutorialSectionType[];
};

export type TutorialSectionType = 
  | 'HP'
  | 'INITIATIVE'
  | 'WEAKNESSES'
  | 'RESISTANCES'
  | 'MONSTER_ACTION'
  | 'MONSTER_ACTION_ATTACK'
  | 'MONSTER_ACTION_SPEED'
  | 'MONSTER_ACTION_DISCARD'
  | 'MONSTER_ACTION_DRAW'
  | 'MONSTER_ACTION_BUFF'
  | 'MONSTER_ACTION_ELEMENT'
  | 'MONSTER_ACTION_TEXT'
  | 'PIP_SECTION'
  | 'OPPONENT_HAND'
  | 'SWITCH_ACTIONS'
  | 'STANDARD_ACTIONS'
  | 'HAND'
  | 'BUFF_TEXT'
  | 'BUFF_MONSTER'