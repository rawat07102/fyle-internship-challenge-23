import { TestBed } from '@angular/core/testing';

import { CacheService } from './cache.service';

let service: CacheService;
describe('CacheService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CacheService);
  });

  const mockCacheValue = {
    id: '1',
    name: 'mock value',
    body: 'cache value',
  };
  const key = 'mock-cache-key';

  it('should put a value in cache and be able to get it', () => {
    service.setCachedData(key, mockCacheValue);
    expect(service.getCachedData(key)).toEqual(mockCacheValue);
  });
});
