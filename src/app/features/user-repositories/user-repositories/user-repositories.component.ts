import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { tap } from 'rxjs';
import { ApiService } from 'src/app/services/api.service';
import { GithubRepo } from 'src/app/types/GithubRepo.types';
import { GithubUser } from 'src/app/types/GithubUser.types';

@Component({
  selector: 'app-user-repositories',
  templateUrl: './user-repositories.component.html',
  styleUrls: ['./user-repositories.component.scss'],
})
export class UserRepositoriesComponent implements OnInit {
  loading = true;
  username: string = '';
  perPage: number = 10;
  page: number = 1;
  user: GithubUser | undefined;
  lastPage: number = 1;
  repositories: GithubRepo[] | undefined;
  constructor(private route: ActivatedRoute, private apiService: ApiService) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((param) => {
      this.username = param.get('username')!;
    });
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

  handlePerPageChange(newPerPage: number) {
    this.perPage = newPerPage;
    console.log('parent', this.perPage);
    this.lastPage = Math.ceil(this.user?.public_repos! / this.perPage);
    this.page = 1;
    this.fetchRepos();
  }

  fetchRepos() {
    this.loading = true;
    this.apiService
      .getUserRepos(this.username, this.perPage, this.page)
      .pipe(tap((repos) => (this.repositories = repos)))
      .subscribe(() => {
        this.loading = false;
      });
  }

  handlePageChange(newPageNumber: number) {
    this.page = newPageNumber;
    this.fetchRepos();
  }

  setPerPage(value: number) {
    if (value > 0 && value < 101) {
      this.perPage = value;
      this.fetchRepos();
    }
  }
}
