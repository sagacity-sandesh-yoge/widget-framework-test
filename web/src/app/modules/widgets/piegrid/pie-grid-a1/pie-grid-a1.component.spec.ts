import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { PieGridA1Component } from './pie-grid-a1.component';

describe('PieGridA1Component', () => {
  let component: PieGridA1Component;
  let fixture: ComponentFixture<PieGridA1Component>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ PieGridA1Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PieGridA1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
