import { TestBed, inject } from '@angular/core/testing';

import { VisTypesEffectsService } from './vis-types-effects.service';

describe('VisTypesEffectsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [VisTypesEffectsService]
    });
  });

  it('should ...', inject([VisTypesEffectsService], (service: VisTypesEffectsService) => {
    expect(service).toBeTruthy();
  }));
});
