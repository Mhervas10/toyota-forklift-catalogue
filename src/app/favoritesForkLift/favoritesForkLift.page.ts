import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { LoadingController } from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';
import { Product } from '../models/products'
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-favoritesForkLift',
  templateUrl: './favoritesForkLift.page.html',
  styleUrls: ['./favoritesForkLift.page.scss'],
})
export class FavoritesForkLiftPage implements OnInit {

  
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
    
  ) { }

  ngOnInit() {
    if (this.route && this.route.data) {
      this.getData();
    }
  }

  async getData(){
    const loading = await this.loadingCtrl.create({
      message: 'Please wait...'
    });
    this.presentLoading(loading);

    this.route.data.subscribe(routeData => {
      routeData['data'].subscribe(data => {
        loading.dismiss();
        this.products = data;
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

}



// @Component({
//   selector: 'app-favoritesForkLift',
//   templateUrl: './favoritesForkLift.page.html',
//   styleUrls: ['./favoritesForkLift.page.scss'],
// })
// export class FavoritesForkLiftPage{

//     favorites: Array<any>;

  
//     constructor(public navCtrl: NavController, public service: PropertyService) {
//       this.getFavorites();
//   }

//   itemTapped(favorite) {
//       this.navCtrl.push(PropertyDetailPage, favorite.property);
//   }

//   deleteItem(favorite) {
//       this.service.unfavorite(favorite)
//           .then(() => {
//               this.getFavorites();
//           })
//           .catch(error => alert(JSON.stringify(error)));
//   }

//   getFavorites() {
//       this.service.getFavorites()
//           .then(data => this.favorites = data);
//   }

// }
  
//   products: Product[];
//   searchTerm: string = "";
//   filteredItems: Product[];
//   knobValues: any = {
//     upper:0,
//     lower:200
//   }
 


//   constructor(
//     public loadingCtrl: LoadingController,
//     private authService: AuthService,
//     private router: Router,
//     private route: ActivatedRoute,
//     private menuCtrl: MenuController,
    
//   ) { }

//   ngOnInit() {
//     if (this.route && this.route.data) {
//       this.getData();
//     }
//   }

//   // setFilteredItems(){

//   //   for(let i=0; i>this.products.length; i++){
//   //     if(this.products[i].title )
//   //   }
//   // }

//   async getData(){
//     const loading = await this.loadingCtrl.create({
//       message: 'Please wait...'
//     });
//     this.presentLoading(loading);

//     this.route.data.subscribe(routeData => {
//       routeData['data'].subscribe(data => {
//         loading.dismiss();
//         this.products = data;
//       })
//     })
//   }

//   async presentLoading(loading) {
//     return await loading.present();
//   }

//   logout(){
//     this.authService.doLogout()
//     .then(res => {
//       this.router.navigate(["/login"]);
//     }, err => {
//       console.log(err);
//     })
//   }

// }
