import { CardCompositeKey } from "~/app/shared/interfaces/ICompositeKey.interface";
import { UpdateGameStateService } from "../../services/update-game-state/update-game-state.service";
import { PlayerType } from "../player-type.mode";
import { HealCommand } from "../commands/stat-modification-command.model";
import { DrawCommand } from "../commands/hand-commands.model";
import { GainRandomStatPipCommand } from "../commands/stat-pip-commands.model";
import { GameState } from "../../services/game-state/game-state.service";
import { GameStateUtil } from "../../services/game-state/game-state.util";

export const StandardActions = {
  rest,
  prepare,
};

function rest(key: CardCompositeKey, player: PlayerType, receiver: UpdateGameStateService, gs: GameState) {
  const values = { key, player };
  receiver.enqueue(new DrawCommand(receiver, values));
  receiver.enqueue(new DrawCommand(receiver, { key, player }));
  receiver.enqueue(new HealCommand(receiver, { key, player, amount: 1, monsterName: GameStateUtil.getMonsterByPlayer(gs, player).name, origin: 'Rest' }));
}
function prepare(key: CardCompositeKey, player: PlayerType, receiver: UpdateGameStateService, gs: GameState) {
  receiver.enqueue(new DrawCommand(receiver, { key, player }));
  receiver.enqueue(new GainRandomStatPipCommand(receiver, { key, player, amount: 3, monsterName: GameStateUtil.getMonsterByPlayer(gs, player).name, origin, skipMessage: true }));
}