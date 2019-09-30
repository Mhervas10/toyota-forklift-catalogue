import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import * as firebase from 'firebase/app';
import 'firebase/storage';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  private snapshotChangesSubscription: any;
  public favorites: Array<any>=[];
  public currentForklift;

  constructor(
    public afs: AngularFirestore,
    public afAuth: AngularFireAuth
  ){}

  getForklifts(){
    return new Promise<any>((resolve, reject) => {
      this.afAuth.user.subscribe(currentUser => {
        if(currentUser){
          this.snapshotChangesSubscription = this.afs.collection('people').doc(currentUser.uid).collection('forklifts').snapshotChanges();
          resolve(this.snapshotChangesSubscription);
        }
      })
    })
  }

  
  setCurrentForklift(forklift){
     this.currentForklift = forklift;
     console.log(" El forklift seleccionado es: " ,this.currentForklift)
  }
  
  getCurrentForklift(){
    return this.currentForklift;
  } 

  unsubscribeOnLogOut(){
    //remember to unsubscribe from the snapshotChanges
    this.snapshotChangesSubscription.unsubscribe();
  }

  updateForklift(forkliftKey, value){
    return new Promise<any>((resolve, reject) => {
      let currentUser = firebase.auth().currentUser;
      this.afs.collection('people').doc(currentUser.uid).collection('forklifts').doc(forkliftKey).set(value)
      .then(
        res => resolve(res),
        err => reject(err)
      )
    })
  }

  deleteForklift(forkliftKey){
    return new Promise<any>((resolve, reject) => {
      let currentUser = firebase.auth().currentUser;
      this.afs.collection('people').doc(currentUser.uid).collection('forklifts').doc(forkliftKey).delete()
      .then(
        res => resolve(res),
        err => reject(err)
      )
    })
  }

  createForklift(value){
    return new Promise<any>((resolve, reject) => {
      let currentUser = firebase.auth().currentUser;
      this.afs.collection('people').doc(currentUser.uid).collection('forklifts').add({
        model: value.model,
        image: value.image,
        loadCapacity: value.loadCapacity,
        aisleWidthForPallets: value.aisleWidthForPallets,
        gradeabilityWithLoad: value.gradeabilityWithLoad,
        gradeabilityWithoutLoad: value.gradeabilityWithoutLoad,
        driveMotorRating: value.driveMotorRating,
        voltage: value.voltage,
        price: value.price
      })
      .then(
        res => resolve(res),
        err => reject(err)
      )
    })
  }

  encodeImageUri(imageUri, callback) {
    var c = document.createElement('canvas');
    var ctx = c.getContext("2d");
    var img = new Image();
    img.onload = function () {
      var aux:any = this;
      c.width = aux.width;
      c.height = aux.height;
      ctx.drawImage(img, 0, 0);
      var dataURL = c.toDataURL("image/jpeg");
      callback(dataURL);
    };
    img.src = imageUri;
  };

  uploadImage(imageURI, randomId){
    return new Promise<any>((resolve, reject) => {
      let storageRef = firebase.storage().ref();
      let imageRef = storageRef.child('image').child(randomId);
      this.encodeImageUri(imageURI, function(image64){
        imageRef.putString(image64, 'data_url')
        .then(snapshot => {
          snapshot.ref.getDownloadURL()
          .then(res => resolve(res))
        }, err => {
          reject(err);
        })
      })
    })
  }

  addFavorite(favorite){
    console.log("Favorito a añadir es ", favorite)
    console.log("Antes de añadir favoritos", this.favorites)
    this.favorites.push(favorite);
    console.log("Despues de añadir favoritos", this.favorites)

  }


  deleteCurrentFavoriteForklift(favorite){
    var i = this.favorites.indexOf(favorite);
    this.favorites.splice(i,1);
    console.log("Los favoritos son " ,this.favorites)
  }

  getFavorites(){
    console.log("Antes de devolver favoritos", this.favorites)
    return this.favorites;
  }
}
