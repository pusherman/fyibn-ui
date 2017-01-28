/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { FyibnNavComponent } from './fyibn-nav.component';

describe('FyibnNavComponent', () => {
  let component: FyibnNavComponent;
  let fixture: ComponentFixture<FyibnNavComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FyibnNavComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FyibnNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
