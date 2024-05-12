import { Injectable } from '@angular/core';
import { Cache } from '../types/Cache.types';

@Injectable({
  providedIn: 'root',
})
export class CacheService {
  constructor() {}
  getCachedData(key: string) {
    const cache: Cache = JSON.parse(localStorage.getItem('cache') ?? '{}');
    return cache[key];
  }

  setCachedData(key: string, value: any) {
    const cache: Cache = JSON.parse(localStorage.getItem('cache') ?? '{}');
    cache[key] = value;
    localStorage.setItem('cache', JSON.stringify(cache));
  }

  getBrowserStore(): Cache {
    return JSON.parse(localStorage.getItem('cache') ?? '{}');
  }
}
