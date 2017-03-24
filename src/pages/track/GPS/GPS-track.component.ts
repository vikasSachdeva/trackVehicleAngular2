import { Component } from '@angular/core';
import { NavController, NavParams, Events } from 'ionic-angular';
import { DemoServices } from '../../../providers/demo.service';
import { CommonServices } from '../../../providers/common.service';
import { AuthServices } from '../../../providers/af.service';

@Component({
	selector: 'GPS-track',
	templateUrl: 'GPS-track.html'
})
export class GPSTrackComponent {

	activity;
	currentUser: any;

	constructor(public navCtrl: NavController, public navParam: NavParams, public events: Events, private commonServices: CommonServices,private auth: AuthServices) {

		this.currentUser = this.commonServices.currentUser;
		console.log(navParam.data);
		this.activity = navParam.data.data.clone().options;
		console.log(this.activity);
	}

	tagGPS(index, empArray) {

		if (this.activity.data.deviceId != null
			&& this.activity.data.gpsMobile != null) {
			let index = this.navParam.data.index;
			this.activity.end_time = new Date();
			console.log(this.activity);

			this.activity.markedBy = this.currentUser.id;
			this.navParam.data.empArray.activities[index].options = this.activity;

			this.navParam.data.empArray.device_id = this.navParam.data.empArray.activities[index].options.data.deviceId;
			this.navParam.data.empArray.gps_mobile = this.navParam.data.empArray.activities[index].options.data.gpsMobile;
			this.navParam.data.empArray.latitude = "21.1702401";//"28.0796097";
			this.navParam.data.empArray.longitude = "72.8310607";//"78.78675897";
			this.navParam.data.empArray.unTagged = false;
			console.log(this.navParam.data.empArray);

			this.events.publish('startNextActivity', { index: index });
			console.log('/vehicles/'+ this.navParam.data.empArray.$key+'/activity/'+this.navParam.data.empArray.activities[index].type);
        	console.log(this.navParam.data.empArray.activities[index].options);
        	this.navParam.data.empArray.activities[index].options.$key = this.navParam.data.empArray.activities[index].type;
        	this.auth.updateData('/vehicles/'+ this.navParam.data.empArray.$key+'/activity',this.navParam.data.empArray.activities[index].options);
			//this.auth.updateData('/vehicles/'+ this.navParam.data.empArray.$key,this.navParam.data.empArray.activities[index].options.data.deviceId,'device_id');
		}
		this.navCtrl.pop();
	}



}
