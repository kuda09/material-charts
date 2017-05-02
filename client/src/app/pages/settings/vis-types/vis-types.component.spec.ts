/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { VisTypesComponent } from './vis-types.component';

describe('VisTypesComponent', () => {
  let component: VisTypesComponent;
  let fixture: ComponentFixture<VisTypesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VisTypesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VisTypesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
