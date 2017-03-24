import { Component } from '@angular/core';
import { NavController, NavParams, Events } from 'ionic-angular';
import { SearchAnywherePipe } from '../../../pipes/search-anywhere.pipe';
import { DemoServices } from '../../../providers/demo.service';
import { CommonServices } from '../../../providers/common.service';
import { AuthServices } from '../../../providers/af.service';

@Component({
  selector: 'gate-in-out',
  templateUrl: 'gate-in-out.html'
})
export class GateInOutComponent {

  isSource: boolean;
  isGateIn: boolean;
  activity: any;
  copyItem: any;
  header: string = '';
  supervisor: string='';
   
  currentUser:any;
  emptyActivities: any;
  constructor(public navCtrl: NavController, public navParam: NavParams, private events: Events,public commonServices:CommonServices,private auth: AuthServices) {
    console.log(this.navParam.data);
    console.log(this.navParam.data.data.options);
    this.activity = this.navParam.data.data.clone();  



    console.log(this.activity);
    if(this.navParam.data.data.supervisor!=null){
      this.supervisor = this.navParam.data.data.supervisor;
    }
    this.currentUser = this.commonServices.currentUser;
    this.isSource = this.activity.options.isSource;
    this.isGateIn = this.activity.options.isGateIn;

    this.header += this.isSource ? "Source " : "Destination ";
    this.header += this.isGateIn ? "Gate In" : "Gate Out";
  }

  hideButton(getData) {
    if (getData.options.start_time != false && getData.options.end_time != false) {
      return false;
    }
    return true;
  }

  saveData() {
    console.log(this.activity.options);
    console.log(this.navParam.data);
    let index = this.navParam.data.index;
    let completedFields = true;
    this.navParam.data.empArray.activities[index].options = this.activity.options;
    this.navParam.data.empArray.activities[index].options.set.forEach(element => {
      if (!element.isChecked) {
        completedFields = false;
      }

    });
    if (completedFields) {
       console.log(this.currentUser);
        this.navParam.data.empArray.activities[index].options.end_time = new Date();
        this.navParam.data.empArray.activities[index].options.markedBy = this.currentUser.name;
        this.events.publish('startNextActivity', {index: index});
        console.log('/vehicles/'+ this.navParam.data.empArray.$key+'/activity/'+this.navParam.data.empArray.activities[index].type);
        console.log(this.navParam.data.empArray.activities[index].options);
        this.navParam.data.empArray.activities[index].options.$key = this.navParam.data.empArray.activities[index].type;
        this.auth.updateData('/vehicles/'+ this.navParam.data.empArray.$key+'/activity',this.navParam.data.empArray.activities[index].options);
      this.navParam.data.empArray.completed = index+1;
    }
    this.navCtrl.pop();
  }

}


