import { Component } from '@angular/core';
import {  PopoverController, ViewController, Events, NavParams, NavController } from 'ionic-angular';
import { ViewRequestComponent } from './view/view-request.component';
import { DemoServices } from '../../providers/demo.service';
import { CommonServices } from '../../providers/common.service';
import { SearchAnywherePipe } from '../../pipes/search-anywhere.pipe';
import { AuthServices } from '../../providers/af.service';


@Component({
  selector: 'vendor-requests',
  templateUrl: 'vendor-requests.html'
})
export class VendorRequestsComponent {
  ViewRequest: any;
  item: any;
  vendorRequestsArray:any;
  vendor_code:any;
  result:any;
  loading: boolean = true;
  constructor(private demoService:DemoServices, private commonServices: CommonServices,private auth: AuthServices) {
  this.vendor_code = this.commonServices.currentUser.vendor_code;
        this.ViewRequest=ViewRequestComponent;
        // this.demoService.requestsArray.vendorVechicles="";
        // let searchFilter = new SearchAnywherePipe();
       // this.vendorRequestsArray = searchFilter.transform(this.demoService.requestsArray, 'filter', '"vendor_code":"'+this.commonServices.currentUser.vendor_code+'"');
        

 
    this.vendorRequestsArray = auth.chainData('vendor_distribution', { orderByChild: 'vendor_code', equalTo:this.commonServices.currentUser.vendor_code},
      [
        { node: 'requests', query: { orderByChild: 'id', equalToKey: 'request_id', condition: 'equalTo', limitToFirst: 1 }, assignToKey: 'request',
          childNodes: [
            { node: 'sources', query: { orderByChild: 'plant_code', equalToKey: 'source_plant_code', condition: 'equalTo', limitToFirst: 1 }, assignToKey: 'source' },
            { node: 'depots', query: { orderByChild: 'plant_code', equalToKey: 'destination_plant_code', condition: 'equalTo', limitToFirst: 1 }, assignToKey: 'destination' },
            { node: 'users', query: { orderByChild: 'id', equalToKey: 'supervisor_id', condition: 'equalTo', limitToFirst: 1 }, assignToKey: 'supervisor' }
            ]
    
   },
        
      ]);


    this.vendorRequestsArray.subscribe(
      (item) => { 
        console.log(item); 
        this.loading=false;
         // alert(this.loading);
      },
      (err) => { console.log(err); },
      (data) => { console.log(data); }
    );

    console.log(this.vendorRequestsArray);
   
  }


}
