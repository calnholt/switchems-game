import { Term, TypeChart, Image } from "./data";

export const ELEMENTS = [`Fire`, `Water`, `Rock`, `Leaf`, `Electric`, `Death`] as const;
export type ElemType = typeof ELEMENTS[number];

export const BUFF_TIMINGS = [`Pre-Actions`, `With Attack`, `Post Actions`];
export type BuffTiming = typeof BUFF_TIMINGS[number];

const typeChart = new Array;
ELEMENTS.forEach(e => typeChart.push(new TypeChart(e)));
export const TYPE_CHART = typeChart;

export const PLAYER_BOARD_TEXT: string[] = [
    'Buffs',
    'Discards',
    'Hand<br><div class="sub-text">(facedown)</div>'
];

export type Url = string;
export type Path = string;
export type Css = string;
export type ImageFile = string;

export type CardTypes = `MONSTER` | `ACTION` | `BUFF` | 'EXTRA';

export const ARENAS = ['fall', 'frozen', 'moon', 'jungle', 'volcano'] as const;
export type ArenaType = typeof ARENAS[number]; 

export const ICON_PATH: Path = `./assets/images`;
export const BACKGROUNDS_PATH = ICON_PATH + `/backgrounds/`;
export const SYMBOLS_PATH: Path = ICON_PATH + `/symbols/`;
export const MONSTERS_PATH: Path = ICON_PATH + `/monsters/`;
export const AVATARS_PATH: Path = ICON_PATH + `/avatars/`;
export const ELEMENT_PATH_COLOR: Path = ICON_PATH + `/elements/color/`;
export const ELEMENT_PATH_GRAY: Path = ICON_PATH + `/elements/gray/`;
export const HP_PATH: Path = SYMBOLS_PATH + `/hp/`;
export const ROLE_PATH: Path = ICON_PATH + `/roles/`;
export const SVG_PATH: Path = ICON_PATH + `/svg/`;

export const MODIFIER_OPTIONS_POS = [0, 1, 2, 3, 4, 5];
export const MODIFIER_OPTIONS_NEG = [0, -1, -2, -3, -4, -5, `X`];

export type TermCodeValue = string;

// best method I could think of with the least redundancy while maintaining strong typing
export const TERM_KEYS = [`~WOUND~`, `~FLINCH~`, `~DRAIN~`, `~FATIGUE~`,
    `~STATUS~`, `~SINGLE~`, `~STUN~`, `~RECOIL~`, `~SWITCH~`, `~SUPER~`, `~FASTER~`, `~SLOWER~`,
    `~GOOP~`, `~EXHAUST~`, '~PIERCE~', `~RESIST~`, `~EFFECTIVE~`, `~BELONGS~`, `~SPAM~`, `~AURA~`, `~STRENGTHEN~`, `~FRAIL~`, '~CAPTURE~', '~CRUSH~', `~CURSE~`] as const;
export type TermCode = typeof TERM_KEYS[number];
const termCodes = [
    new Term('Belongs', `~BELONGS~`, `A buff card <u>belongs</u> to a monster if the monster name on the bottom of the buff card matches.`),
    new Term('Curse', '~CURSE~', 'At the end of the turn, there is a 33% chance this monster will lose 1[HP].'),
    new Term('Drain', `~DRAIN~`, `At the end of the turn, there is a 50% chance this monster will lose <span>1[HP]</span> and the enemy monster will heal <span>1[HP].</span>`),
    new Term('Weak', `~EFFECTIVE~`, `Monsters are <u>weak</u> to elements in the [WEAK] section of their monster card.`),
    new Term('Exhaust', `~EXHAUST~`, `Cards with <u>exhaust</u> are removed from the game after they are resolved. Put a blank into your discard.`),
    new Term('Faster', `~FASTER~`, `This action is <u>faster</u> if your opponent selects a standard action, or if both players select a monster action and yours resolves first.`),
    new Term('Fatigue', `~FATIGUE~`, `Whenever a monster with <u>fatigue</u> [STATUS] attacks, the attack gains <span><u>recoil X[ATK]</u></span>, where X is the number of buff slots used.`),
    new Term('Flinch', `~FLINCH~`, `Actions with <u>flinch</u> prevent the enemy monster's attack action if this action is <u>faster.</u>`),
    new Term('Pierce', '~PIERCE~', `Attacks with <u>pierce</u> ignore this amount of the enemy monster's <div>[DEF].</div> Multiple instances of pierce stack.`),
    new Term('Recoil', `~RECOIL~`, `This monster suffers this amount of <u>recoil</u> damage to itself after the attack resolves. Multiple instances of recoil stack.`),
    new Term('Resistant', `~RESIST~`, `Monsters are <u>resistant</u> to elements in the [RESIST] section of their monster card.`),
    new Term('Single Use', `~SINGLE~`, `<u>Single use</u> actions remain disabled until switched out, as denoted by [SINGLE].`),
    new Term('Slower', `~SLOWER~`, `This action is <u>slower</u> if your opponent selects a switch action, or if both players select a monster action and yours resolves second.`),
    new Term('Spammable', `~SPAM~`, `<u>Spammable</u> actions do not become disabled.`),
    new Term('Status Condition', `~STATUS~`, `<u>Status conditions</u> [STATUS] are negative conditions that are applied to a monster. These can be removed by performing a switch action.`),
    new Term('Stun', `~STUN~`, `Monsters with <u>stun</u> [STATUS] perform their switch actions after monster actions.`),
    new Term('Super', `~SUPER~`, `<u>Supers</u> require and use two [B] slots.`),
    new Term('Switches In', `~SWITCH~`, `<u>Switch in</u> abilities also trigger at the start of the game and following a monster KO.`),
    new Term('Team Aura', '~AURA~', '<u>Team aura</u> [TA] – At the end of your turn, put a time counter on this. If the number of time counters equals its duration, discard this. You can only have one active <u>team aura</u> at any time.'),
    new Term('Wound', `~WOUND~`, `Monsters with <u>wound</u> [STATUS] perform one less <div>{\"stat\": \"?\", \"num\": 1}</div> on all of their attacks.`),
    new Term('Crush', '~CRUSH~', '<u>Crush X</u> - Remove X [PQ] of the same type of your choice from your opponent.'),
];
export const TERM_CODES = termCodes.sort((a, b) => a.name.localeCompare(b.name));


