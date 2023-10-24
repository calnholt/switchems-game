import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonsterActionHoversComponent } from './monster-action-hovers.component';

describe('MonsterActionHoversComponent', () => {
  let component: MonsterActionHoversComponent;
  let fixture: ComponentFixture<MonsterActionHoversComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MonsterActionHoversComponent]
    });
    fixture = TestBed.createComponent(MonsterActionHoversComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
