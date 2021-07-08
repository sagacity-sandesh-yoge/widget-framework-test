import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { StackedBarChartA1Component } from './stacked-bar-chart-a1.component';

describe('StackedBarChartA1Component', () => {
  let component: StackedBarChartA1Component;
  let fixture: ComponentFixture<StackedBarChartA1Component>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ StackedBarChartA1Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StackedBarChartA1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
