import { Component } from '@angular/core';
import { Events } from 'ionic-angular';
import { NewRequestComponent } from './new/new-request.component';
import { DemoServices } from '../../providers/demo.service';
import { CommonServices } from '../../providers/common.service';
import { AuthServices } from '../../providers/af.service';
import { VehiclesComponent } from '../track/vehicles.component';


@Component({
  selector: 'requests',
  templateUrl: 'requests.html'
})
export class RequestsComponent {


  newRequest: any;
  item: any;
  requestsArray: any;
  usersearch: any = '';
  sortBy: string = 'vehicle_count';
  result;
  resultSubscription;
  loading: boolean = true;
  vehiclesComponent:any;


  constructor(private demoService: DemoServices,
    private auth: AuthServices,
    private events: Events,
    private commonServices: CommonServices) {
    this.newRequest = NewRequestComponent;
    this.vehiclesComponent = VehiclesComponent;
    //this.requestsArray = demoService.requestsArray;

    this.result = auth.chainData('requests', { orderByChild: 'supervisor_id', equalTo: this.commonServices.currentUser.id },
      [
        { node: 'vehicles', query: { orderByChild: 'request_id', equalToKey: 'id', condition: 'equalTo', limitToFirst: 0 }, assignToKey: 'vehicles' },
        { node: 'users', query: { orderByChild: 'id', equalToKey: 'supervisor_id', condition: 'equalTo', limitToFirst: 1 }, assignToKey: 'supervisor' },
        { node: 'sources', query: { orderByChild: 'plant_code', equalToKey: 'source_plant_code', condition: 'equalTo', limitToFirst: 1 }, assignToKey: 'source' },
        { node: 'depots', query: { orderByChild: 'plant_code', equalToKey: 'destination_plant_code', condition: 'equalTo', limitToFirst: 1 }, assignToKey: 'destination' },
        { node: 'vendor_distribution', query: { orderByChild: 'request_id', equalToKey: 'id', condition: 'equalTo', limitToFirst: 0 }, assignToKey: 'vendor_distribution' }
      ]);
    this.resultSubscription = this.result.subscribe(
      (item) => {
        console.log(item);
        this.loading = false;
        // alert(this.loading);
        // this.events.publish('hogya');
      },
      (err) => { console.log(err); },
      (data) => { console.log(data); }
    );

    console.log(this.result);
    console.log(typeof this.result);
  }


  ngOnDestroy() {
    this.resultSubscription.unsubscribe();
  }


  saveSetting1() {
    console.log('function called successfully');
  }




}
