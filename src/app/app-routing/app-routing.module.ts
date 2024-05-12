import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageNotFoundComponent } from '../page-not-found/page-not-found.component';
import { SearchBarComponent } from '../features/search/search-bar/search-bar.component';
import { UserRepositoriesComponent } from '../features/user-repositories/user-repositories/user-repositories.component';

const appRoutes: Routes = [
  { path: 'github-user/:username', component: UserRepositoriesComponent },
  { path: '', component: SearchBarComponent },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
