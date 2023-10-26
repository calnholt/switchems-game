import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatBoardSectionComponent } from './stat-board-section.component';

describe('StatBoardSectionComponent', () => {
  let component: StatBoardSectionComponent;
  let fixture: ComponentFixture<StatBoardSectionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StatBoardSectionComponent]
    });
    fixture = TestBed.createComponent(StatBoardSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
