import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserRepositoryCardComponent } from './user-repository-card/user-repository-card.component';
import { UserInfoHeaderComponent } from './user-info-header/user-info-header.component';
import { PaginationComponent } from './pagination/pagination.component';
import { RepositoryListComponent } from './repository-list/repository-list.component';
import { UserRepositoriesComponent } from './user-repositories/user-repositories.component';
import { PerPageSelectorComponent } from './per-page-selector/per-page-selector.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    UserRepositoryCardComponent,
    UserInfoHeaderComponent,
    PaginationComponent,
    RepositoryListComponent,
    UserRepositoriesComponent,
    PerPageSelectorComponent,
  ],
  imports: [CommonModule, FormsModule],
})
export class UserRepositoriesModule {}
