import { Component, ViewChild } from '@angular/core';

import { Platform, MenuController, Nav } from 'ionic-angular';
import { StatusBar, Splashscreen, NativeStorage } from 'ionic-native';

import { Home } from '../pages/home/home';
import { LoginPage } from "../pages/login-page/login-page";

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
          env.nav.push(Home);
          Splashscreen.hide();
        }, function(error) {
          //we don't have the user data so we will ask him to log in
          env.nav.push(LoginPage);
          Splashscreen.hide();
        });

      StatusBar.styleDefault();
    });
  }
}
