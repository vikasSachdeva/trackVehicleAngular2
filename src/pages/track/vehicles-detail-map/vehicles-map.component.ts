import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { NavController, NavParams, PopoverController, ViewController, Events } from 'ionic-angular';
import { Geolocation } from 'ionic-native';
import { CommonServices } from '../../../providers/common.service';
import { Contact } from '../../../shared/sdk/';
import { AuthServices } from '../../../providers/af.service';
import { DomSanitizer } from '@angular/platform-browser';
import { SearchAnywherePipe } from '../../../pipes/search-anywhere.pipe';
import { DemoServices } from '../../../providers/demo.service';
declare var google;


@Component({
  selector: 'vehicles-map',
  templateUrl: 'vehicles-map.html'
})
export class VehiclesMapComponent implements OnInit {

  user: Contact;
  @ViewChild('map') mapElement: ElementRef;
  placesService: any;
  map: any;
  markers = {};
  MARKER_VEHICLE = 'vehicle';
  MARKER_SOURCE = 'source';
  MARKER_DESTINATION = 'destination';
  ROUTE_SOURCE = 'from_source';
  ROUTE_DESTINATION = 'to_destination';
  autocompleteResults: any[] = [];
  search: string = '';
  acService: any = new google.maps.places.AutocompleteService();;
  latLng: any;
  destinationLatLong:any;
  sourceLatLong:any;
  type: string = 'geocode';
  radius: number = 500;
  directionsService: any;
  icon: any;
  temp:any;
  tempSub:any;
  directionsDisplay = {};
  uniqueId: number = 1;

  historyArray: any[] = [];

  // constructor(public navCtrl: NavController,
  // private navParams: NavParams) {
  //   console.log(navParams.data);
  // }


  constructor(public navCtrl: NavController,
    private popoverCtrl: PopoverController,
    private sanitizer: DomSanitizer,
    private events: Events,
    private navParams: NavParams,
    private commonServices: CommonServices,
    private afAuth: AuthServices,
    private demoService: DemoServices) {
    this.directionsDisplay[this.ROUTE_SOURCE] = new google.maps.DirectionsRenderer();
    this.directionsDisplay[this.ROUTE_DESTINATION] = new google.maps.DirectionsRenderer();
      
    this.user = commonServices.currentUser;
    console.log(this.navParams);
    this.type = this.user.settings.mapType;
    this.radius = this.user.settings.mapRadius;
    let searchFilter = new SearchAnywherePipe();
    this.directionsService = new google.maps.DirectionsService();
  }

ngOnDestroy() {
      this.events.unsubscribe('coords_changed');
    }
  ngOnInit() {
    console.log('ngOnInit');
    this.events.subscribe('coords_changed', (data) => {
      this.navParams.data = data.filter(item=> item.id == this.navParams.data.id)[0];
      let lng1 = this.markers[this.MARKER_VEHICLE].getPosition().lng();
      let lat1 = this.markers[this.MARKER_VEHICLE].getPosition().lat();
      this.latLng = new google.maps.LatLng(this.navParams.data.latitude, this.navParams.data.longitude);
      
      if(lat1!=this.latLng.lat() || lng1!=this.latLng.lng()){
        
      this.markers[this.MARKER_VEHICLE].setPosition(this.latLng);
      // let lngi = this.latLng.lng();
      // let lati = this.latLng.lat();
      // let obj = {lat:lati,lng:lngi};
      // this.afAuth.pushData('/vehicles/'+this.navParams.data.$key+'/locationHistory',obj);
      // this.clearMarkers(this.MARKER_VEHICLE);
      // this.addMarker(this.latLng, `<h5 class="info-window">Current Location</h5><p>Driver Name:` + this.navParams.data.driver_name + `</p><p>Driver No.:` + this.navParams.data.driver_number + `</p><p>Vehicle Type: ` + this.filterRequestArray[0].vehicle_type + `</p><p>Vehicle No.: ` + this.navParams.data.vehicle_no + `</p>`, 'img/drawing1', this.MARKER_VEHICLE);
      this.historyArray = [];
      // for(let i in this.navParams.data.locationHistory){
        if(this.navParams.data.locationHistory){
      let waypointDistance = Math.floor(this.navParams.data.locationHistory.length/5);
      let unevenWaypointDistance  = this.navParams.data.locationHistory.length % 5;
      for(let i = 0; i < this.navParams.data.locationHistory.length; i=i + waypointDistance + unevenWaypointDistance > 0?1:0, unevenWaypointDistance--){
        this.historyArray.push({location:this.navParams.data.locationHistory[i],stopover: true});
      }
        }
      console.log(this.historyArray);
      let request2 = {
        origin: this.sourceLatLong,
        destination: this.latLng,
        waypoints: this.historyArray,
        travelMode: google.maps.TravelMode.DRIVING
      };
      this.createRoute(request2, this.ROUTE_SOURCE, '#FF0000');
      let request = {
        origin: this.latLng,
        destination: this.destinationLatLong,
        // waypoints: [{location: this.latLng, stopover: true}],
        travelMode: google.maps.TravelMode.DRIVING
      };
      this.createRoute(request, this.ROUTE_DESTINATION);

      let bounds = new google.maps.LatLngBounds();
      bounds.extend(this.latLng);
      bounds.extend(this.destinationLatLong);
      //console.log(bounds);
      //this.map.fitBounds(bounds);
      this.map.fitBounds(bounds);
       console.log(this.navParams.data);
       
    }
    });
    this.commonServices.accessLocation(() => this.loadMap(), (message) => { if (message == "") this.navCtrl.pop(); else alert(message); });
  }
  

