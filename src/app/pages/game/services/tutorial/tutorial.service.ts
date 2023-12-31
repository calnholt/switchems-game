import { Injectable } from '@angular/core';
import { TutorialSection } from '../../models/tutorial/tutorial.model';
import { BehaviorSubject } from 'rxjs';
import { TutorialSections } from '../../models/tutorial/tutorial.util';
import { SfxService } from '~/app/shared/services/sfx.service';

@Injectable({
  providedIn: 'root'
})
export class TutorialService {

  private _currentSection: BehaviorSubject<TutorialSection> = new BehaviorSubject<TutorialSection>({ text: '', types: [], description: '' });

  public get currentSection$() { return this._currentSection; }
  public get currentSection() { return this._currentSection.value; }
  public get isTutorialActive(): boolean { return !!this.currentSection.description; }
  public get isGuidedTutorialActive(): boolean { return !!this.currentSection.isGuidedTutorial; }

  constructor(
    private sfx: SfxService,
  ) { }

  startTutorial() {
    // this._currentSection.next(TutorialSections[TutorialSections.length-6]);
    this._currentSection.next(TutorialSections[0]);
  };

  clear() {
    this._currentSection.next({ text: '', types: [], description: '' });
  }

  next() {
    if (this._currentSection.value?.isEnd) {
      this._currentSection.next({ text: '', types: [], description: '' });
      this.sfx.setVolume(1);
    }
    else {
      const index = this.getCurrentIndex() + 1;
      this._currentSection.next(TutorialSections[index]);
    }
  }

  previous() {
    this._currentSection.next(TutorialSections[this.getCurrentIndex() - 1]);
  }

  private getCurrentIndex(): number {
    return TutorialSections.findIndex(t => t.description === this._currentSection.value.description);
  }

}
