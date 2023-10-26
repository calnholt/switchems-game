import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatBoardComponent } from './stat-board.component';

describe('StatBoardComponent', () => {
  let component: StatBoardComponent;
  let fixture: ComponentFixture<StatBoardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StatBoardComponent]
    });
    fixture = TestBed.createComponent(StatBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
