import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { UserRepositoriesComponent } from './user-repositories.component';
import { ApiService } from 'src/app/services/api.service';
import { of } from 'rxjs';
import { GithubUser } from 'src/app/types/GithubUser.types';
import { GithubRepo } from 'src/app/types/GithubRepo.types';
import { ActivatedRoute, provideRouter } from '@angular/router';
import { UserRepositoriesModule } from '../user-repositories.module';

describe('UserRepositoriesComponent', () => {
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
  const fakeApiService: Partial<ApiService> = {
    getUser(_githubUsername) {
      return of(mockGithubUser);
    },
    getUserRepos(githubUsername, perPage, page) {
      return of(mockRepos);
    },
  };

  let component: UserRepositoriesComponent;
  let fixture: ComponentFixture<UserRepositoriesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [UserRepositoriesModule],
      providers: [
        { provide: ApiService, useValue: fakeApiService },
        provideRouter([
          {
            path: 'github-user/john-doe',
            component: UserRepositoriesComponent,
          },
        ]),
      ],
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserRepositoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('OnInit()', () => {
    it('should set user on init', () => {
      component.ngOnInit();
      fixture.detectChanges();
      expect(component.user).toEqual(mockGithubUser);
    });
  });

  describe('fetchRepos()', () => {
    it('should set repos', () => {
      component.fetchRepos();
      fixture.detectChanges();
      expect(component.repositories).toEqual(mockRepos);
    });
  });

  describe('setPerPage()', () => {
    it('should set perPage to given value', () => {
      const mockPageNumber = 5;
      component.setPerPage(mockPageNumber);
      fixture.detectChanges();
      expect(component.perPage).toBe(mockPageNumber);
    });
  });
});
