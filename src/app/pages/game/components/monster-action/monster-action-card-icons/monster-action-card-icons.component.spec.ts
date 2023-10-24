import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonsterActionCardIconsComponent } from './monster-action-card-icons.component';

describe('MonsterActionCardIconsComponent', () => {
  let component: MonsterActionCardIconsComponent;
  let fixture: ComponentFixture<MonsterActionCardIconsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MonsterActionCardIconsComponent]
    });
    fixture = TestBed.createComponent(MonsterActionCardIconsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
