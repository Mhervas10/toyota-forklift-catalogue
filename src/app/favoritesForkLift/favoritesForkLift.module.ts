import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { FavoritesForkLiftPage } from './favoritesForkLift.page';
import { FavoritesForkLiftResolver } from './favoritesForkLift.resolver';



const routes: Routes = [
  {
    path: '',
    component: FavoritesForkLiftPage,
    resolve: {
      data: FavoritesForkLiftResolver
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
  declarations: [FavoritesForkLiftPage],
  providers: [
    FavoritesForkLiftResolver
  ]
})
export class FavoritesForkLiftPageModule {}
