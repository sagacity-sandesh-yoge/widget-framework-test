import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { PieChartA3Component } from './pie-chart-a3.component';

describe('PieChartA3Component', () => {
  let component: PieChartA3Component;
  let fixture: ComponentFixture<PieChartA3Component>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ PieChartA3Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PieChartA3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
