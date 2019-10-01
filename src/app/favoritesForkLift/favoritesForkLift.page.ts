import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { LoadingController } from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';
import { Product } from '../_interfaces/product.interface';
import { MenuController } from '@ionic/angular';
import { FirebaseService } from '../services/firebase.service';

import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-favoritesForkLift',
  templateUrl: './favoritesForkLift.page.html',
  styleUrls: ['./favoritesForkLift.page.scss'],
})
export class FavoritesForkLiftPage implements OnInit {

  favorites;
  products: Product[];
  searchTerm: string = "";
  filteredItems: Product[];
  knobValues: any = {
    upper:0,
    lower:200
  }
 
  constructor(
    public loadingCtrl: LoadingController,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private menuCtrl: MenuController,
    private firebaseService: FirebaseService,
    public storage:Storage
    
  ) { 
    this.setTheValue()
    this.getTheValue()
  }

  setTheValue(){
    this.storage.set('name', 'ironman')
  }

  getTheValue(){
    this.storage.get('name').then( (val) => {

      console.log("valeu is"  + val)
    })
  }


  ngOnInit() {
    
    //if (this.route && this.route.data) {
       //this.getData();
     //}
    this.storage.get('favorites').then( (val) => {
      console.log("Favoritos son: ", val)
      this.favorites = val;
    });
    //console.log("Los favoritos son: ", this.favorites)
  }

  async getData(){
    const loading = await this.loadingCtrl.create({
      message: 'Please wait...'
    });
    this.presentLoading(loading);

    this.route.data.subscribe(routeData => {
      routeData['data'].subscribe(data => {
        loading.dismiss();
        this.favorites = data;
      })
    })
  }

  async presentLoading(loading) {
    return await loading.present();
  }

  // goToDetail(forklift) {
  //   this.firebaseService.setCurrentForklift(forklift);
  //   this.router.navigate(['/forkLiftDetails']);
    
  // }

  logout(){
    this.authService.doLogout()
    .then(res => {
      this.router.navigate(["/login"]);
    }, err => {
      console.log(err);
    })
  }

  deleteItem(favorite) {
    this.firebaseService.deleteCurrentFavoriteForklift(favorite);
  }

  goToDetail(favorite) {
    this.firebaseService.setCurrentForklift(favorite);
    this.router.navigate(['/forkLiftDetails']);
  }


}

