import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { DemoServices } from '../../../providers/demo.service';
import { CommonServices } from '../../../providers/common.service';
import { PopoverController, ViewController, Events, NavParams } from 'ionic-angular';
import { SearchAnywherePipe } from '../../../pipes/search-anywhere.pipe';
import { Validators, FormBuilder } from '@angular/forms';
import { AuthServices } from '../../../providers/af.service';


@Component({
  selector: 'new-request',
  templateUrl: 'new-request.html'
})
export class NewRequestComponent {
  //request: any = { vendor_code: {}, vehicle_count: {} };
  request: any = {};
  dropdownArray: any;
  formFields: any;
  requestsArray:any[];


  constructor(private formBuilder: FormBuilder,
    public popoverCtrl: PopoverController,
    private events: Events,
    public navCtrl: NavController,
    private auth: AuthServices,
    public demoService: DemoServices,
    public commonServices: CommonServices) {
    this.formFields = this.formBuilder.group({
      vehicle_type: ['', Validators.required],
      vehicle_count: ['', Validators.required],
      source_plant_code: ['', Validators.required],
      expected_datetime: ['', Validators.required],
      destination_plant_code: ['', Validators.required],
      depart_datetime: ['', Validators.required],

    });
   this.auth.getData('/requests', data => {
      // console.log(data);
      // console.log(data.length);
      this.requestsArray = data;
    }, {});
    //let searchFilter = new SearchAnywherePipe();
    //  this.dropdownArray = searchFilter.transform(this.commonServices.depots, 'orderBy', '"vendor_name":"'+this.commonServices.currentUser.vendor_name+'"');

    //   this.events.subscribe('vendorChanged', (data) => {
    // console.log(JSON.stringify(this.dropdownArray));
    //   if (data) {
    //       this.request.vendor_name = data.action;
    //    }
    // });

  }

  saveSetting1() {
    console.log('function called successfully');
  }

  saveRequest() {
    console.log(this.request);
    //let vendorName = {"vendor_detail":{"name":''}};
    //this.request['vendor_detail']['name']="";
    // let searchFilter = new SearchAnywherePipe();
    this.request.id = this.requestsArray.length + 1;
    this.request.supervisor_id = this.commonServices.currentUser.id;
    console.log(this.commonServices.currentUser.$key);
    //delete this.request.user.$key;
    //delete this.request.user.$exists;
     let delivery_location = this.commonServices.depots.filter(item => item.plant_code == this.request.destination_plant_code)[0];
    let source_plant = this.commonServices.sources.filter(item => item.plant_code == this.request.source_plant_code)[0];
    console.log("this.request.delivery_location" + this.request.destination_plant_code);
    let vehicles_distributioncity = this.commonServices.vendor_share.filter(item => item.source == source_plant.city);
      console.log("this.request.vehicles_distributioncity" + JSON.stringify(vehicles_distributioncity));
    let vehiclesDistributionArray = vehicles_distributioncity.filter(item => item.destination == delivery_location.city);
    console.log("this.request.vehiclesDistributionArray" + JSON.stringify(vehiclesDistributionArray));
  
    let distribution = [];
    let balancer = 0;
    for (var i = 0; i < vehiclesDistributionArray.length; i++) {
      let share = vehiclesDistributionArray[i].share.replace(/%\s?/g, '') / 100;
      console.log(share);
      console.log(share % 1);
      let currentBalancer = 0;
      if (share * this.request.vehicle_count % 1 !== 0) {
        balancer = balancer > 0 ? 0 : 1;
        console.log(balancer);
        currentBalancer = balancer;
      }
      console.log(share);
      let vehicleCount = Math.floor(this.request.vehicle_count * share) + currentBalancer;
      let vendor_code = vehiclesDistributionArray[i].vendor_code;
      if (vehicleCount > 0) {
        distribution.push({ "vendor_code": vendor_code, "vehicle_count": vehicleCount ,"request_id":this.request.id});
      }
    }
    console.log(distribution);
    //this.request.vehicle_distribution = distribution;
    //console.log(this.request.vehicle_distribution);
    //this.request.vehicles_distribution.push(distribution);
    console.log(this.request);

   this.auth.pushData('/requests', this.request);
   for(var i=0; i< distribution.length;i++){
   this.auth.pushData('/vendor_distribution', distribution[i]);
   }
    //this.demoService.requestsArray.push(this.request);
    this.navCtrl.pop();
  }

  vendorRequestPopover(myEvent, index) {
    console.log("Event");
    console.log(myEvent);
    let popover = this.popoverCtrl.create(PopoverPage, {
      publishEvent: "vendorChanged",
      values: [{ label: 'India Transport', data: '0' }, { label: 'New India Transport', data: 1 }, { label: 'New India Transport', data: 2 }, { label: 'India Transport', data: 3 }], index: index
    });
    popover.present({
      ev: myEvent
    });

  }

}

@Component({
  template: `
    <ion-list class="status-list">
      <button ion-item *ngFor="let value of values;" (click)="close(value.data)">{{value.label}}</button>
    </ion-list>
  `
})
export class PopoverPage {
  values: any[];
  constructor(public viewCtrl: ViewController, private events: Events, private navParams: NavParams) {
    this.values = navParams.data.values;
    console.log(this.values);
  }

  close(data) {
    console.log(data);
    let publishEvent = this.navParams.data.publishEvent;
    if (publishEvent)
      this.events.publish(publishEvent, { action: data });

    this.viewCtrl.dismiss();
  }
}


