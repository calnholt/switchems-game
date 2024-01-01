import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewMonsterButtonComponent } from './view-monster-button.component';

describe('ViewMonsterButtonComponent', () => {
  let component: ViewMonsterButtonComponent;
  let fixture: ComponentFixture<ViewMonsterButtonComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewMonsterButtonComponent]
    });
    fixture = TestBed.createComponent(ViewMonsterButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
