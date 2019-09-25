import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { FavouritesForkLiftPage } from './favouritesForkLift.page';
import { FavouritesForkLiftResolver } from './favouritesForkLift.resolver';


const routes: Routes = [
  {
    path: '',
    component: FavouritesForkLiftPage,
    resolve: {
      data: FavouritesForkLiftResolver
    }
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    RouterModule.forChild(routes),

  ],
  declarations: [FavouritesForkLiftPage],
  providers: [
    FavouritesForkLiftResolver
  ]
})
export class FavouritesForkLiftPageModule {}
