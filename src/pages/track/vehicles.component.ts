import { Component } from '@angular/core';
import { NavController, NavParams, Keyboard, Events } from 'ionic-angular';
import { VehiclesDetailComponent } from './vehicles-detail/vehicles-detail.component';
import { DemoServices } from '../../providers/demo.service';
import { AuthServices } from '../../providers/af.service';
import { CommonServices } from '../../providers/common.service';
import { ExportModule } from '../../app/exp.module';
import { ExportActivity } from '../../model/TimelineModel';


@Component({
  selector: 'vehicles',
  templateUrl: 'vehicles.html'
})
export class VehiclesComponent {
  detailPage: any;
  vehicleArray: any;
  usersearch: any = '';
  sortBy: string = '';
  title: string;
  searchBar: string;
  result;
  activitiesLength:number;
  vehicleArraySubscription;
  loading: boolean = true;
  vehicle: any;
  currentActivity: any;



  constructor(public navParams: NavParams, public navCtrl: NavController, private events: Events, private exportActivity: ExportActivity, private auth: AuthServices, private demoService: DemoServices, private commonServices: CommonServices) {

    this.detailPage = VehiclesDetailComponent;
    this.vehicleArray = auth.chainData('vehicles', { orderByChild: 'supervisor_id', equalTo: this.commonServices.currentUser.id },
      [
        { node: 'users', query: { orderByChild: 'id', equalToKey: 'supervisor_id', condition: 'equalTo', limitToFirst: 1 }, assignToKey: 'supervisor' },
        {
          node: 'requests', query: { orderByChild: 'id', equalToKey: 'request_id', condition: 'equalTo', limitToFirst: 1 }, assignToKey: 'request',
          childNodes: [
            { node: 'sources', query: { orderByChild: 'plant_code', equalToKey: 'source_plant_code', condition: 'equalTo', limitToFirst: 1 }, assignToKey: 'source' },
            { node: 'depots', query: { orderByChild: 'plant_code', equalToKey: 'destination_plant_code', condition: 'equalTo', limitToFirst: 1 }, assignToKey: 'destination' },
          ]
        },

      ]);
        this.activitiesLength = Object.keys(this.demoService.newTimeLine().getEmptyOptions()).length;
      


    this.vehicleArraySubscription = this.vehicleArray.subscribe(
      (items) => {
        console.log(items);     
        this.events.publish('coords_changed', items);
        this.loading=false
      },

      (err) => { console.log(err); },
      (data) => { console.log(data); }

    );
   
    console.log(this.vehicleArray);
 


    // this.events.subscribe('datamodified', (result) => {
    //   console.log(result.action);
    //   for (var i = 0; i < demoService.vehicleArray.length; i++) {
    //     if (demoService.vehicleArray[i].id == result.action.id) {
    //       demoService.vehicleArray[i] == result.action;
    //       demoService.vehicleArray[i].activity = result.action.activity;
    //     }
    //   }
    //   console.log(demoService.vehicleArray);
    // });
  }

  getStatus(vehicle, fetchLable) {
    if (!vehicle.activity['01_source_arrival'].start_time) {
      return fetchLable?this.demoService.newTimeLine().getOptionTitle('01_source_arrival'):1;
    } else if(vehicle.activity['12_destination_gate_out'].start_time && vehicle.activity['12_destination_gate_out'].end_time){
     return fetchLable?"Finished":12;
    }

    for (let key in vehicle.activity) {
      if (vehicle.activity[key].start_time && !vehicle.activity[key].end_time) {
        return fetchLable?this.demoService.newTimeLine().getOptionTitle(key):Object.keys(vehicle.activity).indexOf(key)+1;
      }
    }
  }


  ngOnDestroy() {
    this.vehicleArraySubscription.unsubscribe();
  }

  back() {
    this.navCtrl.pop();
  }

  ionViewDidLoad() {
    console.log(this.navParams.data);
    this.title = this.navParams.data.title;
    this.searchBar = this.navParams.data.searchBar
    if (this.navParams.data.id) {
      this.usersearch = '"request_id":' + this.navParams.data.id;
    }


    //console.log("::::::::::::::::::"+vehicleArray);
  }
  // openPage2(opencmp){
  // this.demoService.openPage2(opencmp);
  // }




}
