import { Component, ElementRef, ViewChild } from '@angular/core';
import { NavController, NavParams, ViewController, Events, PopoverController } from 'ionic-angular';
import { PopoverPage } from '../delivery-points.component';
import { DemoServices } from '../../../providers/demo.service';
import { CommonServices } from '../../../providers/common.service';
import { Validators, FormBuilder } from '@angular/forms';
import { AuthServices } from '../../../providers/af.service';


@Component({
  selector: 'new-delivery-point',
  templateUrl: 'new-delivery-point.html'
})
export class NewDeliveryPointComponent {

  deliveryPoint: any = {};
  originalDepot: any = {};
  title: string = "Add Delivery Point";
  deliveryDepots: any;

  formFields: any;
  constructor(private formBuilder: FormBuilder, public navParams: NavParams, public navCtrl: NavController, private events: Events, public popoverCtrl: PopoverController, private demoService: DemoServices, public commonServices: CommonServices, private auth: AuthServices) {
     console.log(navParams.data);
    this.formFields = this.formBuilder.group({
      plant_name: ['', Validators.required],
      plant_code: ['', Validators.required],
      address: ['', Validators.required],
      city: ['', Validators.required],
       state: ['', Validators.required],
    });
    console.log(navParams.data);
    
    if (Object.keys(navParams.data).length) {
      this.title = "Edit Delivery Point";
    }

    this.originalDepot = navParams.data;
    this.deliveryPoint = this.commonServices.clone(this.originalDepot);
     console.log(this.deliveryPoint);
  }

  saveDepot() {
    console.log('Save function called successfully' + JSON.stringify(this.deliveryPoint));
    this.deliveryPoint.longitude = "";
    this.deliveryPoint.latitude = "";
    
    if (this.deliveryPoint.id) {
      this.auth.updateData('/depots', this.deliveryPoint, {
        orderByChild: 'id',
        equalTo: this.deliveryPoint.id
      });
    } else {
      this.deliveryPoint.address = this.deliveryPoint.address;
      this.deliveryPoint.city = this.deliveryPoint.city;
      this.deliveryPoint.state = this.deliveryPoint.state;
      this.deliveryPoint.id = this.commonServices.depots.length + 1;
      this.deliveryPoint.plant_code = this.deliveryPoint.plant_code;
      this.deliveryPoint.plant_name = this.deliveryPoint.plant_name;
      this.auth.pushData('/depots', this.deliveryPoint);
    }

    this.navCtrl.pop();

  }

}
