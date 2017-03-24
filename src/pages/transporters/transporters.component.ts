import { Component, ElementRef, ViewChild } from '@angular/core';
import { PopoverController, ViewController, Events, NavParams } from 'ionic-angular';
import { NewTransporterComponent } from './add-edit-transporter/new-transporter.component';
import { DemoServices } from '../../providers/demo.service';
import { CommonServices } from '../../providers/common.service';
import { AuthServices } from '../../providers/af.service';

@Component({
  selector: 'transporters',
  templateUrl: 'transporters.html',
})

export class TransportersComponent {

  user: any;
  addEditTransporter: any;
  item: any;
  transporterUsers: any;
  searchKeyword: any = '';
  sortBy: string = 'name';

  constructor(private afAuth: AuthServices, public popoverCtrl: PopoverController, private events: Events, private demoService: DemoServices, public commonServices: CommonServices) {
    this.addEditTransporter = NewTransporterComponent;
    this.afAuth.getData('/vendors', data => {
      console.log(data);
      console.log(data.length);
      this.transporterUsers = data;
    }, {});
    //this.transporterUsers = this.commonServices.vendorUsers;
    console.log(this.transporterUsers);

  }

   deleteTransporter(key) {
    console.log(key);
    this.commonServices.confirmAlert('Confirmation', 'Are you sure want to delete?', () => {
      console.log(key);
      if (key) {
        this.afAuth.deleteItem('/vendors', key);
      }
    });
  }

  ionViewDidLoad() {
    console.log('Manage Transporters');
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
    console.log(navParams.data);
  }

  close(data) {
    let publishEvent = this.navParams.data.publishEvent;
    if (publishEvent)
      this.events.publish(publishEvent, { action: data, refData: this.navParams.data.index });
    this.viewCtrl.dismiss();
  }
}


