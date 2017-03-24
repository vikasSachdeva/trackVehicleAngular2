import { Injectable, Inject, Optional } from '@angular/core';
import { GateInOutComponent } from '../pages/track/gate-in-out/gate-in-out.component';
import { GPSTrackComponent } from '../pages/track/GPS/GPS-track.component';
import { LoadingComponent } from '../pages/track/loading/loading.component';
import { AuthServices } from '../providers/af.service';

@Injectable()
export class Timeline {
    types: string[] = ["source_arrival", "source_gate_in", "gps_tagged", "loading", "source_gate_out",
        "transporting", "destination_arrival", "destination_gate_in", "gps_untagged", "unloading", "pod", "destination_gate_out"]
    activities: ActivityModel[] = [];

    // constructor() {
    //     this.types.forEach(element => {
    //         this.activities.push(new ActivityModel(element));
    //     });
    // }
    getEmptyOptions() {
        return JSON.parse('{"01_source_arrival":false, "02_source_gate_in":false, "03_gps_tagged":false, "04_loading":false, "05_source_gate_out":false, "06_transporting":false, "07_destination_arrival":false, "08_destination_gate_in":false, "09_gps_untagged":false, "10_unloading":false, "11_pod":false, "12_destination_gate_out":false}');
    }

    getOptionTitle(type) {
        switch (type) {
            case "01_source_arrival":
                return "Arrival at source";
            case "02_source_gate_in":
                return "Source Gate In";
            case "03_gps_tagged":
                return "GPS TAGGED";
            case "04_loading":
                return "Loading and TAT";
            case "05_source_gate_out":
                return "Source Gate Out";
            case "06_transporting":
                return "In Transit";
            case "07_destination_arrival":
                return "Arrival at destination";
            case "08_destination_gate_in":
                return "Destination Gate In";
            case "09_gps_untagged":
                return "GPS device untagged";
            case "10_unloading":
                return "Unload and TAT";
            case "11_pod":
                return "POD Documentation";
            case "12_destination_gate_out":
                return "Destination Gate Out";
        }

    }
}


@Injectable()
export class ExportActivity {
    activities: ActivityModel;

    constructor(private af: AuthServices) {

    }

    getActivity(type, options) {
        return new ActivityModel(type, options);
    }
}


export class ActivityModel {
    title: string = null;
    type: string = null;
    autoStartNext: boolean = true;
    confirmationAlert: boolean = true;
    autoAlert: boolean = true;
    content: string = null;
    component: any = null;
    options: any = {};
    pageChecks: any = {};
    supervisor: any = null;


