import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SwitchOutDialogComponent } from './switch-out-dialog.component';

describe('SwitchOutDialogComponent', () => {
  let component: SwitchOutDialogComponent;
  let fixture: ComponentFixture<SwitchOutDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SwitchOutDialogComponent]
    });
    fixture = TestBed.createComponent(SwitchOutDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
