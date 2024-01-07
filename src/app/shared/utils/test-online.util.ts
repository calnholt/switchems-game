import { MonsterSelection } from "~/app/pages/select-monsters/services/monster-selection.service";
import { CardCompositeKey } from "../interfaces/ICompositeKey.interface";

export const TestOnlineUtil = {
  getPlayerSelections,
};

function getPlayerSelections(keys: CardCompositeKey[]): MonsterSelection[] {
  return [
    {
      key: keys[0],
      isOnTeam: true,
      isLead: true,
    },
    {
      key: keys[1],
      isOnTeam: true,
      isLead: false,
    },
    {
      key: keys[2],
      isOnTeam: true,
      isLead: false,
    },
  ]
}