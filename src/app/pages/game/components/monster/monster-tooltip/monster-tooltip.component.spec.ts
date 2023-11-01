import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonsterTooltipComponent } from './monster-tooltip.component';

describe('MonsterTooltipComponent', () => {
  let component: MonsterTooltipComponent;
  let fixture: ComponentFixture<MonsterTooltipComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MonsterTooltipComponent]
    });
    fixture = TestBed.createComponent(MonsterTooltipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
