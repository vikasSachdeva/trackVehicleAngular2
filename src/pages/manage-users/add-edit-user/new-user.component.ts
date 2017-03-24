import { Component, ElementRef, ViewChild } from '@angular/core';
import { NavController, NavParams, ViewController, Events, PopoverController } from 'ionic-angular';
import { PopoverPage } from '../manage-users.component';
import { DemoServices } from '../../../providers/demo.service';
import { CommonServices, formValidator } from '../../../providers/common.service';
import {Validators, FormBuilder } from '@angular/forms';
import { AuthServices } from '../../../providers/af.service';
@Component({
  selector: 'new-user',
  templateUrl: 'new-user.html'
})
export class NewUserComponent {

  user: any = {};
  originalUser: any = {};
  title: string = "Add User";
  // usersArray: any;
formFields:any;
constructor(  private afAuth: AuthServices, private formBuilder: FormBuilder,public navParams: NavParams, public navCtrl: NavController, private events: Events, public popoverCtrl: PopoverController, private demoService: DemoServices, public commonServices: CommonServices, public fValid: formValidator) {
    console.log(navParams.data);

    this.formFields = this.formBuilder.group({
        name: ['', Validators.required],
        status: ['', Validators.required],
        address: ['', Validators.required],
        email: ['', Validators.compose([Validators.required, Validators.minLength(5), fValid.isValidMailFormat])],
        mobile: ['', Validators.required],
        password: [],
    });
    
    if (Object.keys(navParams.data).length) {
      this.title = "Edit User";
    }

    this.originalUser = navParams.data;
    this.user         = this.commonServices.clone(this.originalUser);  
    console.log(this.user);
    
    this.events.subscribe('userRoleChanged', (data) => {
        console.log(data);
        this.user.role = data.action;
        console.log(JSON.stringify(data.action));
      });
    }

    ngOnDestroy() {
      this.events.unsubscribe('userRoleChanged');
    }

  saveUser() {
    // let abc = this.commonServices.getNextIncrementId('/users');
    // console.log(abc);
    console.log('Save function called successfully' + JSON.stringify(this.user));    
    if (this.user.id || this.user.$key) {
        this.afAuth.updateData(this.user.role=='vendor'?'vendors':'/users', this.user, {
            orderByChild: 'email',
            equalTo: this.user.email
        });
    } else {
        // create authentication user
        this.afAuth.signupUser(this.user.email, this.user.password).then(data => {
          console.log(data);
          // push/insert user data in users node
          // this.user.id = this.commonServices.users.length + 1;
          this.user.picture = null;
          this.user.gcmId = null;
          this.afAuth.pushData(this.user.role=='vendor'?'vendors':'/users', this.user);
        }, err => {
          console.log(err);
          alert(err.message);
        });
    }    
    // back to list page
    this.navCtrl.pop();
  }

  rolePopover(myEvent) {
    console.log('rolePopover event called');
    let popover = this.popoverCtrl.create(PopoverPage, {
      publishEvent: "userRoleChanged",
      values: [{ label: 'Admin', data: 'admin' }, { label: 'Supervisor', data: 'supervisor' }, { label: 'Vendor', data: 'vendor' }, { label: 'Security', data: 'security' }]
    });
    popover.present({
      ev: myEvent
    });
  }
}
