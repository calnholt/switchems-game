import { Component, ElementRef, Input, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
import { TutorialSection } from '../../models/tutorial/tutorial.model';
import { ImageUtil } from '~/app/shared/utils/image.util';
import { TutorialService } from '../../services/tutorial/tutorial.service';

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

  constructor(
    private tutorialService: TutorialService,
  ) {

  }

  ngOnInit() {
    this.setAudioSource(this.section.index);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (!this.audioPlayer) {
      return;
    }
    if (changes['section']) {
      this.setAudioSource(this.section.index);
      this.audioPlayer.nativeElement.src = this.audioSrc;
      this.play();
    }
  }

  setAudioSource(index: number) {
    this.audioSrc = `../../../../../assets/audio/tutorial/tutorial-${index}.wav`;
  }

  ngAfterViewInit() {
    this.play();
  }

  next() {
    // if (this.audioPlayer.nativeElement.paused) {
      this.tutorialService.next();
    // }
  }

  play() {
    this.audioPlayer.nativeElement.play();
  }

}
