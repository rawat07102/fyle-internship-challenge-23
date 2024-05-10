import { Component } from '@angular/core';
import { ApiService } from '../services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss'],
})
export class SearchBarComponent {
  userNotFound = false;
  githubUsername = '';
  constructor(private apiService: ApiService, private router: Router) {}

  onSubmit() {
    this.apiService.getUser(this.githubUsername).subscribe({
      complete: () => {
        this.userNotFound = false;
        this.router.navigate(['github-user', this.githubUsername]);
      },
      error: () => {
        this.userNotFound = true;
      },
    });
  }

  onInputFocus() {
    this.userNotFound = false;
  }
}
