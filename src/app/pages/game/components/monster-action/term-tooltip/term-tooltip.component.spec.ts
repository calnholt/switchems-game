import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TermTooltipComponent } from './term-tooltip.component';

describe('TermTooltipComponent', () => {
  let component: TermTooltipComponent;
  let fixture: ComponentFixture<TermTooltipComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TermTooltipComponent]
    });
    fixture = TestBed.createComponent(TermTooltipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
