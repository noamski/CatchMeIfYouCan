/**
 * Created by AdamBS on 3/3/2017.
 */

import { Component, ViewChild } from '@angular/core';
import { Platform, MenuController, Nav, NavController } from 'ionic-angular';
import { StatusBar, Splashscreen, Geolocation, Facebook, NativeStorage } from 'ionic-native';

import { HelloIonicPage } from '../hello-ionic/hello-ionic';
import { ListPage } from '../list/list';
import { LoginPage } from '../login-page/login-page';
import { ContactListPage } from '../contact-list/contact-list';

@Component({
  selector: 'home-page',
  templateUrl: 'home.html'
})
export class Home {
  @ViewChild(Nav) nav: Nav;

  // make HelloIonicPage the root (or first) page
  rootPage: any = HelloIonicPage;
  pages: Array<{title: string, component: any}>;

  constructor(
    public platform: Platform,
    public menu: MenuController,
    public navCtrl: NavController
  ) {
    this.initializeApp();

    // set our app's pages
    this.pages = [
      { title: 'Hello Ionic', component: HelloIonicPage },
      { title: 'My First List', component: ListPage },
      { title: 'Contact List', component: ContactListPage }
    ];
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
      Splashscreen.hide();
    });
  }

  openPage(page) {
    // close the menu when clicking a link from the menu
    this.menu.close();
    // navigate to the new page if it is not the current page
    this.nav.setRoot(page.component);

    Geolocation.getCurrentPosition().then((resp) => {

      console.log(resp.coords);
    }).catch((error) => {
      console.log('Error getting location', error);
    });
  }

  logOff() {
    var nav = this.navCtrl;
    Facebook.logout()
      .then(function(response) {
        //user logged out so we will remove him from the NativeStorage
        NativeStorage.remove('user');
        nav.push(LoginPage);
      }, function(error){
        console.log(error);
      });
  }
}
