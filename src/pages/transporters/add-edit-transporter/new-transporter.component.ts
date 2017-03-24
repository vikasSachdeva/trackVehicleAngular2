import { Component, ElementRef, ViewChild } from '@angular/core';
import { NavController, NavParams, ViewController, Events, PopoverController } from 'ionic-angular';
import { PopoverPage } from '../transporters.component';
import { DemoServices } from '../../../providers/demo.service';
import { CommonServices, formValidator } from '../../../providers/common.service';
import { Validators, FormBuilder } from '@angular/forms';
import { AuthServices } from '../../../providers/af.service';

@Component({
  selector: 'new-transporter',
  templateUrl: 'new-transporter.html'
})
export class NewTransporterComponent {

  transporter: any = {};
  originalTransporter: any = {};
  title: string = "Add Transporter";
  transporters: any;
  formFields: any;
  constructor(private afAuth: AuthServices, private formBuilder: FormBuilder, public navParams: NavParams, public navCtrl: NavController, private events: Events, public popoverCtrl: PopoverController, private demoService: DemoServices, public commonServices: CommonServices, public fValid: formValidator) {
    console.log(navParams.data);
    this.formFields = this.formBuilder.group({
      name: ['', Validators.required],
      vendor_code: ['', Validators.required],
      address_line1: ['', Validators.required],
      address_line2: [''],
      mobile: [''],
      pin: [''],
      pan: [''],
      tin: [''],
      cst_no: [''],
      st_reg_no: [''],
      city: ['', Validators.required],
      email: ['', Validators.compose([Validators.required, Validators.minLength(5), fValid.isValidMailFormat])],
      vendor_category: [''],
      contact_person: ['', Validators.required],
      contact_email: ['', Validators.compose([Validators.required, Validators.minLength(5), fValid.isValidMailFormat])],
      contact_phone: ['', Validators.required],
       state: ['', Validators.required]
    });

    this.afAuth.getData('/vendors', data => {
      console.log(data);
      console.log(data.length);
      this.transporters = data;
    }, {});
    //this.transporters = this.commonServices.vendorUsers;


    if (Object.keys(navParams.data).length) {
      this.title = "Edit Transporter";
    }

    this.originalTransporter = navParams.data;
    this.transporter = this.commonServices.clone(this.originalTransporter);
  }

  saveTransporter() {
    console.log('Save function called successfully' + JSON.stringify(this.transporter));
    // if (this.transporter.id) {
    //   this.commonServices.vendorUsers[this.commonServices.vendorUsers.indexOf(this.originalTransporter)] = this.transporter;
    // } else {
    //   console.log(this.commonServices.vendorUsers[this.commonServices.vendorUsers.length - 1]);
    //   this.transporter.id = parseInt(this.commonServices.vendorUsers[this.commonServices.vendorUsers.length - 1].id) + 1;
    //   this.commonServices.vendorUsers[this.commonServices.vendorUsers.length] = this.transporter;
    //   console.log(this.commonServices.vendorUsers);
    // }

    console.log("lngth==" + this.transporters.length);

    if (this.transporter.id) {
      this.afAuth.updateData('/vendors', this.transporter, {
        orderByChild: 'id',
        equalTo: this.transporter.id
      });
    } else {
      this.transporter.id = this.transporters.length + 1;
      this.transporter.city = this.transporter.city;
      this.transporter.address_line1 = this.transporter.address_line1;
      this.transporter.address_line2 = this.transporter.address_line2;
      this.transporter.contact_email = this.transporter.contact_email;
      this.transporter.contact_person = this.transporter.contact_person;
      this.transporter.contact_phone = this.transporter.contact_phone;
      this.transporter.cst_no = this.transporter.cst_no;
      this.transporter.contact_email = this.transporter.contact_email;
      this.transporter.email = this.transporter.email;
      this.transporter.mobile = this.transporter.mobile;
      this.transporter.name = this.transporter.name;
      this.transporter.pan = this.transporter.pan;
      this.transporter.password = "12345";
      this.transporter.picture = "";
      this.transporter.role = "vendor";
      this.transporter.pin = this.transporter.pin;
      this.transporter.st_reg_no = this.transporter.st_reg_no;
      this.transporter.state = this.transporter.state;
      this.transporter.tin = this.transporter.tin;
      this.transporter.vendor_category = this.transporter.vendor_category;
      this.transporter.vendor_code = this.transporter.vendor_code;
      this.afAuth.pushData('/vendors', this.transporter);
    }

    this.navCtrl.pop();
  }

}
