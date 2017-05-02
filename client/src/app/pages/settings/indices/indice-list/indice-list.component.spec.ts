/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { IndiceListComponent } from './indice-list.component';

describe('IndiceListComponent', () => {
  let component: IndiceListComponent;
  let fixture: ComponentFixture<IndiceListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IndiceListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IndiceListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