const IMAGE_KEYS = [`[ATK]`, `[+]`, `[B]`, `[-]`, `[DEF]`, `[TA]`,
    `[SPD]`, `[F]`, `[W]`, `[L]`, `[R]`, `[E]`, `[S]`, `[ST]`, `[REAC]`, `[HP]`, '[CUBE]', '[NQ]', '[PQ]', '[ARROW]',
    '[SPECIAL]', '[STATUS]', '[COUNTER]', '[MQ]', '[ACORN]', '[HONEY]', '[WISH]', '[TORMENT]', '[FLIP]', '[DISABLE]', '[SINGLE]', '[HOLLOW]',
    '[SR]', '[SL]', '[RESIST]', '[WEAK]', '[STR]', '[FRAIL]', '[GOOP]', `[Q]`, `[SUPER-EFFECTIVE]`, `[BDG]`
] as const;
export type ImageCode = typeof IMAGE_KEYS[number];
export const IMAGE_CODES = [
    new Image(`[ATK]`, SYMBOLS_PATH + `attack.png`),
    new Image(`[+]`, SYMBOLS_PATH + `draw.png`),
    new Image(`[B]`, SYMBOLS_PATH + `buff.png`),
    new Image(`[-]`, SYMBOLS_PATH + `discard.png`),
    new Image(`[DEF]`, SYMBOLS_PATH + `defense.png`),
    new Image(`[TA]`, SYMBOLS_PATH + `aura.png`),
    new Image(`[SPD]`, SYMBOLS_PATH + `speed.png`),
    new Image(`[F]`, ELEMENT_PATH_COLOR + `fire.png`),
    new Image(`[W]`, ELEMENT_PATH_COLOR + `water.png`),
    new Image(`[L]`, ELEMENT_PATH_COLOR + `leaf.png`),
    new Image(`[R]`, ELEMENT_PATH_COLOR + `rock.png`),
    new Image(`[E]`, ELEMENT_PATH_COLOR + `electric.png`),
    new Image(`[S]`, ELEMENT_PATH_COLOR + `death.png`),
    new Image(`[ST]`, SYMBOLS_PATH + `status.png`),
    new Image(`[HP]`, SYMBOLS_PATH + `heart.png`),
    new Image(`[CUBE]`, SYMBOLS_PATH + `cube.png`),
    new Image(`[PQ]`, SYMBOLS_PATH + `green-cube.png`),
    new Image(`[MQ]`, SYMBOLS_PATH + `blue-cube.png`),
    new Image(`[SPECIAL]`, SYMBOLS_PATH + `status.png`),
    new Image(`[STATUS]`, SYMBOLS_PATH + `wound.png`),
    new Image(`[FLIP]`, SYMBOLS_PATH + `flip.png`),
    new Image(`[DISABLE]`, SYMBOLS_PATH + `lock.png`),
    new Image(`[SINGLE]`, SYMBOLS_PATH + `single-use.png`),
    new Image(`[SR]`, SYMBOLS_PATH + `switch-right.png`),
    new Image(`[SL]`, SYMBOLS_PATH + `switch-left.png`),
    new Image(`[RESIST]`, SYMBOLS_PATH + `switch-defense-right.png`),
    new Image(`[WEAK]`, SYMBOLS_PATH + `effective.png`),
    new Image(`[SUPER-EFFECTIVE]`, SYMBOLS_PATH + `super-effective.png`),
    new Image(`[GOOP]`, SYMBOLS_PATH + `goop.png`),
    new Image(`[HOLLOW]`, SYMBOLS_PATH + `hollow.png`),
    new Image(`[ARROW]`, SYMBOLS_PATH + `sideswipe.png`),
    new Image(`[BDG]`, SYMBOLS_PATH + `badge.png`),
];

//TODO: this should return an object with two properties: advElems and DisElems that are arrays of elemtypes
export const getAdvantages = (elem: ElemType): number[] => {
    // fire, water, rock, leaf, elec, death
    // -1 means the monster takes MORE damage
    // 1 means resistance
    if (elem === 'Death') { return [0, -1, 1, 1, -1, 0]; }
    if (elem === 'Electric') { return [-1, 1, -1, 0, 0, 1]; }
    if (elem === 'Fire') { return [0, -1, -1, 1, 1, 0]; }
    if (elem === 'Water') { return [1, 0, 0, -1, -1, 1]; }
    if (elem === 'Leaf') { return [-1, 1, 1, 0, 0, -1]; }
    if (elem === 'Rock') { return [1, 0, 0, -1, 1, -1]; }
    return [];
};

export const getElementIndex = (elem: ElemType): number => {
    if (elem === 'Death') {
        return 5;
    }
    if (elem === 'Electric') {
        return 4;
    }
    if (elem === 'Leaf') {
        return 3;
    }
    if (elem === 'Rock') {
        return 2;
    }
    if (elem === 'Water') {
        return 1;
    }
    return 0;
};
