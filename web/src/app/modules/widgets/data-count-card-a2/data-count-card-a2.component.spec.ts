import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { DataCountCardA2Component } from './data-count-card-a2.component';

describe('DataCountCardA2Component', () => {
  let component: DataCountCardA2Component;
  let fixture: ComponentFixture<DataCountCardA2Component>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DataCountCardA2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DataCountCardA2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
