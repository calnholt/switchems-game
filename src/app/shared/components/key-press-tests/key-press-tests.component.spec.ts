import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KeyPressTestsComponent } from './key-press-tests.component';

describe('KeyPressTestsComponent', () => {
  let component: KeyPressTestsComponent;
  let fixture: ComponentFixture<KeyPressTestsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [KeyPressTestsComponent]
    });
    fixture = TestBed.createComponent(KeyPressTestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
