import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', loadChildren: './login/login.module#LoginPageModule' },
  { path: 'register', loadChildren: './register/register.module#RegisterPageModule' },
  { path: 'forkLiftDetails', loadChildren: './forkLiftDetails/forkLiftDetails.module#ForkLiftDetailsPageModule' },
  { path: 'products', loadChildren: './products/products.module#ProductsPageModule' },
  { path: 'new-forklift', loadChildren: './new-forklift/new-forklift.module#NewForkliftPageModule' },
  { path: 'check', loadChildren: './check/check.module#CheckPageModule' },
  { path: 'welcome', loadChildren: './welcome/welcome.module#WelcomePageModule' },
  { path: 'favoritesForkLift', loadChildren: './favoritesForkLift/favoritesForkLift.module#FavoritesForkLiftPageModule' },


  // { path: 'new-forklift-modal', loadChildren: './new-forklift-modal/new-forklift-modal.module#NewForkliftModalPageModule' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
