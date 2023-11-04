import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PushableButtonComponent } from './pushable-button.component';

describe('PushableButtonComponent', () => {
  let component: PushableButtonComponent;
  let fixture: ComponentFixture<PushableButtonComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PushableButtonComponent]
    });
    fixture = TestBed.createComponent(PushableButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
