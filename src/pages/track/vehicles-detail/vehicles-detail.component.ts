import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, Events, AlertController ,Loading} from 'ionic-angular';
import { VehiclesMapComponent } from '../vehicles-detail-map/vehicles-map.component';
import { GateInOutComponent } from '../gate-in-out/gate-in-out.component';
import { GPSTrackComponent } from '../GPS/GPS-track.component';
import { Observable } from 'rxjs';
import { CommonServices } from '../../../providers/common.service';
import { Contact, Feed, FireLoopRef, RealTime } from '../../../shared/sdk';
import { DomSanitizer } from '@angular/platform-browser';
import { DemoServices } from '../../../providers/demo.service';
import { LoadingComponent } from '../loading/loading.component';
import { SearchAnywherePipe } from '../../../pipes/search-anywhere.pipe';
import { AuthServices } from '../../../providers/af.service';
import { ExportActivity } from '../../../model/TimelineModel';



@Component({
  selector: 'vehicles-detail',
  templateUrl: 'vehicles-detail.html'
})
export class VehiclesDetailComponent {
  detailMap: any;
  item: any;

  user: Contact;
  feedItem: Feed;
  mock: any;
  feed: Observable<Feed | Array<Feed>>;
  activities: Array<any>;
  activitiess: Array<any>;
  emptyActivitiess: any[];
  reference: FireLoopRef<Feed>;
  vehicle_detail;
  vehicleArray: any;
  temp: any;
  toggle: boolean;
  showVendorDetail: boolean;
  vendor: any;

   loading: Loading;
   vehicle_details: any[] = [5,6,7];
  constructor(
    public navCtrl: NavController,
    private navParams: NavParams,
    private loadingCtrl: LoadingController,
    private sanitizer: DomSanitizer,
    private commonServices: CommonServices,
    private exportActivity: ExportActivity,
    private rt: RealTime,
    private events: Events,
    private alertCtrl: AlertController,
    private auth: AuthServices,
    private demoService: DemoServices,
  ) {
    this.showVendorDetail = false;
    this.toggle = false;
    this.detailMap = VehiclesMapComponent;
    this.user = commonServices.currentUser;
    //this.vehicleArray = demoService.vehicleArray;
    this.vehicle_detail = navParams.data;
    console.log(this.vehicle_detail.activity);
    if(!this.vehicle_detail.activities){
      this.vehicle_detail.activities=[];
    }
    var id= this.vehicle_detail.id;
    for (var key in this.vehicle_detail.activity) {
      console.log(key);
     let v = this.exportActivity.getActivity(key,this.vehicle_detail.activity[key]);
      
      this.vehicle_detail.activities.push(v);
    }
    console.log(this.vehicle_detail.activities);


    // this.vehicle_detail = this.vehicle_detail.concat(this.vendor);
    // console.log(this.vehicle_detail);






        let Callback = (vendor) => {
        this.vendor = vendor;
        console.log(this.vendor);       
      };

    let vendorQuery = {
              orderByChild: 'id',
              equalTo: this.vehicle_detail.vendor_id,
              limitToFirst: 1,
            };

     this.vendor =  this.auth.getData('/vendors', vendor => {
      console.log(vendor);
      //this.vendor = vendor;
      Callback(vendor[0]);
      this.vehicle_detail.vendor = this.vendor;
      console.log(this.vendor);
      

    }, vendorQuery);
    


// this.vehicle_detail = Object.assign({}, this.vehicle_detail, this.vendor);
this.vehicle_detail.vendor = this.vendor;
console.log(this.vehicle_detail);
     
    



    this.events.subscribe('startNextActivity', data => {
      console.log(data);
      console.log(data.index < this.vehicle_detail.activities.length - 1);
      console.log(this.vehicle_detail.activities[data.index]);

      if (data.index < this.vehicle_detail.activities.length - 1 && this.vehicle_detail.activities[data.index].autoStartNext) {
        this.vehicle_detail.activities[data.index + 1].options.start_time = this.vehicle_detail.activities[data.index].options.end_time;
        this.vehicle_detail.activities[data.index+1].options.$key = this.vehicle_detail.activities[data.index+1].type;
        this.auth.updateData('/vehicles/'+ this.vehicle_detail.$key+'/activity', this.vehicle_detail.activities[data.index + 1].options);
      }
      this.vehicle_detail.currentActivityIndex = data.index + 1;
    });
    console.log(this.vehicle_detail);
    console.log(JSON.stringify(this.vehicle_detail.activities));

    this.activities = new Array();
    //   let subscription = Observable.of(this.activitiess).subscribe(
    //     value => this.activities.push(value),
    //   );
    // this.rt
    //   .onReady()
    //   .subscribe(() => { });
    // this.reference = this.rt.FireLoop.ref<Feed>(Feed);
    // this.feed = this.reference.on('change', { where: { and: [{ is_active: true }, { is_deleted: false }] }, include: ['contact', 'likes', 'comments'] });
    console.log("===$::::::::::>" + navParams.data);
  }

