import { CardCompositeKey } from "~/app/shared/interfaces/ICompositeKey.interface";
import { UpdateGameStateService } from "../../services/update-game-state/update-game-state.service";
import { PlayerType } from "../player-type.mode";
import { GameState } from "../../services/game-state/game-state.service";
import { DescriptiveMessageCommand } from "../commands/message-command.model";
import { CommandUtil } from "../../services/update-game-state/command.util";

export const StandardActions = {
  rest,
  prepare,
};

function rest(key: CardCompositeKey, player: PlayerType, receiver: UpdateGameStateService, gs: GameState) {
  const values = { key, player };
  const numberOfCardsDrawn = CommandUtil.draw(gs, { ...values, amount: 2, gs }, receiver);
  const hpHealed = CommandUtil.heal(gs, { ...values, amount: 1, gs, skip: true}, receiver);
  let message = `${gs.activePlayerType === player ? 'You' : 'The opponent'} rested, `;
  if (numberOfCardsDrawn > 0) {
    message += ` drawing ${numberOfCardsDrawn} card${numberOfCardsDrawn > 1 ? 's' : ''}`
  }
  if (hpHealed > 0) {
    message += ` ${hpHealed > 0 ? 'and ' : ''}healing 1[HP]`;
  }
  message += '.';
  new DescriptiveMessageCommand(receiver, { ...values, message, gs }).pushFront();
}
function prepare(key: CardCompositeKey, player: PlayerType, receiver: UpdateGameStateService, gs: GameState) {
  const values = { key, player };
  const numberOfCardsDrawn = CommandUtil.draw(gs, { ...values, amount: 1, gs}, receiver);
  const randomPipsGained = CommandUtil.gainRandomStatPip(gs, { ...values, amount: 3, display: false, gs}, receiver);
  let message = `${gs.activePlayerType === player ? 'You' : 'The opponent'} prepared,${randomPipsGained.message}`;
  if (numberOfCardsDrawn) {
    message += ` and drew one card`
  }
  message += '.';
  new DescriptiveMessageCommand(receiver, { ...values, message, gs }).pushFront();
}