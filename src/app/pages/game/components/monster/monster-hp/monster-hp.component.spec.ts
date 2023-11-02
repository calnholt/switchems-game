import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonsterHpComponent } from './monster-hp.component';

describe('MonsterHpComponent', () => {
  let component: MonsterHpComponent;
  let fixture: ComponentFixture<MonsterHpComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MonsterHpComponent]
    });
    fixture = TestBed.createComponent(MonsterHpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
