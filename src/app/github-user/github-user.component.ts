import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../services/api.service';
import { GithubUser } from '../types/GithubUser.types';
import { GithubRepo } from '../types/GithubRepo.types';
import { tap } from 'rxjs';

@Component({
  selector: 'app-github-user',
  templateUrl: './github-user.component.html',
  styleUrls: ['./github-user.component.scss'],
})
export class GithubUserComponent implements OnInit {
  username: string = '';
  perPage: number = 10;
  user: GithubUser | undefined;
  repos: GithubRepo[] = [];
  constructor(private route: ActivatedRoute, private apiService: ApiService) {}

  ngOnInit(): void {
    this.username = this.route.snapshot.paramMap.get('username')!;
    this.apiService
      .getUser(this.username)
      .pipe(tap((user) => (this.user = user)))
      .subscribe();
    this.apiService
      .getUserRepos(this.username)
      .pipe(tap((repos) => (this.repos = repos)))
      .subscribe();
  }
}
