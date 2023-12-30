import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SfxComponent } from './sfx.component';

describe('SfxComponent', () => {
  let component: SfxComponent;
  let fixture: ComponentFixture<SfxComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SfxComponent]
    });
    fixture = TestBed.createComponent(SfxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
