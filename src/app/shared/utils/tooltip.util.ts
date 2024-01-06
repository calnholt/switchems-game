import { SimpleTooltip } from "../components/simple-tooltip/simple-tooltip.component";

export const TooltipUtil = {
  getSimpleTooltip,
}

function getSimpleTooltip(type: SimpleTooltipType): SimpleTooltip {
  switch (type) {
    case 'INITIATIVE':
      return new SimpleTooltip(
        `Denotes a monster's initiative value. If two monsters have the same speed value, the monster with the higher initiative acts first.`,
      );
    case 'OPPONENT_HAND':
      return new SimpleTooltip(
        `Denotes the number of cards in your opponent's hand.`,
      );
    case 'WEAKNESSES':
      return new SimpleTooltip(
        `Denotes the elements this monster is weak against.`,
      );
    case 'RESISTANCES':
      return new SimpleTooltip(
        `Denotes the elements this monster resists.`,
      );
    case 'VIEW_MONSTER_ACTIONS':
      return new SimpleTooltip(
        `Click to view this monster's actions.`,
      );
    case 'VIEW_MONSTER_ACTIONS_RIGHT':
      return new SimpleTooltip(
        `Click to view this monster's actions.`,
        'RIGHT'
      );
    case 'CURRENTLY_VIEWING_ACTIVE_MONSTER':
      return new SimpleTooltip(
        `You are viewing this monster's actions.`,
      );
    case 'CURRENTLY_VIEWING_MONSTER':
      return new SimpleTooltip(
        `You are viewing this monster's actions. (Click to toggle back to your active monster)`,
      );
    case 'CURRENTLY_VIEWING_MONSTER_RIGHT':
      return new SimpleTooltip(
        `You are viewing this monster's actions. (Click to toggle back to your active monster)`,
        'RIGHT'
      );
    case 'GIGACHAD':
      return new SimpleTooltip(
        `You really think you can beat me?`,
        'BELOW'
      );
    default:
      return new SimpleTooltip('');
  }
}

export type SimpleTooltipType =
  | 'RESISTANCES'
  | 'WEAKNESSES'
  | 'INITIATIVE'
  | 'OPPONENT_HAND'
  | 'VIEW_MONSTER_ACTIONS'
  | 'VIEW_MONSTER_ACTIONS_RIGHT'
  | 'CURRENTLY_VIEWING_MONSTER'
  | 'CURRENTLY_VIEWING_MONSTER_RIGHT'
  | 'CURRENTLY_VIEWING_ACTIVE_MONSTER'
  | 'GIGACHAD'