import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AreaChartA1Component } from './area-chart-a1.component';

describe('AreaChartA1Component', () => {
  let component: AreaChartA1Component;
  let fixture: ComponentFixture<AreaChartA1Component>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AreaChartA1Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AreaChartA1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
