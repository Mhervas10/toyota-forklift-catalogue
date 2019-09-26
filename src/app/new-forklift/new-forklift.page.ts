import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../services/firebase.service';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { LoadingController, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { ImagePicker } from '@ionic-native/image-picker/ngx';
import { WebView } from '@ionic-native/ionic-webview/ngx';
import { formatDate } from '@angular/common';


@Component({
  selector: 'app-new-forklift',
  templateUrl: './new-forklift.page.html',
  styleUrls: ['./new-forklift.page.scss'],
})
export class NewForkliftPage implements OnInit {

  validations_form: FormGroup;
  image: any;

  constructor(
    private imagePicker: ImagePicker,
    public toastCtrl: ToastController,
    public loadingCtrl: LoadingController,
    public router: Router,
    private formBuilder: FormBuilder,
    private firebaseService: FirebaseService,
    private webview: WebView
  ) { }

  ngOnInit() {
    this.resetFields();
  }

  resetFields(){
    this.validations_form = this.formBuilder.group({
      model: new FormControl('', Validators.required),
      loadCapacity: new FormControl('', Validators.required),
      aisleWidthForPallets: new FormControl('', Validators.required),
      gradeabilityWithLoad: new FormControl('', Validators.required),
      gradeabilityWithoutLoad: new FormControl('', Validators.required),
      driveMotorRating: new FormControl('', Validators.required),
      voltage: new FormControl('', Validators.required),
      price: new FormControl('', Validators.required),   
    });
  }

  onSubmit(value){

    const date = Date.now();

    let  formattedDate = formatDate(date, 'short', 'en-US');

    let image = `assets/imgs/${value.model}.jpg`
  

    let data = {
      model: value.model,
      image: image,
      loadCapacity: value.loadCapacity,
      aisleWidthForPallets: value.aisleWidthForPallets,
      gradeabilityWithLoad: value.gradeabilityWithLoad,
      gradeabilityWithoutLoad: value.gradeabilityWithoutLoad,
      driveMotorRating: value.driveMotorRating,
      voltage: value.voltage,
      price: value.price,
    }
    this.firebaseService.createForklift(data)
    .then(
      res => {
        this.router.navigate(["/products"]);
      }
    )
  }

  openImagePicker(){
    this.imagePicker.hasReadPermission()
    .then((result) => {
      if(result == false){
        // no callbacks required as this opens a popup which returns async
        this.imagePicker.requestReadPermission();
      }
      else if(result == true){
        this.imagePicker.getPictures({
          maximumImagesCount: 1
        }).then(
          (results) => {
            for (var i = 0; i < results.length; i++) {
              this.uploadImageToFirebase(results[i]);
            }
          }, (err) => console.log(err)
        );
      }
    }, (err) => {
      console.log(err);
    });
  }

  async uploadImageToFirebase(image){
    const loading = await this.loadingCtrl.create({
      message: 'Please wait...'
    });
    const toast = await this.toastCtrl.create({
      message: 'Image was updated successfully',
      duration: 3000
    });
    this.presentLoading(loading);
    let image_src = this.webview.convertFileSrc(image);
    let randomId = Math.random().toString(36).substr(2, 5);

    //uploads img to firebase storage
    this.firebaseService.uploadImage(image_src, randomId)
    .then(photoURL => {
      this.image = photoURL;
      loading.dismiss();
      toast.present();
    }, err =>{
      console.log(err);
    })
  }

  async presentLoading(loading) {
    return await loading.present();
  }

}
