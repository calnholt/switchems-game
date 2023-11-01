import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonsterActiveComponent } from './monster.component';

describe('MonsterActiveComponent', () => {
  let component: MonsterActiveComponent;
  let fixture: ComponentFixture<MonsterActiveComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MonsterActiveComponent]
    });
    fixture = TestBed.createComponent(MonsterActiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
