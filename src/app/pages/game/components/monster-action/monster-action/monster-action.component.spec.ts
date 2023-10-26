import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonsterActionComponent } from './monster-action.component';

describe('MonsterActionComponent', () => {
  let component: MonsterActionComponent;
  let fixture: ComponentFixture<MonsterActionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MonsterActionComponent]
    });
    fixture = TestBed.createComponent(MonsterActionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
