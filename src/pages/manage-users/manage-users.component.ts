import { Component, ElementRef, ViewChild } from '@angular/core';
import { PopoverController, ViewController, Events, NavParams } from 'ionic-angular';
import { NewUserComponent } from './add-edit-user/new-user.component';
import { DemoServices } from '../../providers/demo.service';
import { CommonServices } from '../../providers/common.service';
import { AuthServices } from '../../providers/af.service';

@Component({
  selector: 'manage-users',
  templateUrl: 'manage-users.html',
})


export class ManageUsersComponent {


  user: any;
  addEditUser: any;
  item: any;
  usersArray: any;
  usersearch: any = '';
  sortBy: string = 'name';




  constructor(public popoverCtrl: PopoverController, private events: Events, private demoService: DemoServices, public commonServices: CommonServices, private afAuth: AuthServices) {
    this.addEditUser = NewUserComponent;

    this.afAuth.getData('/users', data => {
      console.log(data);
      this.usersArray = data;
    }, {});
    // console.log(this.usersArray);

    this.events.subscribe('userStatusChanged', (data) => {
      console.log(data);
      if (data) {
        data.refData.status = data.action;
        console.log(data.refData); 
        this.afAuth.updateData(data.refData.role == 'vendor' ? 'vendors' : '/users', data.refData, {
          orderByChild:  'id',
          equalTo: data.refData.id
        });
        this.events.subscribe('userStatusChanged');
      }
    });

    // this.commonServices.getNextIncrementId('/users');

  }

    ngOnDestroy() {
      this.events.unsubscribe('userStatusChanged');
    }

  statusPopover(myEvent, obj) {
    console.log("Event");
    console.log(myEvent);
    console.log(obj);

    let popover = this.popoverCtrl.create(PopoverPage, {
      publishEvent: "userStatusChanged",
      values: [{ label: 'Activated', data: 'activated' }, { label: 'Deactivated', data: 'deactivated' }, { label: 'Suspended', data: 'suspended' }, { label: 'Deleted', data: 'deleted' }], obj: obj
    });
    popover.present({
      ev: myEvent
    });
  }

  deleteUser(key) {
    console.log(key);
    this.commonServices.confirmAlert('Confirmation', 'Are you sure want to delete?', () => {
      console.log(key);
      if (key) {
        this.afAuth.deleteItem('/users', key);
        // delete this.usersArray[key];
      }
    });
  }

  resetPassword(email:string) {
    console.log('== reset password');
    this.commonServices.confirmAlert('Confirmation', 'Are you sure want to send reset password email?', () => {
      console.log(email);
      if (email) {
        this.afAuth.resetPassword(email);
      }
    });
    
  }

  /*saveSetting1() {
    console.log('function called successfully');
  }*/


  ionViewDidLoad() {
    console.log('Manage Users');
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
    console.log(navParams.data);
    this.values = navParams.data.values;
    console.log(this.values);
  }

  close(data) {
    console.log(data);
    let publishEvent = this.navParams.data.publishEvent;
    console.log(publishEvent);
    console.log(this.navParams.data);
    if (publishEvent) {
      console.log('=== popover updated== ');
      this.events.publish(publishEvent, { action: data, refData: this.navParams.data.obj });
      this.viewCtrl.dismiss();
    }
  }
}


