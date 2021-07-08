import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CompanyAddContainerComponent } from './company-add-container.component';

describe('CompanyAddContainerComponent', () => {
  let component: CompanyAddContainerComponent;
  let fixture: ComponentFixture<CompanyAddContainerComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CompanyAddContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanyAddContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
