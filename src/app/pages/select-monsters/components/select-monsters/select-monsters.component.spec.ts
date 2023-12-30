import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectMonstersComponent } from './select-monsters.component';

describe('SelectMonstersComponent', () => {
  let component: SelectMonstersComponent;
  let fixture: ComponentFixture<SelectMonstersComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SelectMonstersComponent]
    });
    fixture = TestBed.createComponent(SelectMonstersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
