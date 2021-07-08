import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { MatBA1Component } from './mat-b-a1.component';

describe('MatBA1Component', () => {
  let component: MatBA1Component;
  let fixture: ComponentFixture<MatBA1Component>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ MatBA1Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MatBA1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
