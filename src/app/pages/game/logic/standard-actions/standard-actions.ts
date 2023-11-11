import { CardCompositeKey } from "~/app/shared/interfaces/ICompositeKey.interface";
import { PlayerType } from "../player-type.mode";
import { HealCommand } from "../commands/stat-modification-command.model";
import { DrawCommand } from "../commands/hand-commands.model";
import { GainRandomStatPipCommand } from "../commands/stat-pip-commands.model";
import { GameState } from "../../services/game-state/game-state.service";
import { GameStateUtil } from "../../services/game-state/game-state.util";
import { EventUpdateMediatorService } from "../../services/event-update-mediator.service";

export const StandardActions = {
  rest,
  prepare,
};

function rest(key: CardCompositeKey, player: PlayerType, receiver: EventUpdateMediatorService, gs: GameState) {
  receiver.pushFront(new DrawCommand({ key, player }));
  receiver.pushFront(new DrawCommand({ key, player }));
  receiver.pushFront(new HealCommand({ key, player, amount: 1, monsterName: GameStateUtil.getMonsterByPlayer(gs, player).name }));
}
function prepare(key: CardCompositeKey, player: PlayerType, receiver: EventUpdateMediatorService, gs: GameState) {
  receiver.pushFront(new DrawCommand( { key, player }));
  receiver.pushFront(new GainRandomStatPipCommand({ key, player, amount: 3, monsterName: GameStateUtil.getMonsterByPlayer(gs, player).name }));
}