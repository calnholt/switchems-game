export interface TutorialSection {
  text: string;
  description: string;
  types?: TutorialSectionType[];
  isStart?: boolean;
  isEnd?: boolean;
  isTop?: boolean;
  isGuidedTutorial?: boolean;
  startGuidedTutorial?: boolean;
};

export type TutorialSectionType = 
  | 'HP'
  | 'INITIATIVE'
  | 'WEAKNESSES'
  | 'RESISTANCES'
  | 'MONSTER'
  | 'MONSTER_ACTION'
  | 'MONSTER_ACTION_ATTACK'
  | 'MONSTER_ACTION_STATUS'
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
  | 'BUFF'
  | 'BUFF_TEXT'
  | 'BUFF_MONSTER'
  | 'BENCHED_MONSTER'
  | 'OPPONENT_HAND'
  | 'DEUSVOLT_A3'