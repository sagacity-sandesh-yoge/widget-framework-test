import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { RegistrationLayoutComponent } from './registration-layout.component';

describe('RegistrationLayoutComponent', () => {
  let component: RegistrationLayoutComponent;
  let fixture: ComponentFixture<RegistrationLayoutComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ RegistrationLayoutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistrationLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
