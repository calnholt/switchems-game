import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonsterActionGridComponent } from './monster-action-grid.component';

describe('MonsterActionGridComponent', () => {
  let component: MonsterActionGridComponent;
  let fixture: ComponentFixture<MonsterActionGridComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MonsterActionGridComponent]
    });
    fixture = TestBed.createComponent(MonsterActionGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
