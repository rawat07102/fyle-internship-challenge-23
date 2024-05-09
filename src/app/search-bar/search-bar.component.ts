import { Component } from '@angular/core';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent {
  githubUsername = ""
  constructor(
    private apiService: ApiService
  ) {}

  onSubmit() {
    this.apiService.getUser(this.githubUsername).subscribe(console.log)
  }
}
