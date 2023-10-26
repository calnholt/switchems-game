import { default as Stalagrowth } from '../monsters/Stalagrowth.json';
import { default as Chargroar } from '../monsters/Chargroar.json';
import { default as Flexferno } from '../monsters/Flexferno.json';
import { default as Zappguin } from '../monsters/Zappguin.json';
import { default as Phantomaton } from '../monsters/Phantomaton.json';
import { default as Galeaffy } from '../monsters/Galeaffy.json';
import { default as Drownigator } from '../monsters/Drownigator.json';
import { default as Vulturock } from '../monsters/Vulturock.json';
import { default as Willard } from '../monsters/Willard.json';
import { ElemType, ELEMENTS } from 'src/app/shared/types/dataTypes';
import { Monster, MonsterAction, MonsterActionCardIcons } from 'src/app/pages/game/models/monster/monster.model';

const getElemType = (text: string): ElemType => {
  return ELEMENTS.find(e => e.toString() as ElemType === text) as ElemType;
};

export const loadMonsters = (selectedMonster?: any): Array<Monster> => {
  let ALL = [];
  if (selectedMonster) {
    ALL = [selectedMonster];
  } else {
    ALL = [
      Chargroar,
      Drownigator,
      Flexferno,
      Galeaffy,
      Stalagrowth,
      Phantomaton,
      Vulturock,
      Willard,
      Zappguin,
    ];
  }
  return convertFromJSON(ALL);
};

export const convertFromJSON = (all: Array<any>): Array<Monster> => {
  let out = new Array<Monster>();
  all.forEach(json => {
    const monster: Monster = new Monster(
      json.name,
      json.elements,
      json.text,
      json.hp,
      json.initiative,
      json.actions.map(getMonsterAction),
    );
    // monster.buffs = new Array<Buff>();
    // const BUFFS = 4;
    // let BUFF_PROPERTIES = [
    //     'buffText',
    //     'buffName',
    //     'auraDuration',
    //     'lastUpdated',
    // ];
    // if (keepGUI) {
    //     BUFF_PROPERTIES = BUFF_PROPERTIES.concat(
    //         'isSelected',
    //     )
    // }
    // for (let i = 0; i < BUFFS; i++) {
    //     const buff = new Buff();
    //     BUFF_PROPERTIES.forEach(p => buff[p] = json.buffs[i][p]);
    //     buff.monsterName = monster.monsterName;
    //     monster.buffs.push(buff);
    // }
    // out = out.sort((a, b) => {
    //     if (a.monsterName > b.monsterName) {return 1; }
    //     if (a.monsterName < b.monsterName) {return -1; }
    //     return 0;
    // });
    out.push(monster);
  });
  return out;
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
