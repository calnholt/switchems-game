import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FullMonsterViewComponent } from './full-monster-view.component';

describe('FullMonsterViewComponent', () => {
  let component: FullMonsterViewComponent;
  let fixture: ComponentFixture<FullMonsterViewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FullMonsterViewComponent]
    });
    fixture = TestBed.createComponent(FullMonsterViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
