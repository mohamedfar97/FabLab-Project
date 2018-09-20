import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SentboxComponent } from './sentbox.component';

describe('SentboxComponent', () => {
  let component: SentboxComponent;
  let fixture: ComponentFixture<SentboxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SentboxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SentboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
