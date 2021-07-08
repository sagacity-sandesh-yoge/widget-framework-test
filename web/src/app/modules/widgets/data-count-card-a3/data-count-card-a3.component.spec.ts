import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { DataCountCardA3Component } from './data-count-card-a3.component';

describe('DataCountCardA3Component', () => {
  let component: DataCountCardA3Component;
  let fixture: ComponentFixture<DataCountCardA3Component>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DataCountCardA3Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DataCountCardA3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
