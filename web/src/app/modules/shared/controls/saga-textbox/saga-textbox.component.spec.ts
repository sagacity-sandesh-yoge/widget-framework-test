import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { SagaTextboxComponent } from './saga-textbox.component';

describe('SagaTextboxComponent', () => {
  let component: SagaTextboxComponent;
  let fixture: ComponentFixture<SagaTextboxComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ SagaTextboxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SagaTextboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
