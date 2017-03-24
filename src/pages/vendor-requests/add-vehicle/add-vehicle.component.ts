import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';
import { DemoServices } from '../../../providers/demo.service';
import { Vehicle } from '../../../model/VehicleModel';
import { CommonServices } from '../../../providers/common.service';
import { SearchAnywherePipe } from '../../../pipes/search-anywhere.pipe';
import { FormBuilder, Validators } from '@angular/forms'
import { AuthServices } from '../../../providers/af.service';

@Component({
  selector: 'add-vehicle',
  templateUrl: 'add-vehicle.html'
})
export class AddVehicleComponent {
  requestDetail;
  vehicles: Vehicle[] = [];
  errorMsg: any = [];
  vehicle_no: any;
  index_no: any;
  available_id: any;
  vehicle_count: any;

  constructor(private navController: NavController, private navParams: NavParams, private commonServices: CommonServices, private demoService: DemoServices, private auth: AuthServices) {
    console.log(navParams.data);
    this.requestDetail = navParams.data;
    /*
    this.index_no = navParams.data;
    this.requestDetail = navParams.data;
    this.vehicle_count = navParams.data.vehicle_count;
    console.log(navParams.data);
    this.requestDetail.vendor_applied = [];
    let searchFilter = new SearchAnywherePipe();
     let fitered_vehicle_distribution = searchFilter.transform(this.requestDetail.vehicle_distribution, 'filter', 'vendor_code":"'+this.commonServices.currentUser.vendor_code);
      console.log(fitered_vehicle_distribution);
      this.vehicle_no = parseInt(fitered_vehicle_distribution[0].no_vehicle);
    this.vehicle_no = this.requestDetail.vendorVechicles;
    console.log(this.vehicle_no);
        
*/
    // this.auth.getData('/vehicles', data => {
    //       console.log(data);
    //       console.log("available id", data[0].id+1);
    //       this.available_id = data[0].id+1;
    //     }, {
    //         orderByChild: 'id',
    //         limitToLast: 1
    //       });
    for (var i = 0; i < navParams.data.vehicle_count; i++) {
      console.log(this.vehicles);
      let vehicle = new Vehicle();
      //  vehicle.id = i+4;
      vehicle.id = Math.floor(1000 + Math.random() * 9000);
      console.log(vehicle.id);
      vehicle.request_id = this.requestDetail.request_id;
      vehicle.supervisor_id = this.requestDetail.request.supervisor.id;
      vehicle.vendor_id = this.commonServices.currentUser.id;
      vehicle.activity = demoService.newTimeLine().getEmptyOptions();
      this.vehicles.push(vehicle);

    }

  }
  validateFunction(vehicleArr, index) {
    if (vehicleArr.vehicle_no == undefined || vehicleArr.vehicle_no == '')
    { return false; }
    else if (vehicleArr.driver_name == undefined || vehicleArr.driver_name == '')
    { return false; }
    else if (vehicleArr.driver_number == undefined || vehicleArr.driver_number == '')
    { return false; }
    else { return true; }
  }
  saveVehicle() {

    console.log(JSON.stringify(this.vehicles));
    this.errorMsg = [];
    let Vehicleserror: boolean;
    for (var i = 0; i < this.vehicles.length; i++) {

      Vehicleserror = this.validateFunction(this.vehicles[i], i);
      let Vehicleserrormsg = Vehicleserror ? '' : 'All fields are required';
      this.errorMsg.push({ "msg": Vehicleserrormsg });

    } if (Vehicleserror) {
      // this.demoService.vehicleArray.vehicles = this.demoService.vehicleArray.vehicles.concat(this.vehicles);
      for (let i = 0; i < this.vehicles.length; i++) {
        this.auth.pushData('vehicles', this.vehicles[i]);
      }
      //this.demoService.vehicleArray.requests[this.requestDetail.id] = this.commonServices.clone(this.requestDetail);
      //this.demoService.vehicleArray.users[this.commonServices.currentUser.id] = this.commonServices.clone(this.commonServices.currentUser);
      //this.demoService.vehicleArray.users[this.requestDetail.user.id] = this.commonServices.clone(this.requestDetail.user);
      console.log(JSON.stringify(this.vehicles));
      this.navController.pop();
    } else {
      console.log(JSON.stringify(this.errorMsg));
    }
  }
}
