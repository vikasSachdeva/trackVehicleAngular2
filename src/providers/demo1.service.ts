import { Injectable } from '@angular/core';
//import { LoadingController, AlertController, ToastController } from 'ionic-angular';
//import { DemoServices } from './demo.service';
//import { VehiclesMapComponent } from '../pages/track/vehicles-detail-map/vehicles-map.component';
//import { GateInOutComponent } from '../pages/track/gate-in-out/gate-in-out.component';
//import { GPSTrackComponent } from '../pages/track/GPS/GPS-track.component';

@Injectable()
export class Demo1Services {
   

    emptyActivitiessArray: any = [{
        start_time: null,
        end_time: null,
        title: "Arrival at source",
        autoStartNext: false,
        content: null,
       // component: GateInOutComponent,
        options: { isSource: false, isGateIn: false }
    }, {
        start_time: null,
        end_time: null,
        title: "Source Gate In",
        autoStartNext: false,
        content: null,
      // component: GateInOutComponent,
        options: { isSource: false, isGateIn: false }
    }, {
        start_time: null,
        end_time: null,
        title: "GPS TAGGED",
        autoStartNext: false,
        content: null,
        //component: GPSTrackComponent,
    }, {
        start_time: null,
        end_time: null,
        title: "Loading and TAT",
        autoStartNext: false,
        content: "Loading and TAT",
        // component: ArrivalTime
    }, {
        start_time: null,
        end_time: null,
        title: "Source Gate Out",
        autoStartNext: false,
        content: "",
        //component: GateInOutComponent,
        options: { isSource: false, isGateIn: false }
    }, {
        start_time: null,
        end_time: null,
        title: "In Transit",
        autoStartNext: false,
        content: "Transporting...",
        // component: ArrivalTime
    }, {
        start_time: null,
        end_time: null,
        title: "Arrival at destination",
        autoStartNext: false,
        content: "Vehicle arrived at destination",
        //component: GateInOutComponent,
        options: { isSource: false, isGateIn: true }
    }, {
        start_time: null,
        end_time: null,
        title: "Destination Gate In",
        autoStartNext: false,
        content: "Entered inside destined facility",
        //component: GateInOutComponent,
        options: { isSource: false, isGateIn: false }
    }, {
        start_time: null,
        end_time: null,
        title: "GPS device untagged",
        autoStartNext: false,
        content: "GPS Device untagged",
        // component: ArrivalTime
    }, {
        start_time: null,
        end_time: null,
        title: "Unload and TAT",
        autoStartNext: false,
        content: "Entered inside destined facility",
        // component: ArrivalTime
    }, {
        start_time: null,
        end_time: null,
        title: "POD Documentation",
        autoStartNext: false,
        content: "",
        // component: ArrivalTime
    }, {
        start_time: null,
        end_time: null,
        title: "Destination Gate Out",
        autoStartNext: false,
        //component: GateInOutComponent,
        options: { isSource: false, isGateIn: false }
    }];




   



    constructor(
        //public loadingCtrl: LoadingController,
        //public alertCtrl: AlertController,
       // public toastCtrl: ToastController
        )         {
    }
}