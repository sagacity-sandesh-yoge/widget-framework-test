import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ProgressBarA1Component } from './progress-bar-a1.component';

describe('ProgressBarA1Component', () => {
  let component: ProgressBarA1Component;
  let fixture: ComponentFixture<ProgressBarA1Component>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ProgressBarA1Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProgressBarA1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
