import { Component, OnChanges, SimpleChanges } from '@angular/core';
import { Monster } from '../../models/monster/monster.model';
import { StatBoard } from '../../models/stat-board/stat-board.model';
import { PlayerCardManager } from '../../models/player/player-card-manager.model';
import { PlayerService } from '../../services/player/player.service';
import { StandardAction } from '../../models/standard-action/standard-action.model';
import { ImageUtil } from '~/app/shared/utils/image.util';
import { ARENAS, ArenaType } from '~/app/shared/types/dataTypes';
import { BattleAnimationService } from '../../services/battle-animation/battle-animation.service';
import { Modifier, MonsterModifierType } from '../../logic/modifiers/modifier.model';
import { Subscription } from 'rxjs';
import { GameOverService, WinnerType } from '../../services/game-over/game-over.service';
import { SeedableRngService } from '../../services/seedable-rng/seedable-rng.service';
import { TutorialService } from '../../services/tutorial/tutorial.service';
import { TutorialSection } from '../../models/tutorial/tutorial.model';
import { Router } from '@angular/router';
import { SelectedActionService } from '../../services/selected-action/selected-action.service';
import { SelectedAction } from '../../services/selected-action/selected-action.model';
import { CurrentPhaseService } from '../../services/current-phase/current-phase.service';
import { GamePhaseCommandType } from '../../logic/commands/game-phase-commands.model';
import { MonsterAction } from '../../models/monster/monster-action.model';
import { CardCompositeKey } from '~/app/shared/interfaces/ICompositeKey.interface';
import { MonsterViewService } from '../../services/monster-view/monster-view.service';

@Component({
  selector: 'sw-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent {

  playerCardManager!: PlayerCardManager;
  statBoard!: StatBoard;
  activeMonster!: Monster;
  inactiveMonsters: Monster[] = [];
  arena!: ArenaType;
  modifiers: Modifier<MonsterModifierType>[] = [];
  modifiersSub!: Subscription;
  selectedAction!: SelectedAction | null;
  
  oInactiveMonsters: Monster[] = [];
  oActiveMonster!: Monster;
  oStatBoard!: StatBoard;
  oModifiers: Modifier<MonsterModifierType>[] = []
  oModifiersSub!: Subscription;
  oSelectedAction!: SelectedAction | null;

  cardsInMyHand = 0;
  cardsInMyOpponentsHand = 0;

  monsterActionsBeingViewed: MonsterAction[] = [];
  isViewingOpponentActions = false;
  isViewingActiveMonster = false;
  winner: WinnerType = null;

  isTutorial = false;
  hideModifiers = false;
  tutorialSection!: TutorialSection;

  currentPhase!: GamePhaseCommandType;

  constructor(
    private playerService: PlayerService,
    private battleAniService: BattleAnimationService,
    private gameOverService: GameOverService,
    private rng: SeedableRngService,
    private tutorialService: TutorialService,
    private currentPhaseService: CurrentPhaseService,
    private selectedActionService: SelectedActionService,
    private monsterViewService: MonsterViewService,
    private router: Router
  ) { }

  ngOnInit() {
    this.isTutorial = this.router.url === '/tutorial';
    if (this.isTutorial) {
      this.playerService.startTutorial();
    }
    else {
      this.playerService.startGame();
    }
    this.playerService.player.activeMonster$.subscribe((value) => {
      if (this.modifiersSub) {
        this.modifiersSub.unsubscribe();
      }
      this.activeMonster = value;
      this.battleAniService.update(true, 'SWITCHING_IN');
      this.modifiersSub = this.activeMonster.modifiers.modifiers$.subscribe((modifiers) => {
        this.modifiers = modifiers;
      });
      this.monsterActionsBeingViewed = this.activeMonster.actions;
    });
    this.playerService.player.inactiveMonsters$.subscribe((value) => {
      this.inactiveMonsters = value;
    });
    this.playerService.player.playerCardManager$.subscribe((value) => {
      this.playerCardManager = value;
    });
    this.playerService.player.statBoard$.subscribe((value) => {
      this.statBoard = value;
    });

    this.playerService.oPlayer.activeMonster$.subscribe((value) => {
      if (this.oModifiersSub) {
        this.oModifiersSub.unsubscribe();
      }
      this.oActiveMonster = value;
      this.battleAniService.update(false, 'SWITCHING_IN');
      this.oModifiersSub = this.oActiveMonster.modifiers.modifiers$.subscribe((modifiers) => {
        this.oModifiers = modifiers;
      });
    });
    this.playerService.oPlayer.inactiveMonsters$.subscribe((value) => {
      this.oInactiveMonsters = value;
    });
    this.playerService.oPlayer.statBoard$.subscribe((value) => {
      this.oStatBoard = value;
    });

    this.arena = this.getRandomArena();

    this.playerService.playerCardManager.hand$.subscribe((hand) => {
      this.cardsInMyHand = hand.cardsInHand();
    });

    this.playerService.oPlayerCardManager.hand$.subscribe((hand) => {
      this.cardsInMyOpponentsHand = hand.cardsInHand();
    });
    this.gameOverService.winner$.subscribe((value) => {
      this.winner = value;
    });
    this.currentPhaseService.currentPhase$.subscribe((phase) => {
      this.currentPhase = phase;
      this.hideModifiers = ![
        'REVEAL_PHASE', 
        'APPLY_BUFFS_PHASE', 
        'APPLY_PIPS_PHASE', 
        'MONSTER_ACTIONS_PHASE',
        'SWITCH_ACTIONS_PHASE',
        'STANDARD_ACTIONS_PHASE',
      ].includes(phase);
    });
    this.selectedActionService.selectedAction$.subscribe((action) => {
      this.selectedAction = action;
    });
    this.selectedActionService.oSelectedAction$.subscribe((action) => {
      this.oSelectedAction = action;
    });
    if (this.isTutorial) {
      this.tutorialService.startTutorial();
      this.tutorialService.currentSection$.subscribe((value) => {
        this.tutorialSection = value;
        if (value.isEnd) {
          this.isTutorial = false;
          return;
        }
        if (value.startGuidedTutorial) {
          this.currentPhaseService.startGame();
        }
      });
    }
    this.monsterViewService.monsterBeingViewed$.subscribe((value) => {
      this.isViewingOpponentActions = value.player === 'O';
      this.isViewingActiveMonster = value.player === 'P' && this.activeMonster.key() === value.key;
      if (value.player === 'P') {
        this.monsterActionsBeingViewed = (this.inactiveMonsters.concat(this.activeMonster).find(m => m.key() === value.key) as Monster).actions;
      }
      else {
        this.monsterActionsBeingViewed = (this.oInactiveMonsters.concat(this.oActiveMonster).find(m => m.key() === value.key) as Monster).actions;
      }
    })
  }

  getRandomArena(): ArenaType {
    return ARENAS[Math.floor(this.rng.randomFloat() * ARENAS.length)];
  }

}
