import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FlashyGraphicComponent } from './flashy-graphic.component';

describe('FlashyGraphicComponent', () => {
  let component: FlashyGraphicComponent;
  let fixture: ComponentFixture<FlashyGraphicComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FlashyGraphicComponent]
    });
    fixture = TestBed.createComponent(FlashyGraphicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
