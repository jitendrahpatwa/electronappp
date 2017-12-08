import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListissuesbyuserComponent } from './listissuesbyuser.component';

describe('ListissuesbyuserComponent', () => {
  let component: ListissuesbyuserComponent;
  let fixture: ComponentFixture<ListissuesbyuserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListissuesbyuserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListissuesbyuserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
