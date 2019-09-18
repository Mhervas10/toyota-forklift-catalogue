import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule} from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ForkLiftDetailsPage } from './forkLiftDetails.page';
import { ForkLiftDetailsResolver } from './forkLiftDetails.resolver';

const routes: Routes = [
  {
    path: '',
    component: ForkLiftDetailsPage,
    resolve: {
      data:  ForkLiftDetailsResolver
    }
  }
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
  providers:[ ForkLiftDetailsResolver]
})
export class ForkLiftDetailsPageModule {}