    constructor(type, options) {

        switch (type) {
            case "01_source_arrival":
                this.title = "Arrival at source";
                this.type = type;
                this.autoStartNext = true;
                this.confirmationAlert = true;
                this.content = null;
                this.component = null;
                // this.af.getData('/vehicles', vehicle => {
                //     console.log(vehicle);
                //     this.options = vehicle[0].activity.type;
                // }, {
                //     orderByChild: 'id',
                //     equalTo: id
                // });//{ start_time: null, end_time: null };
                this.options = options || { start_time: false, end_time: false };
                break;
            case "02_source_gate_in":
                this.title = "Source Gate In";
                this.type = type;
                this.autoStartNext = true;
                this.confirmationAlert = false;
                this.content = null;
                this.component = GateInOutComponent;
                this.pageChecks = { vehicle_condition: false, driver_identification: false };
                // this.af.getData('/vehicles', vehicle => {
                //     console.log(vehicle);
                //     this.options = vehicle[0].activity.type;
                // }, {
                //     orderByChild: 'id',
                //     equalTo: id
                // });//this.options = { start_time: null, end_time: null, isSource: true, isGateIn: true, set:[{isChecked:false , label: "Driver Identification"}, {isChecked:false , label: "Vehicle Condition"}] };
                this.options = options || { start_time: false, end_time: false, isSource: true, isGateIn: true, set: [{ isChecked: false, label: "Driver Identification" }, { isChecked: false, label: "Vehicle Condition" }] };
                break;
            case "03_gps_tagged":
                this.title = "GPS TAGGED";
                this.type = type;
                this.autoStartNext = true;
                this.confirmationAlert = false;
                this.content = null;
                this.component = GPSTrackComponent;
                this.supervisor = null;
                // this.af.getData('/vehicles', vehicle => {
                //     console.log(vehicle);
                //     this.options = vehicle[0].activity.type;
                // }, {
                //     orderByChild: 'id',
                //     equalTo: id
                // });//this.options = { start_time: null, end_time: null, data : {deviceId:null, gpsMobile:null } };
                this.options = options || { start_time: false, end_time: false, data: { deviceId: "", gpsMobile: "" } };
                break;
            case "04_loading":
                this.title = "Loading and TAT";
                this.type = type;
                this.autoStartNext = true;
                this.confirmationAlert = false;
                this.content = "Loading and TAT";
                this.component = LoadingComponent;
                // this.af.getData('/vehicles', vehicle => {
                //     console.log(vehicle);
                //     this.options = vehicle[0].activity.type;
                // }, {
                //     orderByChild: 'id',
                //     equalTo: id
                // });//this.options = { start_time: null, end_time: null, data : {type_of_goods:null }};
                this.options = options || { start_time: false, end_time: false, data: { type_of_goods: "" } };
                break;
            case "05_source_gate_out":
                this.title = "Source Gate Out";
                this.type = type;
                this.autoStartNext = true;
                this.confirmationAlert = false;
                this.content = "";
                this.component = GateInOutComponent;
                // this.af.getData('/vehicles', vehicle => {
                //     console.log(vehicle);
                //     this.options = vehicle[0].activity.type;
                // }, {
                //     orderByChild: 'id',
                //     equalTo: id
                // });//this.options = { start_time: null, end_time: null, isSource: true, isGateIn: false, set:[{isChecked:false , label: "Documents Verified"}, {isChecked:false , label: "Dispatched"}] }
                this.options = options || { start_time: false, end_time: false, isSource: true, isGateIn: false, set: [{ isChecked: false, label: "Documents Verified" }, { isChecked: false, label: "Dispatched" }] };
                break;
            case "06_transporting":
                this.title = "In Transit";
                this.type = type;
                this.autoStartNext = true;
                this.confirmationAlert = false;
                this.component = null;
                this.content = "Transporting...";
                // this.af.getData('/vehicles', vehicle => {
                //     console.log(vehicle);
                //     this.options = vehicle[0].activity.type;
                // }, {
                //     orderByChild: 'id',
                //     equalTo: id
                // });//this.options = { start_time: null, end_time: null };
                this.options = options || { start_time: false, end_time: false };
                break;
            case "07_destination_arrival":
                this.title = "Arrival at destination";
                this.type = type;
                this.autoStartNext = true;
                this.confirmationAlert = true;
                this.content = "Vehicle arrived at destination";
                this.autoAlert = true;
                this.component = null;
                // this.af.getData('/vehicles', vehicle => {
                //     console.log(vehicle);
                //     this.options = vehicle[0].activity.type;
                // }, {
                //     orderByChild: 'id',
                //     equalTo: id
                // });//this.options = { start_time: null, end_time: null };
                this.options = options || { start_time: false, end_time: false };
                break;
            case "08_destination_gate_in":
                this.title = "Destination Gate In";
                this.type = type;
                this.autoStartNext = true;
                this.confirmationAlert = false;
                this.content = "Entered inside destined facility";
                this.component = GateInOutComponent;
                // this.af.getData('/vehicles', vehicle => {
                //     console.log(vehicle);
                //     this.options = vehicle[0].activity.type;
                // }, {
                //     orderByChild: 'id',
                //     equalTo: id
                // });//this.options = { start_time: null, end_time: null, isSource: false, isGateIn: true, set:[{isChecked:false, label: "Driver identification"}, {isChecked:false , label: "Package verification"}] };
                this.options = options || { start_time: false, end_time: false, isSource: false, isGateIn: true, set: [{ isChecked: false, label: "Driver identification" }, { isChecked: false, label: "Package verification" }] };
                break;
            case "09_gps_untagged":
                this.title = "GPS device untagged";
                this.type = type;
                this.autoStartNext = true;
                this.confirmationAlert = true;
                this.content = "GPS Device untagged";
                this.component = null;
                // this.af.getData('/vehicles', vehicle => {
                //     console.log(vehicle);
                //     this.options = vehicle[0].activity.type;
                // }, {
                //     orderByChild: 'id',
                //     equalTo: id
                // });//this.options = { start_time: null, end_time: null };
                this.options = options || { start_time: false, end_time: false };
                break;
            case "10_unloading":
                this.title = "Unload and TAT";
                this.type = type;
                this.autoStartNext = true;
                this.confirmationAlert = true;
                this.content = "Entered inside destined facility";
                this.component = null;
                // this.af.getData('/vehicles', vehicle => {
                //     console.log(vehicle);
                //     this.options = vehicle[0].activity.type;
                // }, {
                //     orderByChild: 'id',
                //     equalTo: id
                // });//this.options = { start_time: null, end_time: null };
                this.options = options || { start_time: false, end_time: false };
                break;
            case "11_pod":
                this.title = "POD Documentation";
                this.type = type;
                this.autoStartNext = true;
                this.confirmationAlert = true;
                this.content = "Confirm Pod Document Recieved";
                this.component = null;
                // this.af.getData('/vehicles', vehicle => {
                //     console.log(vehicle);
                //     this.options = vehicle[0].activity.type;
                // }, {
                //     orderByChild: 'id',
                //     equalTo: id
                // });//this.options = { start_time: null, end_time: null };
                this.options = options || { start_time: false, end_time: false };
                break;
            case "12_destination_gate_out":
                this.title = "Destination Gate Out";
                this.type = type;
                this.autoStartNext = true;
                this.confirmationAlert = false;
                this.component = GateInOutComponent;
                // this.af.getData('/vehicles', vehicle => {
                //     console.log(vehicle);
                //     this.options = vehicle[0].activity.type;
                // }, {
                //     orderByChild: 'id',
                //     equalTo: id
                // });//this.options = { start_time: null, end_time: null, isSource: false, isGateIn: false, set:[{isChecked:false, label: "Package unload verification"}] }
                this.options = options || { start_time: false, end_time: false, isSource: false, isGateIn: false, set: [{ isChecked: false, label: "Package unload verification" }] };
                break;
        }
    }

    clone() {
        return JSON.parse(JSON.stringify(this));
    }
}