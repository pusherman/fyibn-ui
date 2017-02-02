/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ByLineComponent } from './by-line.component';

describe('ByLineComponent', () => {
  let component: ByLineComponent;
  let fixture: ComponentFixture<ByLineComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ByLineComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ByLineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
