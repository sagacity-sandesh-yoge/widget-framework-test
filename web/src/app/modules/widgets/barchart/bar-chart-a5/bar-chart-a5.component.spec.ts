import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { BarChartA5Component } from './bar-chart-a5.component';

describe('BarChartA5Component', () => {
  let component: BarChartA5Component;
  let fixture: ComponentFixture<BarChartA5Component>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ BarChartA5Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BarChartA5Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
