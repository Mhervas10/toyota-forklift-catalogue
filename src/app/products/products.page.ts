import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { LoadingController } from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';
import { Product } from '../_interfaces/product.interface';
import FORKLIFTS from './../../assets/data/forklifts.json';
import { MenuController } from '@ionic/angular';
import { VirtualTimeScheduler } from 'rxjs';
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
  searchededItems: Product[];
  filteredItems = [];
  selectedItems = [];
  showing: string = "products";
  status: string = 'products';

  knobValues: any = {
    upper:0,
    lower:200
  }
  filters = [
    {
      value:1600,
      isChecked:false
    },{
      value:1800,
      isChecked:false
    },{
      value:2000,
      isChecked:false
    },{
      value:3000,
      isChecked:false
    },{
      value:4000,
      isChecked:false
    },{
      value:4500,
      isChecked:false
    },{
      value:4990,
      isChecked:false
    },
  ];

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

<<<<<<< src/app/products/products.page.ts
 
=======
>>>>>>> src/app/products/products.page.ts

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



setSearchedItems() {
  console.log("Searching term: ", this.searchTerm);
  this.searchededItems = this.searchItems(this.searchTerm);
  if(this.searchededItems.length > 0) {
    this.status = 'search';
    console.log("status: ", this.status);
  }
  else {
    this.status = 'products';
    console.log("status: ", this.status);
  }
}

searchItems(searchTerm){
  return this.products.filter((item) => {
    let model = item.model;
       return model.toLowerCase().includes(searchTerm.toLowerCase());
   });
}
checkboxClicked(filterClicked){
  console.log("Filters BEFORE toggle: ", this.filters);
  filterClicked.isChecked = !filterClicked.isChecked;
  console.log("Filters AFTER toggle: ", this.filters);

  // Get filtered Products
  this.filteredItems = [];
  //Search activated checkboxs
  this.filters.map((filter) => {
    if(filter.isChecked) {
      // Add products to filteredItems array
      let productsFound = this.items.filter((product) => {
           return product.loadCapacity == filter.value;
       });
       this.filteredItems.push(...productsFound);
    }
  });
  // Update page status
  console.log("items filtrados son: ", this.filteredItems);
  if(this.filteredItems.length > 0) {
    this.status = "filter";
    console.log("status: ", this.status);
  }
  else {
    this.status = 'products';
    console.log("status: ", this.status);
  }
}
}

