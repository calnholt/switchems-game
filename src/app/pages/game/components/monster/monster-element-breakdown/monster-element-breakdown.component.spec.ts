import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonsterElementBreakdownComponent } from './monster-element-breakdown.component';

describe('MonsterElementBreakdownComponent', () => {
  let component: MonsterElementBreakdownComponent;
  let fixture: ComponentFixture<MonsterElementBreakdownComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MonsterElementBreakdownComponent]
    });
    fixture = TestBed.createComponent(MonsterElementBreakdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
