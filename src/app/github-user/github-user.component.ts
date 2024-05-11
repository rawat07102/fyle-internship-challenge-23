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
  loading = true;
  username: string = '';
  perPage: number = 10;
  page: number = 1;
  user: GithubUser | undefined;
  lastPage: number = 1;
  repos: GithubRepo[] | undefined;
  constructor(private route: ActivatedRoute, private apiService: ApiService) {}

  ngOnInit(): void {
    this.username = this.route.snapshot.paramMap.get('username')!;
    this.apiService
      .getUser(this.username)
      .pipe(
        tap((user) => {
          this.user = user;
          this.lastPage = Math.ceil(user.public_repos / this.perPage);
        })
      )
      .subscribe();
    this.fetchRepos();
  }

  onChange() {
    this.lastPage = Math.ceil(this.user?.public_repos! / this.perPage);
    this.page = 1;
    this.fetchRepos();
  }

  fetchRepos() {
    this.loading = true;
    this.apiService
      .getUserRepos(this.username, this.perPage, this.page)
      .pipe(tap((repos) => (this.repos = repos)))
      .subscribe(() => {
        this.loading = false;
      });
  }

  setPage(page: number) {
    if (page > 0 && page <= this.lastPage) {
      this.page = page;
      this.fetchRepos();
    }
  }

  nextPage() {
    if (this.page < this.lastPage) {
      this.page++;
      this.fetchRepos();
    }
  }

  prevPage() {
    if (this.page > 1) {
      this.page--;
      this.fetchRepos();
    }
  }

  setPerPage(value: number) {
    if (value > 0 && value < 101) {
      this.perPage = value;
      this.fetchRepos();
    }
  }
}
