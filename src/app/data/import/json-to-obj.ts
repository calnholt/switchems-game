import { default as Stalagrowth } from '../monsters/Stalagrowth.json';
import { default as Chargroar } from '../monsters/Chargroar.json';
import { default as Flexferno } from '../monsters/Flexferno.json';
import { default as Zappguin } from '../monsters/Zappguin.json';
import { default as Phantomaton } from '../monsters/Phantomaton.json';
import { default as Galeaffy } from '../monsters/Galeaffy.json';
import { default as Drownigator } from '../monsters/Drownigator.json';
import { default as Vulturock } from '../monsters/Vulturock.json';
import { default as Willard } from '../monsters/Willard.json';
import { MonsterAction } from '~/app/pages/game/models/monster/action.model';
import { Buff } from '~/app/pages/game/models/monster/buff.model';
import { MonsterActionCardIcons } from '~/app/pages/game/models/monster/monster-action-card-icons.model';
import { Monster } from '~/app/pages/game/models/monster/monster-action.model';

export const loadMonsters = (selectedMonster?: any): Array<Monster> => {
  if (selectedMonster) {
    return convertFromJSON([selectedMonster]);
  }
  return convertFromJSON([
    Chargroar,
    Drownigator,
    Flexferno,
    Galeaffy,
    Stalagrowth,
    Phantomaton,
    Vulturock,
    Willard,
    Zappguin,
  ]);
};


export const convertFromJSON = (all: Array<any>): Array<Monster> => {
  return [...all].map(json => {
    return new Monster(
      json.name,
      json.elements,
      json.switchIn,
      json.passive,
      json.hp,
      json.initiative,
      json.actions.map(getMonsterAction),
      json.buffs.map((b: any) => getBuff(json.name, b)),
    );
  });
}

const getMonsterAction = (action: any): MonsterAction => {
  return new MonsterAction(
    action.name,
    action.text,
    action.attack,
    action.speed,
    action.element,
    getMonsterActionCardIcon(action),
    0,
    action.statusFlg
  );
}

const getMonsterActionCardIcon = (action: any): MonsterActionCardIcons => {
  return new MonsterActionCardIcons(
    action.buff,
    action.discard,
    action.draw
  );
}

const getBuff = (monsterName: string, buff: any): Buff => {
  return new Buff(
    monsterName,
    buff.buffName,
    buff.buffText,
    buff.auraDuration
  );
}
