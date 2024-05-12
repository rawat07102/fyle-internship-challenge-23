import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GithubRepo } from '../types/GithubRepo.types';
import { of, tap } from 'rxjs';
import { GithubUser } from '../types/GithubUser.types';
import { CacheService } from './cache.service';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  BASE_URL = 'https://api.github.com';
  constructor(
    private httpClient: HttpClient,
    private cacheService: CacheService
  ) {}

  private get<T>(path: string) {
    const cachedData: T = this.cacheService.getCachedData(path);
    if (cachedData) {
      return of(cachedData);
    }

    return this.httpClient.get<T>(`${this.BASE_URL}/${path}`).pipe(
      tap((data) => {
        this.cacheService.setCachedData(path, data);
      })
    );
  }

  getUser(githubUsername: string) {
    return this.get<GithubUser>(`users/${githubUsername}`);
  }

  getUserRepos(githubUsername: string, perPage: number = 10, page: number = 1) {
    return this.get<GithubRepo[]>(
      `users/${githubUsername}/repos?per_page=${perPage}&page=${page}`
    );
  }
}
