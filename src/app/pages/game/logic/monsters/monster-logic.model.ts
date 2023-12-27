import { CardCompositeKey } from "~/app/shared/interfaces/ICompositeKey.interface";
import { GameState } from "../../services/game-state/game-state.service";
import { GameStateUtil } from "../../services/game-state/game-state.util";
import { PlayerType } from "../player-type.mode";
import { UpdateGameStateService } from "../../services/update-game-state/update-game-state.service";
import { CommandData } from "../commands/event-command.model";

export abstract class MonsterLogic {
  monsterKey: string;
  cardKey: string;
  player: PlayerType;

  gs: GameState;
  rc: UpdateGameStateService;

  protected key: CardCompositeKey;
  protected data: CommandData;
  protected monsterNames: { monsterName: string, opponentMonsterName: string };

  constructor(monsterKey: string, cardKey: string, player: PlayerType, gs: GameState, rc: UpdateGameStateService) {
    this.monsterKey = monsterKey;
    this.cardKey = cardKey;
    this.player = player;
    this.gs = gs;
    this.monsterNames = GameStateUtil.getMonsterNames(gs, player);
    this.rc = rc;
    this.key = `${monsterKey}_${cardKey}`;
    this.data = { key: this.key, player, ...this.monsterNames };
  }

  executeMonsterCard(key: CardCompositeKey) {
    if (key === this.monsterKey) {
      this.switchIn();
      this.addTriggers();
    }
    if (this.cardKey.includes('A1')) {
      this.action1();
    }
    if (this.cardKey.includes('A2')) {
      this.action2();
    }
    if (this.cardKey.includes('A3')) {
      this.action3();
    }
    if (this.cardKey.includes('A4')) {
      this.action4();
    }
    if (this.cardKey.includes('B1')) {
      this.buff1();
    }
    if (this.cardKey.includes('B2')) {
      this.buff2();
    }
    if (this.cardKey.includes('B3')) {
      this.buff3();
    }
    if (this.cardKey.includes('B4')) {
      this.buff4();
    }
  }
  
  abstract addTriggers(): void;
  abstract switchIn(): void;
  abstract action1(): void;
  abstract action2(): void;
  abstract action3(): void;
  abstract action4(): void;
  abstract buff1(): void;
  abstract buff2(): void;
  abstract buff3(): void;
  abstract buff4(): void;
}