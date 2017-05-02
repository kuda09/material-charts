/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { CheckIndicesComponent } from './check-indices.component';

describe('CheckIndicesComponent', () => {
  let component: CheckIndicesComponent;
  let fixture: ComponentFixture<CheckIndicesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CheckIndicesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckIndicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
