import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';
import { AddVehicleComponent } from '../add-vehicle/add-vehicle.component';
import { DemoServices } from '../../../providers/demo.service';
import { CommonServices } from '../../../providers/common.service';
import { AuthServices } from '../../../providers/af.service';

@Component({
  selector: 'view-request',
  templateUrl: 'view-request.html'
})
export class ViewRequestComponent {
  requestDetail:any;
  addVehicle: any = AddVehicleComponent;
  item: any;
  indexno: any;
  vehicleArraySubscription;
  vendor_code: any;
  vehicleArray: any;

  // loading: boolean = true;

  constructor(private navController: NavController, private navParams: NavParams, private demoService: DemoServices, private commonServices: CommonServices, private auth: AuthServices) {

    this.vendor_code = this.commonServices.currentUser.vendor_code;
    console.log(navParams.data);

    // console.log(this.demoService.requestsArray[navParams.data]);
    this.requestDetail = navParams.data;
    
    this.indexno = navParams.data;
    this.addVehicle = AddVehicleComponent;
    console.log(navParams.data);

    // this.vehicleArray = this.demoService.vehicleArray
    //console.log(JSON.stringify(this.vehicleArray));
    //console.log(this.vehicleArray.vehicles.length);

    //     this.result = auth.chainData('vehicles', { orderByChild: 'vendor_id', equalTo: 4 },
    //   [
    //     { node: 'users', query: { orderByChild: 'id', equalToKey: 'supervisor_id', condition: 'equalTo', limitToFirst: 1 }, assignToKey: 'supervisor' },
    //     { node: 'sources', query: { orderByChild: 'plant_code', equalToKey: 'source_plant_code', condition: 'equalTo', limitToFirst: 1 }, assignToKey: 'source' },
    //     { node: 'vendor_distribution', query: { orderByChild: 'request_id', equalToKey: 'id', condition: 'equalTo', limitToFirst: 0 }, assignToKey: 'vendor_distribution' },
    //     { node: 'depots', query: { orderByChild: 'plant_code', equalToKey: 'destination_plant_code', condition: 'equalTo', limitToFirst: 1 }, assignToKey: 'destination' }
    //   ]);
    // this.result.subscribe(
    //   (item) => { console.log(item); 

    //   },
    //   (err) => { console.log(err); },
    //   (data) => { console.log(data); }
    // );

    this.auth.getData('/vehicles', data => {
      console.log(data);
      console.log(data.length);
      var roots = data.filter(function (x) {
        return (x.request_id == navParams.data.request_id);
      });
      console.log(roots);
      this.vehicleArray = roots;
    }, {
        orderByChild: 'vendor_id',
        equalTo: this.commonServices.currentUser.id
    });



    /*if (this.vehicleArray) {
      console.log('=== before susbcribe== ');
      this.vehicleArraySubscription = this.vehicleArray.subscribe(
        (item) => {
          console.log(item);
          alert(this.loading);
          this.loading = false;
          alert(this.loading);
        },
        (err) => { console.log(err); },
        (data) => { console.log(data); }
      );
    }*/
    
  }
  
ngOnDestroy() {
      // this.vehicleArraySubscription.unsubscribe();
    }
}
