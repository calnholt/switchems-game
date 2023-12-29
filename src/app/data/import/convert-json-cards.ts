import { default as Stalagrowth } from '../monsters/Stalagrowth.json';
import { default as Chargroar } from '../monsters/Chargroar.json';
import { default as Flexferno } from '../monsters/Flexferno.json';
import { default as Zappguin } from '../monsters/Zappguin.json';
import { default as Phantomaton } from '../monsters/Phantomaton.json';
import { default as Galeaffy } from '../monsters/Galeaffy.json';
import { default as Drownigator } from '../monsters/Drownigator.json';
import { default as Vulturock } from '../monsters/Vulturock.json';
import { default as Whailstrom } from '../monsters/Whailstrom.json';
import { default as Deusvolt } from '../monsters/Deusvolt.json';
import { default as Volcanoggin } from '../monsters/Volcanoggin.json';
import { default as Sorrospine } from '../monsters/Sorrospine.json';
import { default as Lanternshade } from '../monsters/Lanternshade.json';
import { MonsterAction } from '~/app/pages/game/models/monster/monster-action.model';
import { Buff } from '~/app/pages/game/models/monster/buff.model';
import { Monster } from '~/app/pages/game/models/monster/monster.model';

export const convertJsonToObjs = (selectedMonster?: any): Array<Monster> => {
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
    Whailstrom,
    Zappguin,
    // simple monsters - might require extra handling later?
    Deusvolt,
    Volcanoggin,
    Sorrospine,
    Lanternshade,
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
      json.actions.map((a: any, i: number) => getMonsterAction(json.name, a, i)),
      json.buffs.map((b: any, i: number) => getBuff(json.name, b, i)),
    );
  });
}

const getMonsterAction = (monsterName: string, action: any, i: number): MonsterAction => {
  return new MonsterAction(
    action.name,
    monsterName,
    action.text,
    action.attack,
    action.speed,
    action.element,
    i,
    action.statusFlg,
    action.buff,
    action.discard,
    action.draw,
  );
}

const getBuff = (monsterName: string, buff: any, i: number): Buff => {
  return new Buff(
    monsterName,
    buff.buffName,
    buff.buffText,
    buff.auraDuration,
    i
  );
}
