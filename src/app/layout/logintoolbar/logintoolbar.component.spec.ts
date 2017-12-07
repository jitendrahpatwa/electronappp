import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LogintoolbarComponent } from './logintoolbar.component';

describe('LogintoolbarComponent', () => {
  let component: LogintoolbarComponent;
  let fixture: ComponentFixture<LogintoolbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LogintoolbarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LogintoolbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
