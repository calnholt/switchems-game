import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrushDialogComponent } from './crush-dialog.component';

describe('CrushDialogComponent', () => {
  let component: CrushDialogComponent;
  let fixture: ComponentFixture<CrushDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CrushDialogComponent]
    });
    fixture = TestBed.createComponent(CrushDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
