import { Component, Input } from '@angular/core';
import { GithubRepo } from 'src/app/types/GithubRepo.types';

@Component({
  selector: 'app-repository-list',
  templateUrl: './repository-list.component.html',
  styleUrls: ['./repository-list.component.scss'],
})
export class RepositoryListComponent {
  @Input({ required: true }) repositories: GithubRepo[] | undefined;
  @Input({ required: true }) perPage: number = 10;
}
