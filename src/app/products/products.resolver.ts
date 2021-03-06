import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { FirebaseService } from '../services/firebase.service';

@Injectable()
export class ProductsResolver implements Resolve<any> {

  constructor(private firebaseService: FirebaseService) {}

  resolve() {
    return this.firebaseService.getForklifts();
  }
}
