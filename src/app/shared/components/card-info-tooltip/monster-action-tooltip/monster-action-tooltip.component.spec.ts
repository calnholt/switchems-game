import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonsterActionTooltipComponent } from './monster-action-tooltip.component';

describe('MonsterActionTooltipComponent', () => {
  let component: MonsterActionTooltipComponent;
  let fixture: ComponentFixture<MonsterActionTooltipComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MonsterActionTooltipComponent]
    });
    fixture = TestBed.createComponent(MonsterActionTooltipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
