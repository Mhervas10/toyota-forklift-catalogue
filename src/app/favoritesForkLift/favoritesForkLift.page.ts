import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { LoadingController } from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';
import { Product } from '../_interfaces/product.interface';
import { MenuController } from '@ionic/angular';
import { FirebaseService } from '../services/firebase.service';

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
    private firebaseService: FirebaseService

    
  ) { }


  ngOnInit() {
    
    // if (this.route && this.route.data) {
    //   this.getData();
    // }
    this.favorites = this.firebaseService.getFavorites();
    console.log("Los favoritos son: ", this.favorites)
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

}

