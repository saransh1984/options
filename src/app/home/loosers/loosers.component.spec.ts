import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoosersComponent } from './loosers.component';

describe('LoosersComponent', () => {
  let component: LoosersComponent;
  let fixture: ComponentFixture<LoosersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoosersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoosersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
