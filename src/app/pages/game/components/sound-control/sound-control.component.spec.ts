import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SoundControlComponent } from './sound-control.component';

describe('SoundControlComponent', () => {
  let component: SoundControlComponent;
  let fixture: ComponentFixture<SoundControlComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SoundControlComponent]
    });
    fixture = TestBed.createComponent(SoundControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
