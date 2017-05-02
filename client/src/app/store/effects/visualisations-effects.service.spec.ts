import { TestBed, inject } from '@angular/core/testing';

import { VisualisationsEffectsService } from './visualisations-effects.service';

describe('VisualisationsEffectsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [VisualisationsEffectsService]
    });
  });

  it('should ...', inject([VisualisationsEffectsService], (service: VisualisationsEffectsService) => {
    expect(service).toBeTruthy();
  }));
});
