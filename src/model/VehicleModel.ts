import { Injectable, Inject, Optional } from '@angular/core';
import { GateInOutComponent } from '../pages/track/gate-in-out/gate-in-out.component';
import { GPSTrackComponent } from '../pages/track/GPS/GPS-track.component';
import { LoadingComponent } from '../pages/track/loading/loading.component';
import { ActivityModel } from '../model/TimelineModel';

@Injectable()
export class Vehicle {

    id: number;
    vehicle_no: string;
    driver_name: string;
    driver_number: string;

    device_id: string = '';
    gps_mobile: string='';

    latitude: string= '';
    longitude: string = '';

    unTagged:boolean = false;

    activity: ActivityModel[] = [];
    request_id: number;
    supervisor_id: number;
    vendor_id: number;
    


    constructor() {

    }


    clone() {
        return JSON.parse(JSON.stringify(this));
    }
}