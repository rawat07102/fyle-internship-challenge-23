import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';

import { ApiService } from './api.service';
import { GithubUser } from '../types/GithubUser.types';
import { CacheService } from './cache.service';
import { GithubRepo } from '../types/GithubRepo.types';

describe('ApiService', () => {
  let service: ApiService;
  let httpTestingController: HttpTestingController;
  let url: string;
  let cacheService: CacheService;
  const mockUsername = 'john_doe';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(ApiService);
    cacheService = TestBed.inject(CacheService);
    httpTestingController = TestBed.inject(HttpTestingController);
    url = service.BASE_URL;
  });

  describe('getUser()', () => {
    it('should return a github user without cache', () => {
      const mockGithubUser: GithubUser = {
        id: 12345,
        name: 'John Doe',
        avatar_url: 'https://example.com/avatar.jpg',
        followers: 1000,
        created_at: '2020-01-01T00:00:00Z',
        public_repos: 25,
        twitter_username: 'johndoe',
        email: 'john.doe@example.com',
        bio: 'Software Engineer passionate about open-source',
        location: 'San Francisco, CA',
        html_url: 'https://github.com/johndoe',
        repos_url: 'https://api.github.com/users/johndoe/repos',
      };
      const mockPath = `users/${mockUsername}`;

      service
        .getUser(mockUsername)
        .subscribe((data) => expect(data).toEqual(mockGithubUser));

      if (!cacheService.getCachedData(mockPath)) {
        const req = httpTestingController.expectOne(url + '/' + mockPath);
        expect(req.request.method).toEqual('GET');
        req.flush(mockGithubUser);
      }
    });
  });

  describe('getUserRepos()', () => {
    it('should return github repos array without cache', () => {
      const mockRepos: GithubRepo[] = [
        {
          name: 'awesome-project',
          description: 'An awesome project showcasing cool features',
          html_url: 'https://github.com/user/awesome-project',
          topics: ['javascript', 'react', 'node.js'],
          updated_at: '2024-05-10T08:30:00Z',
        },
        {
          name: 'utility-tool',
          description: 'A utility tool for simplifying daily tasks',
          html_url: 'https://github.com/user/utility-tool',
          topics: ['python', 'automation', 'productivity'],
          updated_at: '2024-05-08T12:45:00Z',
        },
      ];
      const perPage = 2;

      const mockPath = `users/${mockUsername}/repos?per_page=${perPage}&page=1`;

      service.getUserRepos(mockUsername, perPage).subscribe((data) => {
        expect(data).toEqual(mockRepos);
      });

      if (!cacheService.getCachedData(mockPath)) {
        const req = httpTestingController.expectOne(url + '/' + mockPath);
        expect(req.request.method).toEqual('GET');
        req.flush(mockRepos);
      }
    });
  });
});
