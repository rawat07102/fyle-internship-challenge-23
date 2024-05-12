import { Component, Input } from '@angular/core';
import { GithubUser } from 'src/app/types/GithubUser.types';

@Component({
  selector: 'app-user-info-header',
  templateUrl: './user-info-header.component.html',
  styleUrls: ['./user-info-header.component.scss']
})
export class UserInfoHeaderComponent {
  @Input() user: GithubUser | undefined;
}
