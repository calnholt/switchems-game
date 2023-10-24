import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonsterActionTermHoverComponent } from './monster-action-term-hover.component';

describe('MonsterActionTermHoverComponent', () => {
  let component: MonsterActionTermHoverComponent;
  let fixture: ComponentFixture<MonsterActionTermHoverComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MonsterActionTermHoverComponent]
    });
    fixture = TestBed.createComponent(MonsterActionTermHoverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
