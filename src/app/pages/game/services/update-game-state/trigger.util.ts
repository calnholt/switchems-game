import { CommandData, EventCommand } from "../../logic/commands/event-command.model";
import { MonsterLogic } from "../../logic/monsters/monster-logic.model";
import { GameStateUtil } from "../game-state/game-state.util";
import { PlayerType } from "../../logic/player-type.mode";
import { GameState } from "../game-state/game-state.service";

export const TriggerUtil = {
  checkEndOfTurnTrigger,
  checkEndOfTurnStatusEffectTrigger,
  checkMonsterActionTrigger,
  checkBasicTrigger,
}

function checkEndOfTurnTrigger(
  monster: MonsterLogic, 
  command: EventCommand<CommandData>, 
  trigger: EventCommand<CommandData>
) {
  const { gs, monsterKey, player } = monster;
  const { activeMonster } = GameStateUtil.getPlayerState(gs.getFreshGameState(), player);
  const isEndPhase = command.type === 'END_PHASE';
  const isActiveMonsterMatch = monsterKey === activeMonster.key();
  const isPlayerMatch = player === trigger.data.player;
  return isEndPhase && isActiveMonsterMatch && isPlayerMatch;
}

function checkEndOfTurnStatusEffectTrigger(
  gs: GameState,
  player: PlayerType,
  command: EventCommand<CommandData>, 
  trigger: EventCommand<CommandData>
) {
  const { activeMonster } = GameStateUtil.getPlayerState(gs.getFreshGameState(), player);
  const isEndPhase = command.type === 'END_PHASE';
  const isTarget = trigger.data.targetMonster === activeMonster.key();
  const isPlayerMatch = player === trigger.data.player;
  return isEndPhase && isTarget && isPlayerMatch;
}

function checkMonsterActionTrigger(
  command: EventCommand<CommandData>, 
  trigger: EventCommand<CommandData>
) {
  const isKeyMatch = command.data.key === trigger.data.key;
  const isPlayerMatch = trigger.data.player === command.data.player;
  return isKeyMatch && isPlayerMatch;
}

function checkBasicTrigger(
  command: EventCommand<CommandData>, 
  trigger: EventCommand<CommandData>
) {
  const isPlayerMatch = trigger.data.player === command.data.player;
  return isPlayerMatch;
}