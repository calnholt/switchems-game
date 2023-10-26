import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EffectivenessTooltipComponent } from './effectiveness-tooltip.component';

describe('EffectivenessTooltipComponent', () => {
  let component: EffectivenessTooltipComponent;
  let fixture: ComponentFixture<EffectivenessTooltipComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EffectivenessTooltipComponent]
    });
    fixture = TestBed.createComponent(EffectivenessTooltipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
