/**
 * Created by Noam on 26/02/2017.
 */

import {Component, ViewChild, ElementRef} from '@angular/core';
import {NavController, Platform} from "ionic-angular";
import {GoogleMap, GoogleMapsMarker, GoogleMapsLatLng, GoogleMapsEvent, Geolocation} from "ionic-native";

declare var google;
@Component({
  selector: 'geomap',
  templateUrl: 'geomap.component.html'
})
export class GeoMapComponent {

  // REF TO ELEMENT ON PAGE
  @ViewChild('map') mapElement: ElementRef;
   map: any;

  constructor(private navCtrl: NavController, private platform: Platform) {
  }

  /**
   * Gets promise of coordinates of the device
   * @returns {Promise<Coordinates>|Promise<Geoposition>|Promise<TResult2|Coordinates>}
   */
  private getPosition() {
    return Geolocation.getCurrentPosition()
      .then(function (data) {
        return data.coords;
      });
  }

  /** BUILT IN FUNCTION IN IONIC THAT I OVERRIDE
   * Basically checks which device you are and sets google map accordingly, browser not done yet
   */
  ionViewDidLoad(){
    this.platform.ready().then(() => {
      if (!this.platform.is('os') && !this.platform.is('android')) {
        this.setupGoogleMapOnWeb(this.getPosition())
      } else {
        this.setupGoogleMapOnDevice(this.getPosition());
      }
    });
  }

  /**
   * Sets on device (not browser) the google map using the plugin
   * @param coords
   */
  setupGoogleMapOnDevice(coords) {
    // somewhere in your component
    this.map = new GoogleMap('map');

    let marker = new GoogleMapsMarker(this.map);
    marker.setTitle("Teste");
    let latLng = new GoogleMapsLatLng(coords.latitude, coords.longitude);
    marker.setPosition(latLng);

    this.map.setCenter(latLng);
    this.map.setZoom(15);

    this.map.on(GoogleMapsEvent.MAP_READY)
      .subscribe(() => console.log("Map is ready!"));
  }

  /**
   * Sets on browser, NOT DONE YET
   * @param coords
   */
  setupGoogleMapOnWeb(coords) {
    let latLng = new google.maps.LatLng(coords.latitude, coords.longitude);
    let mapOptions = {
      center: latLng,
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    }

    this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
  }
}
