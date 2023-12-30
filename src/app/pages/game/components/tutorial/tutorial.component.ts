import { Component, HostListener, Input, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
import { TutorialSection } from '../../models/tutorial/tutorial.model';
import { ImageUtil } from '~/app/shared/utils/image.util';
import { TutorialService } from '../../services/tutorial/tutorial.service';
import { TutorialSections } from '../../models/tutorial/tutorial.util';
import { CurrentPhaseService } from '../../services/current-phase/current-phase.service';

@Component({
  selector: 'sw-tutorial',
  templateUrl: './tutorial.component.html',
  styleUrls: ['./tutorial.component.scss']
})
export class TutorialComponent implements OnChanges {
  @Input() section!: TutorialSection;
  @ViewChild('audio') audioPlayer!: any;

  profHolt = ImageUtil.avatars.profHolt;
  audioSrc = '';
  hide = false;
  playedSections = new Set<string>();
  showPrevious = false;

  constructor(
    private tutorialService: TutorialService,
    private currentPhaseService: CurrentPhaseService,
  ) {

  }

  ngOnInit() {
    this.setAudioSource();
    this.currentPhaseService.currentPhase$.subscribe((value) => {
      if (this.section.isGuidedTutorial) {
        if ([
          'REVEAL_PHASE', 
          'APPLY_BUFFS_PHASE', 
          'APPLY_PIPS_PHASE', 
          'MONSTER_ACTIONS_PHASE',
          'SWITCH_ACTIONS_PHASE',
          'STANDARD_ACTIONS_PHASE',
        ].includes(value)) {
          this.hide = true;
        }
        if (value === 'SELECTION_PHASE' && this.currentPhaseService.currentTurn > 1) {
          this.tutorialService.next();
          this.hide = false;
        }
      }
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (!this.audioPlayer) {
      return;
    }
    if (changes['section']) {
      if (!this.playedSections.has(this.section.description)) {
        this.showPrevious = !this.section.isStart && this.section.description !== 'end' && !this.section.isGuidedTutorial;
        this.play();
      }
    }
  }

  @HostListener('window:keydown.ArrowLeft', ['$event'])
  onArrowLeft(event: KeyboardEvent) {
    this.previousSection();
  }
  @HostListener('window:keydown.ArrowRight', ['$event'])
  onArrowRight(event: KeyboardEvent) {
    this.nextSection();
  }

  setAudioSource() {
    this.audioSrc = `../../../../../assets/audio/tutorial/tutorial-${this.section.description}.wav`;
  }

  ngAfterViewInit() {
    this.play();
  }

  nextSection() {
    if (!this.section.isGuidedTutorial) {
      this.tutorialService.next();
    }
  }

  previousSection() {
    if (!this.section?.isGuidedTutorial && !this.section?.isStart) {
      this.audioPlayer.nativeElement.pause();
      this.tutorialService.previous();
    }
  }

  play() {
    this.playedSections.add(this.section.description);
    this.setAudioSource();
    this.audioPlayer.nativeElement.src = this.audioSrc;
    this.audioPlayer.nativeElement.play();
  }

  private getIndex(): number {
    return TutorialSections.findIndex(t => t.text === this.section.text) + 1;
  }

}
