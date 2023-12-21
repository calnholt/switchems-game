import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatusEffectsComponent } from './status-effects.component';

describe('StatusEffectsComponent', () => {
  let component: StatusEffectsComponent;
  let fixture: ComponentFixture<StatusEffectsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StatusEffectsComponent]
    });
    fixture = TestBed.createComponent(StatusEffectsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
