import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreLogo } from './store-logo.component';

describe('LogoHelloComponent', () => {
  let component: StoreLogo;
  let fixture: ComponentFixture<StoreLogo>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StoreLogo ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StoreLogo);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
