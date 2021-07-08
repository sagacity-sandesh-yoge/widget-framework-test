import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { StatReportA1Component } from './stat-report-a1.component';

describe('StatReportA1Component', () => {
  let component: StatReportA1Component;
  let fixture: ComponentFixture<StatReportA1Component>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ StatReportA1Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StatReportA1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
