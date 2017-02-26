import { Component, OnInit, ViewChild } from '@angular/core';

import { Platform, MenuController, Nav } from 'ionic-angular';

import { StatusBar, Splashscreen, Geolocation } from 'ionic-native';

import { FacebookService } from '../services/facebook.service/facebook.service'

import { HelloIonicPage } from '../pages/hello-ionic/hello-ionic';
import { ListPage } from '../pages/list/list';
import { ContactListPage } from '../pages/contact-list/contact-list';
import { LoginPage } from '../pages/login-page/login-page';

@Component({
  templateUrl: 'app.html',
  providers: [FacebookService]
})
export class MyApp implements OnInit {
  @ViewChild(Nav) nav: Nav;

  // make HelloIonicPage the root (or first) page
  rootPage: any = HelloIonicPage;
  pages: Array<{title: string, component: any}>;

  constructor(
    public platform: Platform,
    public menu: MenuController
  ) {
    this.initializeApp();

    // set our app's pages
    this.pages = [
      { title: 'Hello Ionic', component: HelloIonicPage },
      { title: 'My First List', component: ListPage },
      { title: 'Login Page', component: LoginPage },
      { title: 'Contact List', component: ContactListPage }
    ];
  }

  ngOnInit(){
    this._facebookService.loadAndInitFBSDK();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
      Splashscreen.hide();
    });
  }

  login(){
    var self = this;
    FB.login(function(response) {
      if (response.authResponse) {
        FB.api('/me', function(response) {
          self._ngZone.run(() => {
            self.name = response.name;
            self.isUser = true
          });
        });
      }else{
        console.log('User cancelled login or did not fully authorize.');
      }
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
