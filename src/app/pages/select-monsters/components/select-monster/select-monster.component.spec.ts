import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectMonsterComponent } from './select-monster.component';

describe('SelectMonsterComponent', () => {
  let component: SelectMonsterComponent;
  let fixture: ComponentFixture<SelectMonsterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SelectMonsterComponent]
    });
    fixture = TestBed.createComponent(SelectMonsterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
