import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuffComponent } from './buff.component';

describe('BuffComponent', () => {
  let component: BuffComponent;
  let fixture: ComponentFixture<BuffComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BuffComponent]
    });
    fixture = TestBed.createComponent(BuffComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
