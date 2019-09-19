import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ProductsPage } from './products.page';
import { ProductsResolver } from './products.resolver';
import { IonBottomDrawerModule } from 'ion-bottom-drawer';

const routes: Routes = [
  {
    path: '',
    component: ProductsPage,
    resolve: {
      data: ProductsResolver
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
    IonBottomDrawerModule
  ],
  declarations: [ProductsPage],
  providers: [
    ProductsResolver
  ]
})
export class ProductsPageModule {}
