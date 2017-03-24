import { Component } from '@angular/core';
import { NavController, NavParams, Platform, Events } from 'ionic-angular';
import { CommonServices } from '../../providers/common.service';
import { BoardComponent } from '../../pages/board/board.component';
import { AuthServices } from '../../providers/af.service';
import { VendorRequestsComponent }  from '../vendor-requests/vendor-requests.component';
import { RequestsComponent }  from '../requests/requests.component';
import { VehiclesComponent } from '../track/vehicles.component';


import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'user-profile',
  templateUrl: 'user-profile.html'
})
export class UserProfileComponent {

  title: string = "Edit Profile";
  user: any = {};
  originalUser: any = {};

  constructor(
    public platform: Platform,
    public navParams: NavParams,
    public navCtrl: NavController,
    private commonService: CommonServices,
    private auth: AuthServices,
    private sanitizer: DomSanitizer,
    private events: Events) {

    this.user = this.commonService.clone(this.commonService.currentUser);
    console.log(this.user);
  }

  saveSetting() {
    //put  the update function for Login User to update the profile
    console.log('function called successfully');
    console.log(this.user);
    console.log(this.user.role=='vendor');

    //firebase services for update 
    this.auth.updateData(this.user.role=='vendor'?'/vendors':'/users', this.user, {
      orderByChild: 'id',
      equalTo: this.user.id
    });
    // this.events.publish('isLoggedIn');
    this.commonService.presentToast('Profile has updated successfully');
    if(this.user.role=='vendor'){
      this.navCtrl.setRoot(VendorRequestsComponent);
    }else if(this.user.role=='supervisor'){
       this.navCtrl.setRoot(RequestsComponent);
    }
    else if(this.user.role=='security'){
       this.navCtrl.setRoot(VehiclesComponent);
    }
      else{
        this.navCtrl.setRoot(BoardComponent);
    }
  }
}
  