  loadMap() {
    console.log(this.navParams.data);
    let searchFilter = new SearchAnywherePipe();
    console.log(JSON.stringify(this.demoService.requestsArray));
    console.log(JSON.stringify(this.navParams.data.request_id));
    
  

    
    this.sourceLatLong = { "lat": this.navParams.data.request.source.latitude, "lng": this.navParams.data.request.source.longitude };
    this.destinationLatLong = { "lat": this.navParams.data.request.destination.latitude, "lng": this.navParams.data.request.destination.longitude };

    // this.directionsService.setBounds()

    if (this.navParams.data.latitude != null && this.navParams.data.longitude != null && !this.navParams.data.unTagged) {
      this.latLng = new google.maps.LatLng(this.navParams.data.latitude, this.navParams.data.longitude);

      console.log(JSON.stringify(this.latLng));
      let mapOptions = {
        center: this.latLng,
        zoom: 15,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      }
      this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);

      this.addMarker(this.latLng, `<h5 class="info-window">Vehicle Location</h5><p>Driver Name:` + this.navParams.data.driver_name + `</p><p>Driver No.:` + this.navParams.data.driver_number + `</p><p>Vehicle Type: ` + this.navParams.data.request.vehicle_type + `</p><p>Vehicle No.: ` + this.navParams.data.vehicle_no + `</p>`, 'img/drawing1', this.MARKER_VEHICLE);
      this.addMarker(this.destinationLatLong, `<p>` + this.navParams.data.request.destination.plant_name + `</p>`, this.icon, this.MARKER_DESTINATION);
      this.addMarker(this.sourceLatLong, `<p>` + this.navParams.data.request.source.plant_name + `</p>`, this.icon, this.MARKER_SOURCE);
           if(this.navParams.data.locationHistory){
      let waypointDistance1 = Math.floor(this.navParams.data.locationHistory.length/5);
      let unevenWaypointDistance1  = this.navParams.data.locationHistory.length % 5;
      for(let i = 0; i < this.navParams.data.locationHistory.length; i=i + waypointDistance1 + unevenWaypointDistance1 > 0?1:0, unevenWaypointDistance1--){
        this.historyArray.push({location:this.navParams.data.locationHistory[i],stopover: true});
      }
           }
      // for(let i in this.navParams.data.locationHistory){
      //   this.historyArray.push({location:this.navParams.data.locationHistory[i],stopover: true});
      // }
      let request2 = {
        origin: this.sourceLatLong,
        destination: this.latLng,
        waypoints: this.historyArray,
        travelMode: google.maps.TravelMode.DRIVING
      };
      this.createRoute(request2, this.ROUTE_SOURCE, '#FF0000');

      let request = {
        origin: this.latLng,
        destination: this.destinationLatLong,
        // waypoints: [{location: this.latLng, stopover: true}],
        travelMode: google.maps.TravelMode.DRIVING
      };

      this.createRoute(request, this.ROUTE_DESTINATION);
      let bounds = new google.maps.LatLngBounds();
      bounds.extend(this.latLng);
      bounds.extend(this.destinationLatLong);
      this.map.fitBounds(bounds);

    } else {
        
      Geolocation.getCurrentPosition().then(position => {
        this.latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
        let mapOptions = {
          center: this.latLng,
          zoom: 15,
          mapTypeId: google.maps.MapTypeId.ROADMAP
        }
        this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
        console.log(this.map);
        this.addMarker(this.destinationLatLong, `<p>` + this.navParams.data.request.destination.plant_name + `</p>`, this.icon, this.MARKER_DESTINATION );
        this.addMarker(this.sourceLatLong, `<p>` + this.navParams.data.request.source.plant_name + `</p>`, this.icon, this.MARKER_SOURCE);

        let request = {
          origin: this.sourceLatLong,
          destination: this.destinationLatLong,
          travelMode: google.maps.TravelMode.DRIVING
        };
        this.createRoute(request, this.ROUTE_DESTINATION);
        let bounds = new google.maps.LatLngBounds();
        bounds.extend(this.sourceLatLong);
        bounds.extend(this.destinationLatLong);
        this.map.fitBounds(bounds);
      }
        , err => {
          console.log(err);
        });
    }

  }



  createRoute(request, id, color?): void {
    if (color) {
      this.directionsDisplay[id].setOptions({
        suppressInfoWindows: true,
        preserveViewport: true,
        suppressMarkers: true,
        polylineOptions: { strokeColor: color, strokeWeight: 2 }
      });
    } else {
      this.directionsDisplay[id].setOptions({
        suppressInfoWindows: true,
        suppressMarkers: true,
      });
    }
    this.directionsService.route(request, (response, status) => {
      console.log(response);
      console.log(status);
      if (status == google.maps.DirectionsStatus.OK) {
        this.directionsDisplay[id].setMap(this.map);
        this.directionsDisplay[id].setDirections(response);
      } else {
        alert("Directions failed ");
      }
    });

    // new google.maps.Polyline({
    //     map: this.map,
    //     strokeColor: '#FF0000',
    //     strokeOpacity: 1.0,
    //     strokeWeight: 2,  path: this.markers
    // });
  }



  goback() {
    this.navCtrl.pop();
  }


  addMarker(latLong, content, icon, id:string) {
    let marker = new google.maps.Marker({
      map: this.map,
      animation: google.maps.Animation.DROP,
      position: latLong,
      // icon: icon,
      // icon: this.navParams.data.latitude?'http://maps.google.com/mapfiles/kml/shapes/truck.png':'',
      // icon: 'http://maps.google.com/mapfiles/kml/shapes/truck.png',
      icon: {
        url: icon,
        scaledSize: new google.maps.Size(34, 44)
      }
    });
    
    this.markers[id] = marker;
    // if(id=='vehicle'){
    //   let lngi = latLong.lng();
    //   let lati = latLong.lat();
    //   let obj = {lat:lati,lng:lngi};
    //   console.log(obj);
    //   this.afAuth.pushData('/vehicles/'+this.navParams.data.$key+'/locationHistory',obj);
    // }
    this.addInfoWindow(marker, content);

  }

  // Removes the markers from the map, but keeps them in the array.
  clearMarkers(id) {
                this.markers[id].setMap(null);
  }
  
  addInfoWindow(marker, content) {
    let infoWindow = new google.maps.InfoWindow({
      content: content
    });
    google.maps.event.addListener(marker, 'click', () => {
      infoWindow.open(this.map, marker);
    });
    google.maps.event.trigger(marker, 'click');
  }


  presentPopover(ev) {
    let self = this;
    let popover = this.popoverCtrl.create(MapOptionsPopover, { type: self.type, radius: self.radius }, { enableBackdropDismiss: false });
    popover.onDidDismiss(data => {
      this.radius = data.radius;
      this.type = data.type;
    });
    popover.present({
      ev: ev
    });
  }
}

@Component({
  template: `
  <div padding>
  <ion-list>
  <ion-item>
    <ion-label>Type</ion-label>
    <ion-select [(ngModel)]="type">
      <ion-option value="establishment">Establishment</ion-option>
      <ion-option value="geocode">Geocode</ion-option>
      <ion-option value="regions">Regions</ion-option>
      <ion-option value="cities">Cities</ion-option>
    </ion-select>
  </ion-item>
  <ion-item>
    <ion-label fixed>Radius</ion-label>
    <ion-input type="number" [(ngModel)]="radius"></ion-input>
  </ion-item>
</ion-list>
<button ion-button block (click)="close({type:type, radius: radius})">Save & Close</button>
</div>
  `
})
export class MapOptionsPopover {
  type: string;
  radius: number
  constructor(private navParams: NavParams,
    private viewCtrl: ViewController) {

  }

  ngOnInit() {

    if (this.navParams.data) {
      this.type = this.navParams.data.type;
      this.radius = this.navParams.data.radius;
    }
  }
  close(data) {
    this.viewCtrl.dismiss(data);
  }


  ionViewDidLoad() {
    console.log('Hello ChatPage Page');
  }


}
