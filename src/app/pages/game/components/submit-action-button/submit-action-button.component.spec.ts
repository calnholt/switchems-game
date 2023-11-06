import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubmitActionButtonComponent } from './submit-action-button.component';

describe('SubmitActionButtonComponent', () => {
  let component: SubmitActionButtonComponent;
  let fixture: ComponentFixture<SubmitActionButtonComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SubmitActionButtonComponent]
    });
    fixture = TestBed.createComponent(SubmitActionButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
