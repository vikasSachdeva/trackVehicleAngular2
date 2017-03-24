import { Component, ElementRef, ViewChild } from '@angular/core';
import { NavController, NavParams, ViewController, Events, PopoverController } from 'ionic-angular';
import { PopoverPage } from '../facilities.component';
import { DemoServices } from '../../../providers/demo.service';
import { CommonServices } from '../../../providers/common.service';
import { Validators, FormBuilder } from '@angular/forms';
import { AuthServices } from '../../../providers/af.service';

@Component({
  selector: 'new-facilities',
  templateUrl: 'new-facilities.html'
})
export class NewFacilitiesComponent {

  facility: any = {};
  originalFacilities: any = {};
  title: string = "Add Facility";
  facilities: any;
  formFields: any;
  constructor(private formBuilder: FormBuilder, public navParams: NavParams, public navCtrl: NavController, private events: Events, public popoverCtrl: PopoverController, private demoService: DemoServices, public commonServices: CommonServices, private auth: AuthServices) {
    console.log(navParams.data);
    this.formFields = this.formBuilder.group({
      plant_name: ['', Validators.required],
      plant_code: ['', Validators.required],
      address: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      //   delivery_location: ['', Validators.required],
      //  depart_datetime: ['', Validators.required],

    });
    if (Object.keys(navParams.data).length) {
      this.title = "Edit Facility";
    }

    this.originalFacilities = navParams.data;
    console.log(this.originalFacilities);
   this.facility = this.commonServices.clone(this.originalFacilities);
  }

  saveFacility() {
    console.log('Save function called successfully' + JSON.stringify(this.facility));
    console.log(this.facility.id);
    // if (this.facility.id) {
    //   this.commonServices.sources[this.commonServices.sources.indexOf(this.originalFacilities)] = this.facility;
    // } else {
    //   console.log(this.commonServices.sources.length);
    //   this.facility.id = parseInt(this.commonServices.sources[this.commonServices.sources.length - 1].id) + 1;
    //   this.commonServices.sources[this.commonServices.sources.length] = this.facility;
    //   console.log(this.commonServices.sources.length);
    //   console.log(this.commonServices.sources);
    // }

    this.facility.longitude = "";
    this.facility.latitude = "";

    if (this.facility.id) {
       this.auth.updateData('/sources', this.facility, {
        orderByChild: 'id',
        equalTo: this.facility.id
      });
    }else{
    this.facility.address = this.facility.address;
    this.facility.city = this.facility.city;
    this.facility.state = this.facility.state;
    this.facility.id = this.commonServices.sources.length + 1;
    this.facility.plant_code = this.facility.plant_code;
    this.facility.plant_name = this.facility.plant_name;
    this.auth.pushData('/sources', this.facility);   
    }
    this.navCtrl.pop();
  }

}
