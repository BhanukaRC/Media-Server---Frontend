import { TestBed } from '@angular/core/testing';

import { AddMediaService } from './add-media.service';

describe('AddMediaService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AddMediaService = TestBed.get(AddMediaService);
    expect(service).toBeTruthy();
  });
});
