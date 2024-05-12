import { Component, Input } from '@angular/core';
import { GithubRepo } from 'src/app/types/GithubRepo.types';

@Component({
  selector: 'app-user-repository-card',
  templateUrl: './user-repository-card.component.html',
})
export class UserRepositoryCardComponent {
  @Input({ required: true }) repository: GithubRepo | undefined;
}
