import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CompanyFilterComponent } from './company-filter.component';

describe('CompanyFilterComponent', () => {
  let component: CompanyFilterComponent;
  let fixture: ComponentFixture<CompanyFilterComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CompanyFilterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanyFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
