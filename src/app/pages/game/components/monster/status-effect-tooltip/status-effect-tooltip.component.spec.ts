import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatusEffectTooltipComponent } from './status-effect-tooltip.component';

describe('StatusEffectTooltipComponent', () => {
  let component: StatusEffectTooltipComponent;
  let fixture: ComponentFixture<StatusEffectTooltipComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StatusEffectTooltipComponent]
    });
    fixture = TestBed.createComponent(StatusEffectTooltipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
