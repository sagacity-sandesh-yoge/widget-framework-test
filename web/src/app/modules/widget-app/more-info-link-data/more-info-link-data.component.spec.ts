import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { MoreInfoLinkDataComponent } from './more-info-link-data.component';

describe('MoreInfoLinkDataComponent', () => {
  let component: MoreInfoLinkDataComponent;
  let fixture: ComponentFixture<MoreInfoLinkDataComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ MoreInfoLinkDataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MoreInfoLinkDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