  togglePerform() {
    this.toggle = !this.toggle;
  }

  showVendorDiv() {
    this.showVendorDetail = !this.showVendorDetail;
  }

  confirmDialogBox(index) {
    console.log(index);
    // if start not open through previous (arrival at destionation)
    if (index == 6 && this.vehicle_detail.activities[index].options.start_time == false) {
      if (this.vehicle_detail.activities[index - 1].options.start_time == false) {
        return;
      }
      // this.vehicle_detail.activities[index].options.start_time = new Date();
    }
    if (index == 10 && this.vehicle_detail.activities[index].options.start_time == false) {
      if (this.vehicle_detail.activities[index - 1].options.end_time == false) {
        return;
      }
      this.vehicle_detail.activities[index].options.start_time = new Date();
    }


    var message = 'Do you want to confirm the ' + this.vehicle_detail.activities[index].title + ' ?';
    this.commonServices.confirmAlert('Confirmation', message, () => {
      console.log(index);
      this.vehicle_detail.activities[index].options.start_time = new Date();
      this.vehicle_detail.activities[index].content = 'Vehicle arrived';
      this.vehicle_detail.activities[index].options.end_time = new Date();
      this.events.publish('startNextActivity', { index: index });
      console.log('/vehicles/'+ this.vehicle_detail.$key+'/activity/'+this.vehicle_detail.activities[index].type);
      console.log(this.vehicle_detail.activities[index].options);
      this.vehicle_detail.activities[index].options.$key = this.vehicle_detail.activities[index].type;
      this.auth.updateData('/vehicles/'+ this.vehicle_detail.$key+'/activity', this.vehicle_detail.activities[index].options);
      if (index == 6) {
        this.vehicle_detail.activities[index - 1].options.end_time = this.vehicle_detail.activities[index].options.end_time;
        this.vehicle_detail.activities[index-1].options.$key = this.vehicle_detail.activities[index-1].type;
        this.auth.updateData('/vehicles/'+ this.vehicle_detail.$key+'/activity', this.vehicle_detail.activities[index - 1].options);
      }

      this.vehicle_detail.currentActivityIndex = index + 1;
      if (index == 8) {

        this.vehicle_detail.unTagged = true;
       
      }
    });


  }

  ngOnDestroy() {
    console.log("unsubscribe('startNextActivity')");
    this.events.unsubscribe('startNextActivity');
  }

  openPage(item: any, i) {
    console.log(i);
    console.log(item);
    if (item.options.start_time == false && item.options.end_time == false && (i != 0 && i != 6 || i == 5)) {
      console.log('entered');
      return;
    }
    if ((item.confirmationAlert && item.options.end_time == false)) {
      console.log('confirmDialogBox');
      this.confirmDialogBox(i);
    } else if ((!item.confirmationAlert)) {
      console.log('navCtrl.push');
      if (item.component) {
        this.navCtrl.push(item.component, {
          data: item,
          index: i,
          empArray: Object.assign({}, this.vehicle_detail),
        });
      }
    }
  }



  ionViewDidLoad() {
    console.log('Hello ChatPage Page');
  }

}




