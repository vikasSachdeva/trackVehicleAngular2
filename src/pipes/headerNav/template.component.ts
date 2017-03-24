import {Component, Input} from '@angular/core';
import { NavController, NavParams, ViewController, Events, PopoverController } from 'ionic-angular';
import { VehiclesComponent } from '../../pages/track/vehicles.component';
import { NotificationComponent } from '../../pages/notification/notification.component';


//import {CreateNewPage} from '../../pages/create-new/create-new';

@Component({
    selector: 'topnav-bar',
    templateUrl: './navbar.html',
    inputs: ['hideCreateButton'],
})
export class CustomNavbar {
	searchToggle:any;
    hideCreateButton: boolean ;
    title:string;

    constructor(public navParams: NavParams,public navCtrl: NavController) {
    	console.log(this.hideCreateButton);	
    }
    back(){
    	 this.navCtrl.pop();
    }
	openSearch(){

	// if(this.hideCreateButton){
	// 	this.searchToggle = !this.searchToggle
	// 	//this.title="Search"
	// 		}
		this.navCtrl.push(VehiclesComponent,{title: "Search",searchBar:true});
       // this.navCtrl.setRoot(VehiclesComponent, 4);
     
		//this.navParams.push("Search");
	}


    openNotification(){
		this.navCtrl.push(NotificationComponent);
	}

    // createNew(): void {
    //     this.nav.setRoot(CreateNewPage, {}, { animate: true, direction: 'forward' });
    // }
}
