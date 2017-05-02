/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { IndicesEffectsService } from './indices-effects.service';

describe('IndicesEffectsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [IndicesEffectsService]
    });
  });

  it('should ...', inject([IndicesEffectsService], (service: IndicesEffectsService) => {
    expect(service).toBeTruthy();
  }));
});
