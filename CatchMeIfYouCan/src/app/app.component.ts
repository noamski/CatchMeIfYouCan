import { Component, ViewChild } from '@angular/core';

import { Platform, MenuController, Nav } from 'ionic-angular';
import { StatusBar, Splashscreen, Geolocation, Facebook, NativeStorage } from 'ionic-native';

import { HelloIonicPage } from '../pages/hello-ionic/hello-ionic';
import { ListPage } from '../pages/list/list';
import { ContactListPage } from '../pages/contact-list/contact-list';
import {LoginPage} from "../pages/login-page/login-page";

@Component({
  templateUrl: 'app.html'
})
export class MyApp {

  @ViewChild(Nav) nav: Nav;
  rootPage: any;

  pages: Array<{title: string, component: any}>;

  constructor(
    public platform: Platform,
    public menu: MenuController
  ) {
    platform.ready().then(() => {

      // Here we will check if the user is already logged in
      // because we don't want to ask users to log in each time they open the app
      let env = this;
      NativeStorage.getItem('user')
        .then(function (data){
          // user is previously logged and we have his data
          // we will let him access the app
          env.nav.push(HelloIonicPage);
          Splashscreen.hide();
        }, function(error) {
          //we don't have the user data so we will ask him to log in
          env.nav.push(LoginPage);
          Splashscreen.hide();
        });

      StatusBar.styleDefault();
    });
    //
    // set our app's pages
    // this.pages = [
    //   { title: 'Hello Ionic', component: HelloIonicPage },
    //   { title: 'My First List', component: ListPage },
    //   { title: 'Contact List', component: ContactListPage }
    // ];
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
}

/**
 * api token
 **/
