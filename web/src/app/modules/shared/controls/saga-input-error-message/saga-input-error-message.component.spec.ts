import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { SagaInputErrorMessageComponent } from './saga-input-error-message.component';

describe('SagaInputErrorMessageComponent', () => {
  let component: SagaInputErrorMessageComponent;
  let fixture: ComponentFixture<SagaInputErrorMessageComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ SagaInputErrorMessageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SagaInputErrorMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
