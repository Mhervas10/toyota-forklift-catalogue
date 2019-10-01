import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { LoadingController } from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';
import { Product } from '../_interfaces/product.interface';
import FORKLIFTS from './../../assets/data/forklifts.json';
import { MenuController } from '@ionic/angular';

import { FirebaseService } from '../services/firebase.service';


@Component({
  selector: 'app-products',
  templateUrl: './products.page.html',
  styleUrls: ['./products.page.scss'],
})
export class ProductsPage implements OnInit {

  forkliftList = FORKLIFTS ;
  products: Product[];
  searchTerm: string = "";
  filteredItems: Product[];
  knobValues: any = {
    upper:0,
    lower:200
  }
 busqueda = "";
items:any;

  constructor(
    public loadingCtrl: LoadingController,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private menuCtrl: MenuController,
    private firebaseService: FirebaseService

  ) { }

  ngOnInit() {
    this.forkliftList = FORKLIFTS as any;
    this.initializaedItems();

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
        // Clean data from firebase
        this.products = [];      
        for (let i = 0; i < data.length; i++) {   
          this.products[i] = data[i].payload.doc.data();  
        }
      console.log("Los productos son: ", this.products);
    })
  });
}

  async presentLoading(loading) {
    return await loading.present();
  }

initializaedItems(){
  this.items = this.forkliftList;
}

getItems (ev:any){
  this.initializaedItems();
  let val = ev.target.value;
  if (val && val.trim() != ''){
    this.items = this.items.filter((item) => {
      return (item.model.toLowerCase().indexOf(val.toLowerCase()) > -1);
    })
  }
}


  logout(){
    this.authService.doLogout()
    .then(res => {
      this.router.navigate(["/login"]);
    }, err => {
      console.log(err);
    })
  }

  goToDetail(forklift) {
    this.firebaseService.setCurrentForklift(forklift);
    this.router.navigate(['/forkLiftDetails']);
    console.log(this.forkliftList);
  }

}
