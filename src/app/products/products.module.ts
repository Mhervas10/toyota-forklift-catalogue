import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ProductsPage } from './products.page';
import { ProductsResolver } from './products.resolver';
import { MenuComponent } from '../menu/menu.component';

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

  ],
  exports: [
    MenuComponent
  ],
  declarations: [ProductsPage, MenuComponent],
  providers: [
    ProductsResolver
  ]
})
export class ProductsPageModule {}
