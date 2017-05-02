/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { SearchEffectsService } from './search-effects.service';

describe('SearchEffectsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SearchEffectsService]
    });
  });

  it('should ...', inject([SearchEffectsService], (service: SearchEffectsService) => {
    expect(service).toBeTruthy();
  }));
});
