import { Injectable } from '@angular/core';
import { GameState, GameStateService } from '../game-state/game-state.service';
import { PlayerType } from '../../logic/player-type.mode';
import { GameStateUtil } from '../game-state/game-state.util';
import { ApplyStatPipsCommand } from '../../logic/commands/stat-pip-commands.model';
import { CardByKeyUtil } from '../../logic/util/card-by-key.util';
import { ApplyBuffCommand } from '../../logic/commands/buff-command.model';
import { StandardAction } from '../../models/standard-action/standard-action.model';
import { SeedableRngService } from '../seedable-rng/seedable-rng.service';
import { UpdateGameStateService } from '../update-game-state/update-game-state.service';
import { DrawCommand } from '../../logic/commands/hand-commands.model';
import { EventCommandQueueService } from '../event-command-queue/event-command-queue.service';
import { ApplyBuffsGamePhaseCommand, ApplyPipsGamePhaseCommand, EndGamePhaseCommand, GamePhaseCommandType, MonsterActionsGamePhaseCommand, RevealGamePhaseCommand, SelectionGamePhaseCommand, StandardActionsGamePhaseCommand, SwitchActionsGamePhaseCommand } from '../../logic/commands/game-phase-commands.model';
import { UpdateGameStateUtil } from '../update-game-state/update-game-state.util';

@Injectable({
  providedIn: 'root'
})
export class GamePhaseService {

  constructor(
    private gameStateService: GameStateService,
    private rng: SeedableRngService,
    private ugss: UpdateGameStateService,
    private eqcs: EventCommandQueueService,
  ) { }

  public testActionPhase() {
    const gs: GameState = this.gameStateService.getGameState();
    gs.p.selectedAction.action = new StandardAction('PREPARE', []);
    gs.o.selectedAction.action = new StandardAction('PREPARE', []);
    this.processActionPhase();
  }

  public startGame() {
    // UpdateGameStateUtil.setPhase('START_PHASE', this.ugss);
    this.ugss.enqueue(new SelectionGamePhaseCommand(this.ugss, { key: 'phase', player: 'P' }));
  }

  private processActionPhase() {
    this.ugss.enqueue(new RevealGamePhaseCommand(this.ugss, { key: 'phase', player: 'P' }));
    const gs: GameState = this.gameStateService.getGameState();

    // determine initiative player
    const initiative: number = gs.p.activeMonster.initiative;
    const oInitiative: number = gs.p.activeMonster.initiative;
    const playerWithInitiative: PlayerType = this.getInitiativePlayer(initiative, oInitiative);
    const playerWithoutInitiative: PlayerType = GameStateUtil.getOppositePlayer(playerWithInitiative);

    this.ugss.enqueue(new ApplyPipsGamePhaseCommand(this.ugss, { key: 'phase', player: 'P' }));

    // initiative determines order
    this.applyStatPips(gs, playerWithInitiative);
    this.applyStatPips(gs, playerWithoutInitiative);

    this.ugss.enqueue(new ApplyBuffsGamePhaseCommand(this.ugss, { key: 'phase', player: 'P' }));

    // initiative determines order
    this.applyBuffs(gs, playerWithInitiative);
    this.applyBuffs(gs, playerWithoutInitiative);

    this.ugss.enqueue(new SwitchActionsGamePhaseCommand(this.ugss, { key: 'phase', player: 'P' }));

    // initiative determines order
    this.performSwitchAction(gs, playerWithInitiative);
    this.performSwitchAction(gs, playerWithoutInitiative);

    // determine faster player
    const fasterPlayer = GameStateUtil.getFirstPlayer(gs, 'P');
    const slowerPlayer = GameStateUtil.getOppositePlayer(fasterPlayer);

    this.ugss.enqueue(new MonsterActionsGamePhaseCommand(this.ugss, { key: 'phase', player: 'P' }));

    // speed determines order
    this.performMonsterAction(gs, fasterPlayer);
    this.performMonsterAction(gs, slowerPlayer);

    this.ugss.enqueue(new StandardActionsGamePhaseCommand(this.ugss, { key: 'phase', player: 'P' }));

    // initiative determines order
    this.performStandardAction(gs, playerWithInitiative);
    this.performStandardAction(gs, playerWithoutInitiative);

    this.ugss.enqueue(new EndGamePhaseCommand(this.ugss, { key: 'phase', player: 'P' }));

    this.playerCleanup(gs, playerWithInitiative);
    this.playerCleanup(gs, playerWithoutInitiative);

    this.ugss.enqueue(new SelectionGamePhaseCommand(this.ugss, { key: 'phase', player: 'P' }));

  }


  private getInitiativePlayer(initiative: number, oInitiative: number): PlayerType {
    if (initiative === oInitiative) {
      return this.rng.getRandomPlayer();
    }
    return initiative > oInitiative ? 'P' : 'O';
  }

  private applyStatPips(gs: GameState, player: PlayerType) {
    const playerState = GameStateUtil.getPlayerState(gs, player);
    const section = playerState.selectedAction.statBoardSection;
    if (section) {
      this.ugss.enqueue(
        new ApplyStatPipsCommand(this.ugss, { key: 'pip', amount: section.current, player, statType: section.type })
      );
    }
  }

  private applyBuffs(gs: GameState, player: PlayerType) {
    const appliedBuffs = GameStateUtil.getPlayerState(gs, player).selectedAction.appliedBuffs;
    if (!!appliedBuffs.length) return;

    appliedBuffs.forEach(buff => {
      this.ugss.enqueue(
        new ApplyBuffCommand(this.ugss, { key: buff.key(), player, buffName: buff.name, monsterName: buff.monsterName })
      )
      CardByKeyUtil.getCardByKey(buff.key(), player, this.ugss, gs);
    })
  }

  private performSwitchAction(gs: GameState, player: PlayerType) {
    const playerState = GameStateUtil.getPlayerState(gs, player);
    if (playerState.selectedAction.action?.getSelectableActionType() !== 'SWITCH') {
      return;
    }
    // switch out dialog command
    // switch out command
    // switch in command
  }

  private performMonsterAction(gs: GameState, player: PlayerType) {
    const playerState = GameStateUtil.getPlayerState(gs, player);
    const opponentState = GameStateUtil.getPlayerState(gs, GameStateUtil.getOppositePlayer(player));

  }

  private performStandardAction(gs: GameState, player: PlayerType) {
    const playerState = GameStateUtil.getPlayerState(gs, player);
    if (playerState.selectedAction.action?.getSelectableActionType() !== 'STANDARD') return;

    CardByKeyUtil.getCardByKey(playerState.selectedAction.action?.key(), player, this.ugss, gs);
  }

  private playerCleanup(gs: GameState, player: PlayerType) {
    // move buffs and discards
    const playerState = GameStateUtil.getPlayerState(gs, player);
    playerState.playerCardManager.discardPile.addMultiple(playerState.selectedAction.appliedBuffs);
    playerState.playerCardManager.discardPile.addMultiple(playerState.selectedAction.appliedDiscards);
    playerState.selectedAction.clear();

    // handle team aura
    // cleanup triggers
    // cleanup modifiers
    playerState.activeMonster.modifiers.eotClear();
    playerState.activeMonster.actions.forEach(action => {
      action.modifiers.eotClear();
    });
    // draw card(s)
    this.ugss.enqueue(
      new DrawCommand(this.ugss, { key: 'eot', player })
    );
  }

  private phaseEvent(type: GamePhaseCommandType) {
    switch(type) {
      case 'START_PHASE':
        
    }
  }

}
