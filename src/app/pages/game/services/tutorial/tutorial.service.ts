import { Injectable } from '@angular/core';
import { TutorialSection } from '../../models/tutorial/tutorial.model';
import { BehaviorSubject } from 'rxjs';
import { TutorialSections } from '../../models/tutorial/tutorial.util';

@Injectable({
  providedIn: 'root'
})
export class TutorialService {

  private _currentSection: BehaviorSubject<TutorialSection> = new BehaviorSubject<TutorialSection>({ index: -1, text: '', types: [] });

  public get currentSection$() { return this._currentSection; }
  public get currentSection() { return this._currentSection.value; }

  constructor() { }

  startTutorial() {
    this._currentSection.next(TutorialSections[0]);
  };

  next() {
    if (this._currentSection.value?.isEnd) {

    }
    else {
      const index = this.getCurrentIndex();
      this._currentSection.next(TutorialSections[this.getCurrentIndex()]);
    }
  }

  previous() {
    this._currentSection.next(TutorialSections[this.getCurrentIndex() - 1]);
  }

  private getCurrentIndex(): number {
    return this._currentSection.value.index;
  }

}
