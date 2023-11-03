import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StandardActionComponent } from './standard-action.component';

describe('StandardActionComponent', () => {
  let component: StandardActionComponent;
  let fixture: ComponentFixture<StandardActionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StandardActionComponent]
    });
    fixture = TestBed.createComponent(StandardActionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
