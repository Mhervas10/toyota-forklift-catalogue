import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule} from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ForkLiftDetailsPage } from './forkLiftDetails.page';

import { IonicStorageModule } from '@ionic/storage';

const routes: Routes = [
  {
    path: '',
    component: ForkLiftDetailsPage,
   
  }
];

imports: [
  IonicStorageModule.forRoot()
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ForkLiftDetailsPage],
  
})
export class ForkLiftDetailsPageModule {}
export class AppModule {} 
