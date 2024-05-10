import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GithubRepo } from '../types/GithubRepo.types';
import { of, tap } from 'rxjs';
import { Cache } from '../types/Cache.types';
import { GithubUser } from '../types/GithubUser.types';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private BASE_URL = 'https://api.github.com';
  constructor(private httpClient: HttpClient) {}

  private get<T>(path: string) {
    const cachedData: T = this.getCachedData(path);
    if (cachedData) {
      return of(cachedData);
    }

    return this.httpClient.get<T>(`${this.BASE_URL}/${path}`).pipe(
      tap((data) => {
        this.setCachedData(path, data);
      })
    );
  }

  getUser(githubUsername: string) {
    return this.get<GithubUser>(`users/${githubUsername}`);
  }

  getUserRepos(githubUsername: string) {
    return this.get<GithubRepo[]>(`users/${githubUsername}/repos`);
  }

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
