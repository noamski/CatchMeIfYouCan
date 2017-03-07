/**
 * Created by AdamBS on 2/24/2017.
 */
import { Component } from '@angular/core';
import { Facebook, NativeStorage } from 'ionic-native';
import { NavController } from 'ionic-angular';
import { Home } from '../home/home';

@Component({
  selector: 'login-page',
  templateUrl: 'login-page.html'
})
export class LoginPage {
  FB_APP_ID: number = 1822852837963751;

  constructor(public navCtrl: NavController) {
    Facebook.browserInit(this.FB_APP_ID, "v2.8");
  }

  doFbLogin(){
    let permissions = new Array<string>();
    let nav = this.navCtrl;
    //the permissions your facebook app needs from the user
    permissions = ["public_profile"];

    Facebook.login(permissions)
      .then(function(response){
        let userId = response.authResponse.userID;
        let params = new Array<string>();

        //Getting name and gender properties
        Facebook.api("/me?fields=name,gender", params)
          .then(function(user) {
            user.picture = "https://graph.facebook.com/" + userId + "/picture?type=large";
            //now we have the users info, let's save it in the NativeStorage
            NativeStorage.setItem('user',
              {
                name: user.name,
                gender: user.gender,
                picture: user.picture
              })
              .then(function(){
                nav.push(Home);
              }, function (error) {
                console.log(error);
              })
          })
      }, function(error){
        console.log(error);
      });
  }
}
