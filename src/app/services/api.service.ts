import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GithubRepo } from '../types/GithubRepo.types';
import { of, tap } from 'rxjs';
import { Cache } from '../types/Cache.types';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private httpClient: HttpClient) {}

  getUserRepos(githubUsername: string) {
    const cachedData = this.getCachedData(githubUsername);
    if (cachedData) {
      console.log('HIT');
      return of(cachedData);
    }
    console.log('MISS');
    return this.httpClient
      .get<GithubRepo[]>(`https://api.github.com/users/${githubUsername}/repos`)
      .pipe(
        tap((githubRepos) => {
          this.setCachedData(githubUsername, githubRepos);
        })
      );
  }

  getCachedData(key: string) {
    const cache: Cache = JSON.parse(localStorage.getItem('cache') ?? '{}');
    return cache[key];
  }

  setCachedData(key: string, value: GithubRepo[]) {
    const cache: Cache = JSON.parse(localStorage.getItem('cache') ?? '{}');
    cache[key] = value;
    localStorage.setItem('cache', JSON.stringify(cache));
  }

  getBrowserStore(): Cache {
    return JSON.parse(localStorage.getItem('cache') ?? '{}');
  }
}
