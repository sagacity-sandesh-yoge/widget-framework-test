import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { NestedWidgetLoaderComponent } from './nested-widget-loader.component';

describe('NestedWidgetLoaderComponent', () => {
  let component: NestedWidgetLoaderComponent;
  let fixture: ComponentFixture<NestedWidgetLoaderComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ NestedWidgetLoaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NestedWidgetLoaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
