import { Component } from '@angular/core';
import { NavController, NavParams,Events } from 'ionic-angular';
import { DemoServices } from '../../../providers/demo.service';
import { CommonServices } from '../../../providers/common.service';
import { AuthServices } from '../../../providers/af.service';

@Component({
  selector: 'loading',
  templateUrl: 'loading.html'
})
export class LoadingComponent {

  isSource: boolean;
  isGateIn: boolean;
  activity: any;
  copyItem: any;
  header: string = '';
  currentUser:any;

  constructor(public navCtrl:NavController, public navParam:NavParams,private commonServices: CommonServices, public events: Events,private auth: AuthServices) {
    this.activity = this.navParam.data.data.clone().options;
    console.log(this.navParam.data); 
       console.log( this.activity); 
    this.isSource = this.activity.isSource;
    this.isGateIn = this.activity.isGateIn;
    this.currentUser = this.commonServices.currentUser;

      
    // this.copyItem = this.activity.clone();
    this.header += this.isSource?"Source ":"Destination ";
    this.header += this.isGateIn?"Gate In":"Gate Out";   
  }
 

  saveLoading(data){
    console.log(this.navParam.data);    
   if( data){
            var index = this.navParam.data.index;
            this.navParam.data.empArray.activities[index].options.end_time = new Date();  
            this.navParam.data.empArray.activities[index].options.markedBy = this.currentUser.id;
            this.navParam.data.empArray.activities[index].options.data.type_of_goods = data;  
            this.events.publish('startNextActivity', {index: index});
            console.log('/vehicles/'+ this.navParam.data.empArray.$key+'/activity/'+this.navParam.data.empArray.activities[index].type);
            console.log(this.navParam.data.empArray.activities[index].options);
            this.navParam.data.empArray.activities[index].options.$key = this.navParam.data.empArray.activities[index].type;
            this.auth.updateData('/vehicles/'+ this.navParam.data.empArray.$key+'/activity',this.navParam.data.empArray.activities[index].options);
            //this.navParam.data.empArray.activities[index+1].options.start_time =  this.navParam.data.empArray.activities[index].options.end_time;
    }    
    this.navCtrl.pop();
  }

}


