import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisableMonsterActionDialogComponent } from './disable-monster-action-dialog.component';

describe('DisableMonsterActionDialogComponent', () => {
  let component: DisableMonsterActionDialogComponent;
  let fixture: ComponentFixture<DisableMonsterActionDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DisableMonsterActionDialogComponent]
    });
    fixture = TestBed.createComponent(DisableMonsterActionDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
