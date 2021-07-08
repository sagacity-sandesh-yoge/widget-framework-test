import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { VerticalMenuComponent } from './vertical-menu.component';

describe('VerticalMenuComponent', () => {
  let component: VerticalMenuComponent;
  let fixture: ComponentFixture<VerticalMenuComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ VerticalMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VerticalMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
