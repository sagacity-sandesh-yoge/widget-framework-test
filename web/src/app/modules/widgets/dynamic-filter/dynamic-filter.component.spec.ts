import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { DynamicFilterComponent } from './dynamic-filter.component';

describe('DynamicFilterComponent', () => {
  let component: DynamicFilterComponent;
  let fixture: ComponentFixture<DynamicFilterComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DynamicFilterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DynamicFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
