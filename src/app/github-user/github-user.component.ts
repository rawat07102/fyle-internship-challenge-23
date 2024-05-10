import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../services/api.service';
import { GithubUser } from '../types/GithubUser.types';
import { GithubRepo } from '../types/GithubRepo.types';

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
    this.apiService.getUserRepos(this.username).subscribe((repos) => {
      console.log('data', repos);
      this.repos = repos;
      this.user = repos[0].owner;
    });
  }

  fetchData() {
    this.apiService
      .getUserRepos(this.username)
      .subscribe((data) => console.log(data));
  }

  printCache() {
    console.log('Cache', this.apiService.getBrowserStore());
  }

  printData() {
    console.log(this.repos);
    console.log(this.user);
    console.log(this.username);
  }
}
