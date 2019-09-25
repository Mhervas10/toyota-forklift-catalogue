import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { LoadingController } from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';

import { Product } from '../models/products'

@Component({
  selector: 'app-products',
  templateUrl: './products.page.html',
  styleUrls: ['./products.page.scss'],
})
export class ProductsPage implements OnInit {

  // products: Product[];
  products;
  searchTerm: string = "";
  filteredItems: Product[];
  // showing: string = "products";

  knobValues: any = {
    upper:0,
    lower:200
  }

  constructor(
    public loadingCtrl: LoadingController,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    if (this.route && this.route.data) {
      this.getData();
    }
  }

  // setFilteredItems(){

  //   for(let i=0; i>this.products.length; i++){
  //     if(this.products[i].title )
  //   }
  // }

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
  setFilteredItems(){
    console.log("Searching term: ", this.searchTerm);
    this.filteredItems = this.filterItems (this.searchTerm);
    // if(this.filteredItems.length > 0){
    // //   this.showing = "filteredItems";
    // }
  }
  filterItems(searchTerm){
    return this.products.filter((product) => {
      let model = product.payload.doc.data().model;
        return model.toLowerCase().includes(searchTerm.toLowerCase());
    });
  }

}
