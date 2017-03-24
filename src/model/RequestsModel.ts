import {Component} from '@angular/core';
import { NavController, NavParams, ViewController, Events, PopoverController } from 'ionic-angular';
import { DemoServices } from '../providers/demo.service';

@Component({
    selector: 'all-request',
    //templateUrl: './navbar.html'
   
})

export class allRequests {
    id: number;
    user: any;
    user_role: string;
    vendor_detail: any[];
    no_vehicle: number;
    vehicle_type: string;
    depart_location: any;
    delivery_location: any;
    depart_datetime: string;
    expected_datetime: string;
    vehicle_distribution: any[];

    constructor(public navParams: NavParams,public navCtrl: NavController,public demoServices : DemoServices) {
        
    }


}
