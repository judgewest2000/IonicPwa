import { Component, ElementRef, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, Loading } from 'ionic-angular';

import fixOrientation from 'fix-orientation';


/**
 * Generated class for the CameraPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-camera',
  templateUrl: 'camera.html',
})
export class CameraPage {

  @ViewChild('inputcamera') cameraInput: ElementRef;

  @ViewChild('imgresult') imgResult: ElementRef;

  img = '';

  displayCard() {
    return this.img !== '';
  }

  constructor(public navCtrl: NavController, public navParams: NavParams, private loadingCtrl: LoadingController) {
  }

  loading = (() => {
    let loadMessage: Loading;

    return {
      turnOn: () => {
        loadMessage = this.loadingCtrl.create({
          content: 'Please Wait, doing something awesome'
        });
        loadMessage.present();
      },
      turnOff: () => loadMessage.dismiss()
    };

  })();

  ionViewDidLoad() {

    //MY BIT
    const element = this.cameraInput.nativeElement as HTMLInputElement;
    element.onchange = () => {

      this.loading.turnOn();

      const reader = new FileReader();

      reader.onload = (r: any) => {

        //THIS IS THE ORIGINAL BASE64 STRING AS SNAPPED FROM THE CAMERA
        //THIS IS PROBABLY THE ONE TO UPLOAD BACK TO YOUR DB AS IT'S UNALTERED
        //UP TO YOU, NOT REALLY BOTHERED
        let base64 = r.target.result as string;

        //FIXING ORIENTATION USING NPM PLUGIN fix-orientation
        fixOrientation(base64, { image: true }, (fixed: string, image: any) => {
          //fixed IS THE NEW VERSION FOR DISPLAY PURPOSES
          this.img = fixed;

          this.loading.turnOff();
        });

      };

      reader.readAsDataURL(element.files[0]);
    };


  }

}
