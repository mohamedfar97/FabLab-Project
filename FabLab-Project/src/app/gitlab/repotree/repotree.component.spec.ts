import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RepotreeComponent } from './repotree.component';

describe('RepotreeComponent', () => {
  let component: RepotreeComponent;
  let fixture: ComponentFixture<RepotreeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RepotreeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RepotreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
