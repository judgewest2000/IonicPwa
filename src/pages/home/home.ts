import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { Content } from 'ionic-angular';

/**
 * Generated class for the HomePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  @ViewChild(Content) content: Content;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private platform: Platform) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HomePage');

    const scrollElement = this.content.getScrollElement();

    scrollElement.scrollTo(0, 1);

    this.content.ionScrollEnd.subscribe(evt => {
      if ((this.content.contentHeight + 1) < scrollElement.scrollHeight) {

        if (scrollElement.scrollTop === 0) {
          scrollElement.scrollTo(0, 1);
        }
        else if ((scrollElement.scrollTop + this.content.contentHeight) === scrollElement.scrollHeight) {
          scrollElement.scrollTo(0, (scrollElement.scrollTop - 1));
        }
      };
    });
  }

  gotoCamera() {
    this.navCtrl.push('CameraPage');
  }

  gotoScrollContent(){
    this.navCtrl.push('ScrollContentPage');
  }

}
