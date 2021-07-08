import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CompanyListBtnA1Component } from './company-list-btn-a1.component';

describe('CompanyListBtnA1Component', () => {
  let component: CompanyListBtnA1Component;
  let fixture: ComponentFixture<CompanyListBtnA1Component>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CompanyListBtnA1Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanyListBtnA1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
