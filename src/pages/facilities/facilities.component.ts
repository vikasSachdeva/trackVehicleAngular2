import { Component, ElementRef, ViewChild } from '@angular/core';
import { PopoverController, ViewController, Events, NavParams } from 'ionic-angular';
import { NewFacilitiesComponent } from './add-edit-facilities/new-facilities.component';
import { DemoServices } from '../../providers/demo.service';
import { CommonServices } from '../../providers/common.service';
import { AuthServices } from '../../providers/af.service';

@Component({
  selector: 'facilities',
  templateUrl: 'facilities.html',
})
export class FacilitiesComponent {

  facility: any;
  addEditFacility: any;
  item: any;
  facilities: any;
  searchKeyword: any = '';
  sortBy: string = 'name';

  constructor(public popoverCtrl: PopoverController, private events: Events, private auth: AuthServices, private demoService: DemoServices, public commonServices: CommonServices) {
    this.addEditFacility = NewFacilitiesComponent;
    this.facilities = this.commonServices.sources;
  }

  deleteFacility(key) {
    console.log(key);
    this.commonServices.confirmAlert('Confirmation', 'Are you sure want to delete?', () => {
      console.log(key);
      if (key) {
        this.auth.deleteItem('/sources', key);
      }
    });
  }


  ionViewDidLoad() {
    console.log('Manage facilities');
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


