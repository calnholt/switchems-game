import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KOSwitchOutDialogComponent } from './koswitch-out-dialog.component';

describe('KOSwitchOutDialogComponent', () => {
  let component: KOSwitchOutDialogComponent;
  let fixture: ComponentFixture<KOSwitchOutDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [KOSwitchOutDialogComponent]
    });
    fixture = TestBed.createComponent(KOSwitchOutDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
