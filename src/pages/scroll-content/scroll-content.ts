import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { Content } from 'ionic-angular';


/**
 * Generated class for the ScrollContentPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-scroll-content',
  templateUrl: 'scroll-content.html',
})
export class ScrollContentPage {

  @ViewChild(Content) content: Content;

  constructor(public navCtrl: NavController, public navParams: NavParams, private platform: Platform) {
  }

  ionViewDidLoad() {

    if (this.platform.is('mobileweb') && this.platform.is('ios')) {

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
  }

}
