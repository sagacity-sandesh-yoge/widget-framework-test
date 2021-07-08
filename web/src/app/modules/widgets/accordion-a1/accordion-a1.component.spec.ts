import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AccordionA1Component } from './accordion-a1.component';

describe('AccordionA1Component', () => {
  let component: AccordionA1Component;
  let fixture: ComponentFixture<AccordionA1Component>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AccordionA1Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccordionA1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
