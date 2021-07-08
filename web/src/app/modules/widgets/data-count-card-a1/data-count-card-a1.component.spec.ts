import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { DataCountCardA1Component } from './data-count-card-a1.component';

describe('DataCountCardA1Component', () => {
  let component: DataCountCardA1Component;
  let fixture: ComponentFixture<DataCountCardA1Component>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DataCountCardA1Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DataCountCardA1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
